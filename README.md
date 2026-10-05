# FMShot · 飞行管理系统行业热点

**轻量版已上线： [打开 FMShot](https://fmshot.qlxiao.chatgpt.site)**（通过 ChatGPT Work Sites 托管，当前仅所有者可访问）。直接打开即可浏览，不需要部署服务器、配置数据库或填写模型 API Key。支持公开信源动态、分类、搜索、FMS 相关筛选和浏览器本地收藏。详见 [轻量版上线说明](docs/work-lite.md)。

下面保留完整版的功能和自托管说明，供后续需要模型评分、日报等能力时使用。

面向 FMS 研制、验证、适航与运行支持的行业热点站。基于 [AIHOT](https://github.com/KKKKhazix/AIHOT) 的 MIT 开源框架定制，保留采集、预筛、独立双评分、事件归并、热点榜、日报/周报/月报、RSS、公开 API、MCP 和管理后台。

## 关注范围

| 分类 | 重点内容 |
|---|---|
| 产品与架构 | Honeywell、Thales、Collins、Garmin、Universal Avionics；FMS 版本、综合航电、机型集成、冗余与 IMA |
| 导航与引导 | GNSS/BDS、DME/IRS、RNP/RNAV/RNP AR、LNAV/VNAV、LP/LPV、性能与轨迹优化 |
| 数据链与互联 | ACARS/AOC、CPDLC、ADS-C、FANS/ATN、4D 轨迹、FMS/EFB 互联 |
| 数据库与场面 | 导航数据库、机场地图、数据质量、场面导航 |
| 适航与标准 | CTSO/TSO/ETSO、AD/SIB、AC/AMC、DO/ARP/ARINC 修订与认证进展 |
| 问题与安全事件 | 公开缺陷、导航异常、GNSS 干扰、数据库错误和调查后续 |
| 技术研究 | 导航、引导、航电和验证相关论文、实验与技术报告 |
| 产业与项目 | 与 FMS 直接相关的合作、采购、交付与供应链 |
| 工程实践与观点 | 需求、设计保证、安全分析、验证、接口与 HMI |

**内容口径**：保留原文链接、机型、部件号、软件版本、公告编号和适用条件。区分宣布、试验、取证、交付与投入运行；不把 GNSS 干扰或初步调查自动归因于 FMS。不追求凑满条数，不将旧产品目录当成今日新闻。

## 快速启动

需要 Node.js 24.11+（生成配置）和 Docker Compose；推荐 Linux 云服务器 2 核 / 4 GB 及以上。GitHub 存放源码，GitHub Pages 无法运行本项目的数据库与后台 worker。

```bash
git clone https://github.com/qilin70007/FMShot.git
cd FMShot
node scripts/init-env.ts
```

在生成的 `.env` 中设置实际的 `SITE_URL` 和模型配置：

```dotenv
SITE_URL=http://你的服务器地址:3000
LLM_BASE_URL=https://api.deepseek.com/v1
LLM_API_KEY=你的模型密钥
LLM_MODEL=你账户可用的模型名称
```

框架接受 OpenAI 兼容接口，可接 DeepSeek、千问、Kimi、GLM 等；模型名、JSON 模式、推理参数需按服务商当前文档填写，不把示例模型名当成保证可用。不要提交 `.env`。

```bash
docker compose up -d --build
```

网站：`http://服务器地址:3000`；后台：`/admin`。管理员密码由初始化脚本生成。在后台先检查信源和预算，再把 `.env` 的 `COLLECT_ENABLED`、`MODEL_CALLS_ENABLED` 改为 `true` 并重启 API/worker。默认关闭外部采集和模型调用，未配置密钥也能启动空站检查界面。修改 `.env` 后，应重新创建容器以加载新环境变量：

```bash
docker compose up -d --force-recreate api worker
```

日报默认北京时间每天 08:00，周报周一 10:00，月报每月 1 日 10:30；由常驻 worker 调度。不是 GitHub Actions 定时抓取，也不会自动发送邮件。时间在 `site/site.ts` 修改。

## 信源现状

`industry/sources.json` 包含 15 个公开源：EASA 新闻/规范/AMC/决定/NPA/研究/出版物、Honeywell 官方公告、Universal Avionics 公告与博客、Boeing、Aviation Today、FAA、EUROCONTROL、Federal Register FMS 查询。宽范围信源需要 FMS 相关性预筛，多个同机构入口按同一参与方计算热度。

Thales、Collins、Garmin 等部分入口受到访问限制，**未冒充已接通**。重点监视清单和原因在 `industry/source-watchlist.json`，核验通过后通过后台加入。来源核验明细见 [信源说明](docs/fms-sources.md)。

## 配置与验证

- [FMS 配置说明](docs/fms-customization.md)：范围、证据规则、分类与校准。
- [部署说明](docs/deploy.md)：Docker、HTTPS、备份和更新。
- [信源接入](docs/sources.md)：RSS、网页、JSON、公众号与外部推送。
- [评分校准](docs/selection.md)：人工标注实际 FMS 样本，评估并调整精选效果。

```bash
npm ci
npm run typecheck
npm run build -w @aihot/web
DATABASE_URL=postgres://postgres:密码@127.0.0.1:5432/fmshot_test npm test
npx playwright install chromium webkit
node --test apps/web/tests/*.test.ts
node scripts/check-fms-config.ts
node scripts/check-fms-config.ts --live
node scripts/smoke.ts --base http://localhost:3000
```

`--live` 只核验公开源的入口、解析、标题/链接/日期，不调用模型；结果随来源变化。CI 保留类型检查、完整测试、构建及 Docker 冒烟。初始门槛沿用上游 60/65/76，尚未做 FMS 人工金标校准，合成示例不代表筛选准确率。

## 许可与来源

保留 AIHOT 的 [MIT 许可](LICENSE)、[NOTICE](NOTICE) 与字体许可。FMShot 使用独立品牌；内部 `@aihot/*` workspace 名保留，方便与上游兼容。

本站内容是摘要与阅读索引，原文版权归来源方，默认不展示或分发全文。内容不能替代有效标准、厂商通告或批准文件。使用规则与隐私页为部署草稿，运营方应依据实际日志、服务和联系方式完善后上线。
