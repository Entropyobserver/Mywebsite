# 电商作品集数据来源登记表

本表区分四种状态：

- **真实公开数据**：来自真实业务场景，且有可追溯的官方、企业或学术出处。
- **公开竞赛/研究数据**：真实场景但经过匿名、抽样或竞赛处理，不能代表完整业务。
- **公开练习数据**：可以练方法，但当前本地文件缺少可靠的一手出处说明。
- **模拟数据**：由规则或脚本构造，只能展示架构和方法。

## 本地已有数据

| 数据 | 本地规模 | 判定 | 最适合支持 | 不能支持的结论 |
| --- | ---: | --- | --- | --- |
| Amazon Reviews 2023 — Fashion | 2,500,939 条，约 0.98 GiB | 真实公开评论；McAuley Lab 发布 | 评论情感、方面级问题、商品质量信号、推荐交互 | GMV、利润、退货率、国内平台表现 |
| UCI Online Retail | 541,909 行、4,372 客户、4,070 SKU、25,900 发票 | UCI 明确描述为英国非门店零售商真实交易 | RFM、Cohort、SKU ABC、购物篮、复购 | 150,000 客户规模、成本利润、广告归因 |
| UCI Online Retail II | 1,067,371 行、5,942 个可识别客户、两年交易 | UCI 真实英国非门店零售交易；CC BY 4.0；本地 ZIP 已校验 | 月度客户快照、90 天不活跃风险、RFM、复购预测 | 永久流失、召回活动因果增量、利润或营销 ROI |
| Rossmann Store Sales | 1,017,209 行、1,115 门店、2013-01-01 至 2015-07-31 | Kaggle 官方竞赛历史门店销售数据 | ARIMA/Prophet/LSTM、促销与需求预测 | 电商库存数量、采购提前期、SKU 补货量 |
| Taobao UserBehavior | 100,150,807 条，约 3.42 GiB | Alibaba Tianchi 淘宝真实场景脱敏行为 | 浏览/收藏/加购/购买漏斗、用户行为序列、下一行为预测 | GMV、价格、利润、广告成本 |
| E-commerce Customer Churn workbook | 5,630 客户、20 字段 | 公开练习数据；当前本地文件未保留可靠一手来源链 | 流失分类方法练习、类别不平衡、SHAP | 真实公司流失率、实际挽回效果、因果驱动因素 |
| Marketing A/B CSV | 588,101 行 | Kaggle 用户上传练习集；当前未验证实验所有者与随机化日志 | 检验流程练习 | 真实广告增量、生产 A/B 实验结论 |
| Olist marketplace tables | 约 10 万订单 | 公开匿名 marketplace 数据，可用于订单、卖家、物流关系 | 订单履约、地区、卖家、品类分析 | COGS、真实贡献利润、天猫/京东/拼多多/Amazon 联合经营 |
| Superstore | 9,994 订单行 | Tableau 示例数据 | 可视化与 KPI 原型 | 真实公司经营、真实预测效果 |

## 建议新增的权威数据

| 数据 | 状态 | 项目用途 | 优先级 |
| --- | --- | --- | --- |
| Criteo Uplift Prediction | 尚未下载；真实匿名 incrementality trials，约 1,398 万条无偏版本 | A/B、增量分析、uplift targeting、因果 ML | 高 |
| Amazon ESCI Shopping Queries | 尚未下载；Amazon Science 官方 | 多语言商品检索、语义匹配、排序、NDCG | 高，AI/NLP 差异化 |
| JDsearch | 尚未下载；SIGIR 2023，京东真实查询和完整交互 | 中文商品搜索、个性化排序、点击/加购/购买 | 高，但下载与计算成本较高 |

## 官方出处

- Amazon Reviews 2023：https://amazon-reviews-2023.github.io/
- UCI Online Retail：https://archive.ics.uci.edu/dataset/352/online+retail
- UCI Online Retail II：https://archive.ics.uci.edu/dataset/502/online+retail+ii
- Rossmann Store Sales：https://www.kaggle.com/c/rossmann-store-sales/data
- Alibaba Tianchi 淘宝用户行为：https://tianchi.aliyun.com/dataset/dataDetail?dataId=649
- Criteo Uplift Prediction：https://ailab.criteo.com/criteo-uplift-prediction-dataset/
- Amazon ESCI：https://www.amazon.science/code-and-datasets/shopping-queries-dataset-a-large-scale-esci-benchmark-for-improving-product-search
- JDsearch：https://github.com/rucliujn/JDsearch

## 使用规则

1. 项目首页和 notebook 第一节必须写明出处、时间范围、行数、抽样方式和字段限制。
2. “真实公开数据”不等于“本人工作数据”，网站必须明确区分。
3. 没有成本字段时不计算真实贡献利润；没有随机分配记录时不声称因果增量。
4. 简历中的 150,000+ 客户和 800+ SKU 是工作经历规模，公开项目只证明方法，不能伪装成同一批数据。
5. 所有公开结果都要保留可复现代码、时间切分或抽样逻辑、误差分析与局限性。
