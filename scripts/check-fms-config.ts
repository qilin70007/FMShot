// Configuration integrity by default; --live reads public listings and up to three detail pages.
// No model calls, database writes, or publication. A successful probe is not a production crawl.
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { XMLParser } from "fast-xml-parser";
import { CATEGORIES, CATEGORY_TAGS, TOPIC_TAGS, ENTITY_TAGS, ENTITIES } from "@aihot/industry/taxonomy";
import { assertSupportedConfig } from "@aihot/backend/sources/config-keys";
import { fromHtml, jsonLdPublished } from "@aihot/backend/sources/web-list";
import { getPath, renderTemplate } from "@aihot/backend/sources/json-list";
import type { SourceRow } from "@aihot/backend/sources/types";

type ConfiguredSource = SourceRow & { owner_entity_id?: string | null; site_fulltext: boolean; syndicate_fulltext: boolean };
const sources = JSON.parse(readFileSync("industry/sources.json", "utf8")).sources as ConfiguredSource[];
const topics = JSON.parse(readFileSync("industry/topics.json", "utf8")).topics as Array<{slug: string; entityId?: string; tags?: string[]}>;
const tags = new Set<string>([...CATEGORY_TAGS, ...TOPIC_TAGS, ...ENTITY_TAGS]);
assert.equal(new Set(sources.map(s => s.id)).size, sources.length, "duplicate source id");
assert.equal(new Set(topics.map(t => t.slug)).size, topics.length, "duplicate topic slug");
assert.equal(new Set(CATEGORIES.map(c => c.key)).size, CATEGORIES.length);
for (const s of sources) {
  assertSupportedConfig(s.kind, s.config);
  assert.ok(!s.owner_entity_id || ENTITIES[s.owner_entity_id], `${s.id}: unknown owner`);
  assert.equal(s.site_fulltext, false, `${s.id}: fulltext needs explicit permission`);
  assert.equal(s.syndicate_fulltext, false);
  const u = new URL(String(s.config.feedUrl ?? s.config.url));
  assert.equal(u.protocol, "https:");
  assert.ok(!u.username && !u.password);
}
for (const t of topics) {
  if (t.entityId) assert.ok(ENTITIES[t.entityId], `${t.slug}: unknown entity`);
  for (const tag of t.tags ?? []) assert.ok(tags.has(tag), `${t.slug}: unknown tag ${tag}`);
}
console.log(`Configuration OK: ${sources.length} sources, ${topics.length} topics, ${CATEGORIES.length} categories`);
if (!process.argv.includes("--live")) process.exit(0);

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@" });
const arr = (v: any): any[] => !v ? [] : Array.isArray(v) ? v : [v];
const xmlText = (v: any): string => typeof v === "string" ? v : String(v?.["#text"] ?? "");
async function fetchText(url: string): Promise<{text: string; url: string}> {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000), headers: { "User-Agent": "FMShotBot/1.0 (+https://github.com/qilin70007/FMShot)" } });
  assert.ok(response.ok, `HTTP ${response.status}`);
  return { text: await response.text(), url: response.url };
}
const results: Array<Record<string, unknown>> = [];
for (const source of sources) {
  const started = Date.now();
  try {
    const input = String(source.config.feedUrl ?? source.config.url);
    const page = await fetchText(input);
    let items: Array<{ title: string; url: string; date: string | null }> = [];
    if (source.kind === "rss") {
      const doc = parser.parse(page.text);
      items = arr(doc.rss?.channel?.item ?? doc.feed?.entry).map(row => ({ title: xmlText(row.title), url: typeof row.link === "string" ? row.link : arr(row.link).find(l => !l["@rel"] || l["@rel"] === "alternate")?.["@href"] ?? "", date: xmlText(row.pubDate ?? row.published ?? row.updated ?? row["dc:date"]) || null }));
    } else if (source.kind === "json_list") {
      items = arr(getPath(JSON.parse(page.text), String(source.config.itemsPath))).map(row => ({ title: String(getPath(row, (source.config.titlePaths as string[])[0]!)), url: renderTemplate(String(source.config.urlTemplate), row) ?? "", date: String(getPath(row, String(source.config.publishedAtPath))) }));
    } else if (source.kind === "web_list") {
      const candidates = fromHtml(page.text, page.url, source);
      items = candidates.map(row => ({ title: row.title, url: row.url, date: row.publishedAt?.toISOString() ?? null }));
      // Listing selectors often omit dates: verify actual article date metadata, without fabricating it.
      for (const item of items.slice(0, 3)) {
        if (!item.date) {
          const detail = await fetchText(item.url);
          item.date = jsonLdPublished((await import("cheerio")).load(detail.text), detail.text);
        }
      }
    }
    assert.ok(items.length, "No article entries (an HTML challenge is not a feed)");
    for (const item of items.slice(0, 3)) {
      assert.ok(item.title.trim().length > 5, "Missing article title");
      assert.ok(/^https?:\/\//.test(item.url), `Invalid URL: ${item.url}`);
      assert.ok(item.date && Number.isFinite(Date.parse(item.date)), `Missing publication date: ${item.url}`);
    }
    const result = { id: source.id, status: "ok", finalUrl: page.url, items: items.length, checkedArticles: items.slice(0, 3), elapsedMs: Date.now()-started };
    results.push(result);
    console.log(`${source.id}: OK (${items.length} entries)`);
  } catch (error) {
    results.push({ id: source.id, status: "failed", error: String(error), elapsedMs: Date.now()-started });
    console.error(`${source.id}: FAILED: ${String(error)}`);
  }
}
const output = process.argv.indexOf("--output");
if (output >= 0) writeFileSync(process.argv[output+1]!, JSON.stringify({ checkedAt: new Date().toISOString(), scope: "listing and sample date parsing; no production ingestion or model calls", results }, null, 2)+"\n");
if (results.some(r => r.status !== "ok")) process.exitCode = 1;
