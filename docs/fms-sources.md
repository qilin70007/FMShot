# FMShot 信源核验

核验日期：2026-10-05。15个入口均返回可解析的条目，检查每个源前3条的标题、链接与发布日期；不是生产采集/模型/发布全链路的验证。

| 信源 | 类型 | 层级 | 列表条目数 | 核验 |
|---|---|---|---:|---|
| [EASA · 新闻](https://www.easa.europa.eu/en/newsroom-and-events/news/feed.xml) | rss | T1 | 50 | ok |
| [EASA · 机构决定](https://www.easa.europa.eu/en/document-library/agency-decisions/feed.xml) | rss | T1 | 50 | ok |
| [EASA · 审定规范](https://www.easa.europa.eu/en/document-library/certification-specifications/feed.xml) | rss | T1 | 50 | ok |
| [EASA · AMC 与 GM](https://www.easa.europa.eu/en/document-library/acceptable-means-of-compliance-and-guidance-material/feed.xml) | rss | T1 | 50 | ok |
| [EASA · 拟议修订](https://www.easa.europa.eu/en/document-library/notices-of-proposed-amendment/feed.xml) | rss | T1 | 50 | ok |
| [EASA · 研究报告](https://www.easa.europa.eu/en/document-library/research-reports/feed.xml) | rss | T1 | 50 | ok |
| [EASA · 综合出版物](https://www.easa.europa.eu/en/document-library/general-publications/feed.xml) | rss | T1 | 50 | ok |
| [Honeywell · 官方公告](https://investor.honeywell.com/rss/news-releases.xml) | rss | T1 | 10 | ok |
| [Universal Avionics · 产品公告](https://universalavionics.com/press-releases/rss.xml) | rss | T1 | 10 | ok |
| [Universal Avionics · 技术博客](https://universalavionics.com/blog/rss.xml) | rss | T1 | 10 | ok |
| [Boeing · 新闻与声明](https://boeing.mediaroom.com/news-releases-statements?pagetemplate=rss) | rss | T1 | 5 | ok |
| [Aviation Today · 航电资讯](https://www.aviationtoday.com/feed/) | rss | T2 | 10 | ok |
| [EUROCONTROL · 新闻](https://www.eurocontrol.int/newsroom) | web_list | T1 | 13 | ok |
| [FAA · 官方新闻](https://www.faa.gov/newsroom) | web_list | T1 | 4 | ok |
| [Federal Register · FMS 文件](https://www.federalregister.gov/api/v1/documents.json?conditions[term]=flight%20management%20system&per_page=20&order=newest) | json_list | T1 | 20 | ok |

详细机器记录：`source-verification.json`。列表中出现旧文并不表示今日热点；发布时间仍按来源保留，框架依时间窗决定是否进入当前热点与报告。

## 覆盖与限制

- EASA覆盖法规/规范/拟议修订和研究；AD/SIB专用入口列在待接入清单，不宣称已覆盖所有指令。
- Federal Register 查询用于发现涉及FMS的公开文件，可能含拟议规则、其他机构材料或一般提及，应由预筛和结构化判断；不能全当成FAA强制指令。
- Honeywell 的投资者公告是宽范围官方源，并非完整航空产品更新订阅；专业产品入口仍在监视清单中。
- Universal Avionics 公告/博客提供直接产品信息；Boeing为宽范围制造商新闻。
- Aviation Today 为专业媒体，按T2门槛；不是厂商一手证据。
- 多个EASA入口与同一家厂商的多源共享owner_entity_id，热度不按入口数量重复累计。
- 厂商反爬、付费标准、需授权手册和内部资料不绕过访问控制；监视清单不是已启用源。

## 接入新的源

在后台试抓，核对标题、原文链接、发布日期和正文可读性；日期未知的材料按框架规则先不公开。确认来源身份与全文授权后设定层级、owner_entity_id和频率，再启用。生产seed只补缺失ID，不覆盖管理员已修改的配置。
