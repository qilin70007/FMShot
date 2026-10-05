# FMShot 行业配置

面向 FMS 研制、验证、适航和运行支持。分类与标签位于 taxonomy.ts；厂商/机构、方向、内容形态主题位于 topics.json；采集源位于 sources.json；行业判断位于 prompts/。

保留上游七种 itemType 的机器契约。model_release 在本站仅表示导航/引导/性能算法重大更新，产品和软件版本用 product_launch；不会把通用 AI 模型当作 FMS 新闻。

selection.ts 的 60/65/76 为上游默认门槛，尚未经 FMS 人工金标校准，不能宣称精选准确率。gold.example.jsonl 为合成的格式示例，不能用于性能结论。上线后按 docs/selection.md 标注真实样本并校准。
