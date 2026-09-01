from pathlib import Path

import nbformat as nbf


PROJECT_DIR = Path(__file__).resolve().parent
source = PROJECT_DIR / "notebooks/01_customer_segmentation_cn.ipynb"
target = PROJECT_DIR / "notebooks/02_customer_segmentation_en.ipynb"
nb = nbf.read(source, as_version=4)

markdown_cells = {
    0: """# E-commerce Customer Segmentation & Lifecycle Analysis

## Business question

Customers should not be ranked by spend alone. The business also needs to distinguish consistently valuable customers, customers becoming dormant, newly acquired customers with potential, and low-engagement customers with cancellation signals.

This project builds customer features at a fixed observation cutoff and compares **K-Means, hierarchical clustering, Gaussian Mixture, and HDBSCAN**. Clustering uses only data available before the cutoff. Purchase behavior during the following 90 days is reserved for external validation.

## Project highlights

- Converts more than one million transaction lines into a customer feature layer;
- Combines RFM, lifecycle, purchase cadence, product diversity, recent trend, and cancellation behavior;
- Selects cluster count using silhouette, Davies–Bouldin, minimum segment size, and perturbation stability;
- Compares partitioning, hierarchical, probabilistic, and density-based clustering;
- Validates segments against observed purchasing behavior during the next 90 days;
- Produces operational profiles without claiming that clusters are naturally occurring customer personalities.
""",
    1: """## 1. Data source and interpretation boundary

The data come from **Online Retail II** in the UCI Machine Learning Repository. They describe transactions from a UK-based non-store retailer between 1 December 2009 and 9 December 2011.

- Official page: https://archive.ics.uci.edu/dataset/502/online+retail+ii
- DOI: https://doi.org/10.24432/C5CG6D
- License: CC BY 4.0

The public data contain only several thousand identifiable customers. This project demonstrates the segmentation methodology; it does not replace or substantiate the 150,000+ sample scale stated in professional experience.
""",
    3: "## 2. Read and clean the transactions, separating successful purchases from cancellations",
    5: """## 3. Build the customer feature layer

The observation window covers the previous 365 days so that old history does not accumulate without limit. A customer must have at least one successful purchase during this period.

- **Value and frequency:** orders, spend, units, and average order value;
- **Lifecycle:** recency, tenure, and active months;
- **Breadth:** distinct products and average lines per order;
- **Cadence and trend:** order gaps and recent 90-day shares;
- **After-sales behavior:** cancellation invoice rate and cancelled-value ratio.
""",
    7: "## 4. Preprocessing: control extreme values and make distance scales comparable",
    9: """## 5. K-Means: select an operational cluster count

The candidate range is two to eight clusters.

- **Silhouette:** higher is better;
- **Davies–Bouldin:** lower is better;
- **Perturbation stability:** ARI between original labels and labels after small feature perturbations; closer to one is better;
- **Minimum segment share:** avoids tiny groups that are difficult to operationalize.

To balance statistical quality with operational interpretability, the final choice is ranked among four- to six-cluster solutions whose smallest segment represents at least 3% of customers.
""",
    11: "## 6. Compare K-Means, hierarchical clustering, Gaussian Mixture, and HDBSCAN",
    13: "## 7. Customer profiles and operational segment names",
    15: "## 8. Validate the segments with purchasing behavior during the next 90 days",
    17: """## 9. Operational recommendations and limitations

### How the segments can enter operations

- **High-value loyal customers:** protect service quality, offer priority access, and avoid unnecessary blanket discounts;
- **Dormant-risk customers:** place eligible customers into a reactivation experiment, prioritized by historical value and contact cost;
- **New / high-potential customers:** improve second-order onboarding and category education;
- **High-cancellation / low-engagement customers:** investigate product and order issues before deciding on service recovery or low-cost outreach;
- **Stable or developing customers:** use relevant cross-sell and lifecycle content to deepen engagement.

### Limitations that must remain visible

1. Clusters depend on the observation window, feature set, scaling, and selected algorithm; they are not a unique truth.
2. Segment names are operational language, not customer personalities produced directly by the model.
3. The data do not include margin, campaign cost, or randomized assignment, so the project cannot estimate segment-level marketing ROI.
4. Future repurchase differences are predictive validation, not the causal effect of an intervention.
5. The public project contains several thousand customers and must not be presented as a 150,000+ customer project.

### Resume alignment

This project directly demonstrates:

> Applied K-Means and hierarchical clustering for user segmentation.

It also provides a reproducible Python pipeline from transaction cleaning and feature engineering through cluster-count selection, algorithm comparison, stability testing, and future-behavior validation. The website should describe it as demonstrating the same methodology on a public retail dataset.
""",
}

