// FMShot 行业词表。分类 key 为公开 API 的稳定标识；评分 itemType 保持上游契约。
export const CATEGORIES = [
  {
    "key": "products",
    "label": "产品与架构",
    "feedLabel": "产品与架构",
    "section": "产品与架构",
    "guide": "FMS/FMC/FMGC、综合航电和驾驶舱产品发布、版本升级、架构变化、集成与机型选装；不将意向合作写成完成交付。"
  },
  {
    "key": "navigation",
    "label": "导航与引导",
    "feedLabel": "导航与引导",
    "section": "导航与引导",
    "guide": "GNSS/BDS/SBAS/GBAS、DME/IRS、多传感器导航、RNP/RNAV、LNAV/VNAV、LP/LPV、轨迹预测和性能优化；真实事故和适航要求分别归安全或适航。"
  },
  {
    "key": "datalink",
    "label": "数据链与互联",
    "feedLabel": "数据链与互联",
    "section": "数据链与互联",
    "guide": "ACARS/AOC、CPDLC、ADS-C、FANS、ATN B2、4D轨迹、FMS/EFB互联与地空初始化。"
  },
  {
    "key": "database",
    "label": "数据库与场面",
    "feedLabel": "数据库与场面",
    "section": "数据库与场面",
    "guide": "导航/性能/机场地图数据库、ARINC 424、数据质量、DO-200/DO-201、场面导航与监视；正式强制要求归适航。"
  },
  {
    "key": "certification",
    "label": "适航与标准",
    "feedLabel": "适航与标准",
    "section": "适航与标准",
    "guide": "CTSO/TSO/ETSO、AD/SIB/SAFO、AC/AMC、DO/ARP/ARINC标准变更、认证与运行批准；说明草案、咨询、最终版和生效阶段。"
  },
  {
    "key": "safety",
    "label": "问题与安全事件",
    "feedLabel": "问题与安全事件",
    "section": "问题与安全事件",
    "guide": "公开缺陷、召回、错误引导、导航异常、GNSS干扰、数据库错误、机组交互与调查进展；不得无证据认定FMS根因。"
  },
  {
    "key": "paper",
    "label": "技术研究",
    "feedLabel": "技术研究",
    "section": "技术研究",
    "guide": "FMS、导航与引导、航电架构、轨迹优化和验证相关论文、技术报告与实验结果；研究演示不等于取得适航批准。"
  },
  {
    "key": "industry",
    "label": "产业与项目",
    "feedLabel": "产业与项目",
    "section": "产业与项目",
    "guide": "与FMS直接相关的供应链、机型项目、采购、交付、合作和并购；过滤客运、票价、机场旅游和无航电关联财报。"
  },
  {
    "key": "tip",
    "label": "工程实践",
    "feedLabel": "工程实践",
    "section": "工程实践与观点",
    "guide": "需求、设计保证、安全性、IMA/ARINC653、验证、HMI和系统集成的可复用方法与案例。",
    "commentary": true
  },
  {
    "key": "opinion",
    "label": "专业观点",
    "feedLabel": "专业观点",
    "section": "工程实践与观点",
    "guide": "有事实支持的FMS发展、航电架构和运行影响分析；不把评论归为正式认证或发布。",
    "commentary": true
  }
] as const satisfies ReadonlyArray<{ key: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;
export const RELEASE: { category: string; tag: string; unit: string } | null = { category: "products", tag: "产品更新", unit: "项产品更新" };
export const PLAIN_TERMS: readonly string[] = ["fms", "fmc", "fmgc", "ima", "gnss", "gps", "bds", "rnp", "rnav", "lnav", "vnav", "lpv", "cpdlc", "ads-c", "acars", "aoc", "fans", "atn", "efb", "tso", "ctso", "etso", "ad", "sib", "do", "arp", "arinc", "nm", "ft"];
export const ITEM_TYPES = ["model_release", "product_launch", "tool_or_prompt", "research_paper", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;
export const CATEGORY_TAGS = ["产品更新", "技术进展", "数据链/互联", "数据库/场面", "适航/标准", "安全事件", "论文/研究", "教程/实践", "专业观点", "评测/验证", "行业动态", "其他"] as const;
export const TOPIC_TAGS = ["FMS", "IMA/ARINC653", "系统冗余", "HMI/触控", "GNSS/BDS", "GNSS干扰", "DME/IRS", "RNP/RNAV", "RNP AR", "LNAV/VNAV", "LP/LPV", "性能/轨迹优化", "ACARS/AOC", "CPDLC/ADS-C", "FANS/ATN", "EFB互联", "导航数据库", "机场地图", "场面导航", "DO-178/DO-254", "DO-200/DO-201", "ARP4754/ARP4761"] as const;
export const ENTITY_TAGS = ["Honeywell", "Thales", "Collins Aerospace", "Garmin", "Universal Avionics", "Airbus", "Boeing", "中国商飞", "Jeppesen", "Lufthansa Systems", "FAA", "EASA", "中国民航局", "EUROCONTROL", "RTCA", "EUROCAE", "NTSB", "ICAO"] as const;
export const TAG_SYNONYMS: Readonly<Record<string,string>> = {"政策/监管": "适航/标准", "法规": "适航/标准", "适航": "适航/标准", "安全": "安全事件", "安全/对齐": "安全事件", "模型发布": "技术进展", "大佬观点": "专业观点", "发布": "产品更新", "论文": "论文/研究", "GNSS": "GNSS/BDS", "PBN": "RNP/RNAV", "RNP": "RNP/RNAV", "VNAV": "LNAV/VNAV", "LNAV": "LNAV/VNAV", "AOC": "ACARS/AOC", "CPDLC": "CPDLC/ADS-C", "ADS-C": "CPDLC/ADS-C", "ARINC 653": "IMA/ARINC653", "DO-178C": "DO-178/DO-254", "DO-200B": "DO-200/DO-201", "霍尼韦尔": "Honeywell", "泰雷兹": "Thales", "柯林斯": "Collins Aerospace"};
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; otherNames?: string[] }> = {
  "honeywell": {
    "name": "Honeywell",
    "displayTag": "Honeywell",
    "aliases": [
      "Honeywell",
      "霍尼韦尔",
      "Honeywell Aerospace"
    ],
    "otherNames": [
      "Honeywell Anthem"
    ]
  },
  "thales": {
    "name": "Thales",
    "displayTag": "Thales",
    "aliases": [
      "Thales",
      "泰雷兹"
    ],
    "otherNames": []
  },
  "collins": {
    "name": "Collins Aerospace",
    "displayTag": "Collins Aerospace",
    "aliases": [
      "Collins Aerospace",
      "Rockwell Collins",
      "柯林斯"
    ],
    "otherNames": [
      "Collins"
    ]
  },
  "garmin": {
    "name": "Garmin",
    "displayTag": "Garmin",
    "aliases": [
      "Garmin",
      "佳明"
    ],
    "otherNames": []
  },
  "universal-avionics": {
    "name": "Universal Avionics",
    "displayTag": "Universal Avionics",
    "aliases": [
      "Universal Avionics",
      "通用航电",
      "Universal Avionics Systems Corporation"
    ],
    "otherNames": [
      "UASC"
    ]
  },
  "airbus": {
    "name": "Airbus",
    "displayTag": "Airbus",
    "aliases": [
      "Airbus",
      "空客"
    ],
    "otherNames": []
  },
  "boeing": {
    "name": "Boeing",
    "displayTag": "Boeing",
    "aliases": [
      "Boeing",
      "波音"
    ],
    "otherNames": []
  },
  "comac": {
    "name": "中国商飞",
    "displayTag": "中国商飞",
    "aliases": [
      "COMAC",
      "中国商飞",
      "Commercial Aircraft Corporation of China"
    ],
    "otherNames": []
  },
  "jeppesen": {
    "name": "Jeppesen",
    "displayTag": "Jeppesen",
    "aliases": [
      "Jeppesen",
      "杰普逊"
    ],
    "otherNames": []
  },
  "lufthansa-systems": {
    "name": "Lufthansa Systems",
    "displayTag": "Lufthansa Systems",
    "aliases": [
      "Lufthansa Systems",
      "Lido"
    ],
    "otherNames": []
  },
  "faa": {
    "name": "FAA",
    "displayTag": "FAA",
    "aliases": [
      "FAA",
      "Federal Aviation Administration"
    ],
    "otherNames": []
  },
  "easa": {
    "name": "EASA",
    "displayTag": "EASA",
    "aliases": [
      "EASA",
      "European Union Aviation Safety Agency"
    ],
    "otherNames": []
  },
  "caac": {
    "name": "中国民航局",
    "displayTag": "中国民航局",
    "aliases": [
      "CAAC",
      "中国民航局"
    ],
    "otherNames": []
  },
  "eurocontrol": {
    "name": "EUROCONTROL",
    "displayTag": "EUROCONTROL",
    "aliases": [
      "EUROCONTROL"
    ],
    "otherNames": []
  },
  "rtca": {
    "name": "RTCA",
    "displayTag": "RTCA",
    "aliases": [
      "RTCA"
    ],
    "otherNames": []
  },
  "eurocae": {
    "name": "EUROCAE",
    "displayTag": "EUROCAE",
    "aliases": [
      "EUROCAE"
    ],
    "otherNames": []
  },
  "ntsb": {
    "name": "NTSB",
    "displayTag": "NTSB",
    "aliases": [
      "NTSB",
      "National Transportation Safety Board"
    ],
    "otherNames": []
  },
  "icao": {
    "name": "ICAO",
    "displayTag": "ICAO",
    "aliases": [
      "ICAO",
      "国际民航组织"
    ],
    "otherNames": []
  }
};
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "honeywell", name: "Honeywell", patterns: [/Honeywell|霍尼韦尔|Honeywell\s+Aerospace|Honeywell\s+Anthem/i] },
  { id: "thales", name: "Thales", patterns: [/Thales|泰雷兹/i] },
  { id: "collins", name: "Collins Aerospace", patterns: [/Collins\s+Aerospace|Rockwell\s+Collins|柯林斯|Collins/i] },
  { id: "garmin", name: "Garmin", patterns: [/Garmin|佳明/i] },
  { id: "universal-avionics", name: "Universal Avionics", patterns: [/Universal\s+Avionics|通用航电|Universal\s+Avionics\s+Systems\s+Corporation|UASC/i] },
  { id: "airbus", name: "Airbus", patterns: [/Airbus|空客/i] },
  { id: "boeing", name: "Boeing", patterns: [/Boeing|波音/i] },
  { id: "comac", name: "中国商飞", patterns: [/COMAC|中国商飞|Commercial\s+Aircraft\s+Corporation\s+of\s+China/i] },
  { id: "jeppesen", name: "Jeppesen", patterns: [/Jeppesen|杰普逊/i] },
  { id: "lufthansa-systems", name: "Lufthansa Systems", patterns: [/Lufthansa\s+Systems|Lido/i] },
  { id: "faa", name: "FAA", patterns: [/FAA|Federal\s+Aviation\s+Administration/i] },
  { id: "easa", name: "EASA", patterns: [/EASA|European\s+Union\s+Aviation\s+Safety\s+Agency/i] },
  { id: "caac", name: "中国民航局", patterns: [/CAAC|中国民航局/i] },
  { id: "eurocontrol", name: "EUROCONTROL", patterns: [/EUROCONTROL/i] },
  { id: "rtca", name: "RTCA", patterns: [/RTCA/i] },
  { id: "eurocae", name: "EUROCAE", patterns: [/EUROCAE/i] },
  { id: "ntsb", name: "NTSB", patterns: [/NTSB|National\s+Transportation\s+Safety\s+Board/i] },
  { id: "icao", name: "ICAO", patterns: [/ICAO|国际民航组织/i] },
];
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  {
    "entityId": "honeywell",
    "domains": [
      "honeywell.com",
      "honeywellaerospace.com"
    ]
  },
  {
    "entityId": "thales",
    "domains": [
      "thalesgroup.com"
    ]
  },
  {
    "entityId": "collins",
    "domains": [
      "collinsaerospace.com"
    ]
  },
  {
    "entityId": "garmin",
    "domains": [
      "garmin.com"
    ]
  },
  {
    "entityId": "universal-avionics",
    "domains": [
      "universalavionics.com",
      "uasc.com"
    ]
  },
  {
    "entityId": "airbus",
    "domains": [
      "airbus.com"
    ]
  },
  {
    "entityId": "boeing",
    "domains": [
      "boeing.com",
      "boeing.mediaroom.com"
    ]
  },
  {
    "entityId": "comac",
    "domains": [
      "comac.cc"
    ]
  },
  {
    "entityId": "jeppesen",
    "domains": [
      "jeppesen.com"
    ]
  },
  {
    "entityId": "lufthansa-systems",
    "domains": [
      "lhsystems.com"
    ]
  },
  {
    "entityId": "faa",
    "domains": [
      "faa.gov"
    ]
  },
  {
    "entityId": "easa",
    "domains": [
      "easa.europa.eu"
    ]
  },
  {
    "entityId": "caac",
    "domains": [
      "caac.gov.cn"
    ]
  },
  {
    "entityId": "eurocontrol",
    "domains": [
      "eurocontrol.int"
    ]
  },
  {
    "entityId": "rtca",
    "domains": [
      "rtca.org"
    ]
  },
  {
    "entityId": "eurocae",
    "domains": [
      "eurocae.net"
    ]
  },
  {
    "entityId": "ntsb",
    "domains": [
      "ntsb.gov"
    ]
  },
  {
    "entityId": "icao",
    "domains": [
      "icao.int"
    ]
  }
];
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [];