replacements = {
    "数据文件：": "Data file: ",
    "观察窗口：": "Observation window: ",
    "至": "to",
    "（不含截止日）": "(cutoff excluded)",
    "未来验证窗口：": "Future validation window: ",
    "（不含结束日）": "(end excluded)",
    "**结果解释：**": "**Result interpretation:** ",
    "所有聚类特征都来自观察截止日前；未来90天只用于结果验证。": "All clustering features come from before the observation cutoff; the following 90 days are used only for validation. ",
    "这相当于企业在 2011-09-01 运行一次月度客户分群，并在三个月后检查各群体的实际表现。": "This represents a monthly segmentation run on 1 September 2011, followed by a three-month outcome review.",
    '"指标"': '"Metric"',
    '"结果"': '"Result"',
    '"原始商品行"': '"Raw transaction lines"',
    '"可识别客户"': '"Identifiable customers"',
    '"客户编号缺失率"': '"Missing customer-ID rate"',
    '"成功购买商品行"': '"Successful-purchase lines"',
    '"取消/负数量商品行"': '"Cancellation / negative-quantity lines"',
    "原始数据有 ": "The raw data contain ",
    " 条商品行、": " transaction lines and ",
    " 个可识别客户。": " identifiable customers. ",
    "建模使用 ": "The analysis uses ",
    " 条成功购买明细；取消交易单独保留为售后行为特征。": " successful-purchase lines; cancellations are retained separately as after-sales features. ",
    "缺失客户编号的交易无法连接成客户历史，因此不进入分群，但缺失比例被保留在审计结果中。": "Transactions without a customer ID cannot be linked into customer histories, so they are excluded from segmentation while their missing rate remains visible in the audit.",
    "观察窗口内共有 ": "The observation window contains ",
    " 名可分群客户，生成 ": " eligible customers and ",
    " 个聚类特征。": " clustering features. ",
    "消费、订单和取消金额存在明显长尾，直接使用原值会让少数极端客户支配欧氏距离；": "Spend, orders, and cancelled value are strongly right-skewed, so raw values would allow a few extreme customers to dominate Euclidean distance. ",
    "下一步将在训练口径内进行99%分位截尾、缺失填补、偏态变换和标准化。": "The next step applies 1st–99th percentile clipping, imputation, skew transformation, and standardization within the defined analytical pipeline.",
    '"检查"': '"Check"',
    '"客户数"': '"Customers"',
    '"特征数"': '"Features"',
    '"预处理后缺失值"': '"Missing values after preprocessing"',
    '"标准化均值绝对值最大值"': '"Maximum absolute standardized mean"',
    '"标准化标准差范围"': '"Standardized standard-deviation range"',
    "预处理后没有缺失值，各特征均被调整到可比较尺度。": "Preprocessing leaves no missing values and places every feature on a comparable scale. ",
    "1%–99%截尾不会删除客户，只限制极端值对距离的影响；": "The 1st–99th percentile clipping does not remove customers; it only limits the influence of extreme values. ",
    "对偏态特征使用 `log1p`，保留相对高低关系但压缩长尾。": "The `log1p` transform preserves ordering while compressing long tails.",
    "Silhouette（越高越好）": "Silhouette (higher is better)",
    "Davies–Bouldin（越低越好）": "Davies–Bouldin (lower is better)",
    "扰动稳定性 ARI（越高越好）": "Perturbation stability ARI (higher is better)",
    "综合统计质量、稳定性和可运营粒度，选择 ": "Balancing statistical quality, stability, and operational granularity, the analysis selects ",
    " 群": " clusters",
    "该方案 Silhouette 为 ": "The solution has a silhouette score of ",
    "、稳定性 ARI 为 ": ", a stability ARI of ",
    "最小群体占比为 ": "and a minimum segment share of ",
    "选择不是只追求单一指标最高值：过少群体可能掩盖生命周期差异，过多群体则会降低稳定性和运营可执行性。": "The choice does not maximize a single metric: too few clusters can hide lifecycle differences, while too many can reduce stability and operational usability. ",
    "当前 Silhouette 仅表示中等偏弱的自然分离，因此五群应被理解为运营上的实用简化，而不是客户天然存在五种类型。": "The modest silhouette score indicates only moderate-to-weak natural separation, so the five segments should be interpreted as a useful operational simplification rather than five naturally occurring customer types.",
    "层次聚类树状图（随机500名客户，截断显示）": "Hierarchical dendrogram (500 sampled customers, truncated)",
    "合并后的节点": "Merged nodes",
    "Ward 距离": "Ward distance",
    " 群的 PCA 二维投影": "-cluster K-Means PCA projection",
    "K-Means {SELECTED_K} clusters的 PCA 二维投影": "K-Means {SELECTED_K}-cluster PCA projection",
    "四种算法使用完全相同的预处理特征。": "All four algorithms use exactly the same preprocessed features. ",
    "K-Means 与 Ward 层次聚类的标签一致性 ARI 为 ": "The label agreement ARI between K-Means and Ward hierarchical clustering is ",
    "HDBSCAN 自动识别 ": "HDBSCAN identifies ",
    " 个非噪声群体，": " non-noise clusters and ",
    "并将 ": "labels ",
    " 的客户标记为噪声。": " of customers as noise. ",
    "Ward 层次聚类的最小群体只有 ": "Ward hierarchical clustering produces a smallest segment of only ",
    "，而 HDBSCAN 的噪声比例过高，二者都不适合作为当前运营主方案。": ", while HDBSCAN has an excessive noise share; neither is suitable as the primary operational solution. ",
    "PCA 图只是高维结构的二维投影，点云重叠不等于原始15维空间无法区分。": "The PCA chart is only a two-dimensional projection of a 15-dimensional structure, so overlap in the plot does not imply that the original space contains no separation. ",
    "最终采用 K-Means 作为运营分群，是因为它可复现、可给新客户分配最近中心，并能直接对照简历中的方法；层次聚类用于结构验证。": "K-Means is selected for operations because it is reproducible, can assign new customers to the nearest center, and directly demonstrates the resume methodology; hierarchical clustering provides a structural cross-check.",
    '"高价值忠诚客户"': '"High-value loyal"',
    '"沉睡风险客户"': '"Dormant risk"',
    '"新晋/高潜客户"': '"New / high-potential"',
    '"高取消/低活跃客户"': '"High-cancellation / low-engagement"',
    '"低活跃长尾客户"': '"Low-engagement long tail"',
    '"稳定常购客户"': '"Stable repeat"',
    '"发展中客户"': '"Developing"',
    '"其他行为客户"': '"Other behavior"',
    "客户群相对画像（列内标准分）": "Relative segment profiles (column z-scores)",
    "最大群体是 ": "The largest segment is ",
    "，占客户的 ": ", representing ",
    "历史消费中位数最高的是 ": "The segment with the highest historical median spend is ",
    "，近365天消费中位数为 ": ", with median spend of ",
    "热力图展示的是各群体相对于其他群体的高低，不是绝对金额。": "The heatmap shows each segment relative to the others rather than absolute amounts. ",
    "运营名称由可审计的相对规则生成；真正上线前仍应由业务团队检查名称是否符合品牌语言和可执行策略。": "Operational names are generated by auditable relative rules; before deployment, the business team should still confirm that the language fits the brand and intended actions.",
    "# 依据跨群体相对画像进行唯一命名；命名只用于运营沟通，不宣称是自然存在的人格类型。": "# Assign unique names from relative cross-segment profiles; names are operational labels, not natural personality types.",
    "未来90天复购率": "Repurchase rate during the next 90 days",
    "复购率": "Repurchase rate",
    "未来90天人均消费": "Average spend during the next 90 days",
    "英镑": "GBP",
    " 的未来90天复购率最高，为 ": " has the highest 90-day repurchase rate at ",
    " 最低，为 ": " has the lowest at ",
    "未来行为没有参与聚类，因此群体之间的差异提供了样本外业务验证。": "Future behavior was not used for clustering, so differences between segments provide out-of-sample business validation. ",
    "但这仍是观察性结果：它说明分群与未来行为相关，不能证明针对某一群体发券一定会提高复购。": "The result remains observational: it shows that segment membership is associated with future behavior, not that issuing a coupon to a segment will causally increase repurchase.",
    "# Wilson 95% 区间，展示各群Repurchase rate估计的不确定性。": "# Wilson 95% intervals show uncertainty in each segment's repurchase-rate estimate.",
    "**{best.segment}** 的Repurchase rate during the next 90 days最高，为 **{best.repurchase_rate_90d:.1%}**；": "**{best.segment}** has the highest 90-day repurchase rate at **{best.repurchase_rate_90d:.1%}**; ",
}

for index, cell in enumerate(nb.cells):
    if cell.cell_type == "markdown":
        cell.source = markdown_cells[index]
    else:
        source_text = cell.source
        for old, new in replacements.items():
            source_text = source_text.replace(old, new)
        cell.source = source_text
        cell.outputs = []
        cell.execution_count = None

nbf.write(nb, target)
print(target)
