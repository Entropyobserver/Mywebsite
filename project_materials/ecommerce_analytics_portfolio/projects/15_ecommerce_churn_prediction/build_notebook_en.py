from pathlib import Path

import nbformat as nbf


PROJECT_DIR = Path(__file__).resolve().parent
source = PROJECT_DIR / "notebooks/01_ecommerce_inactivity_prediction_cn.ipynb"
target = PROJECT_DIR / "notebooks/02_ecommerce_inactivity_prediction_en.ipynb"
nb = nbf.read(source, as_version=4)

markdown_cells = {
    0: """# E-commerce 90-Day Purchase Inactivity Prediction

## Business question

If the business can contact only a limited number of customers each month, who should receive priority? At the beginning of each month, this project creates a customer snapshot from the previous 180 days of transactions and predicts whether the customer will make **no successful purchase during the following 90 days**.

The target is described as 90-day purchase inactivity rather than permanent churn. The public transactions contain no account closure, subscription termination, or explicit customer-departure field; a 90-day absence is a reproducible operational proxy.

## Project highlights

- Uses more than one million real transaction lines rather than a simulated churn label;
- Converts transaction details into a deployable customer-month feature table;
- Uses rolling time validation with a 90-day purge gap so training labels mature before each validation point;
- Compares Logistic Regression, Random Forest, HistGradientBoosting, and XGBoost;
- Reports PR-AUC, ROC-AUC, Brier score, Top-10% recall, and lift rather than accuracy alone;
- Translates model scores into a capacity-constrained priority list without making causal claims.
""",
    1: """## 1. Data source and interpretation boundary

The data come from **Online Retail II** in the UCI Machine Learning Repository: transactions from a UK-based non-store retailer between 1 December 2009 and 9 December 2011. Fields include invoice, product, quantity, timestamp, unit price, customer, and country, with cancellations and missing customer identifiers.

- Official page: https://archive.ics.uci.edu/dataset/502/online+retail+ii
- DOI: https://doi.org/10.24432/C5CG6D
- License: CC BY 4.0

**Interpretation boundary:** the model predicts the probability of no successful purchase during the next 90 days, not permanent customer departure. Predictive association is also not the causal increment from a retention action. Coupons and outreach still require a randomized experiment.
""",
    3: "## 2. Read both transaction years and audit the raw data",
    5: "## 3. Clean the transactions and separate successful purchases from cancellations / returns",
    7: """## 4. Construct customer-month snapshots and the target

For every snapshot date:

- **Observation window:** previous 180 days;
- **Prediction window:** following 90 days;
- **Eligibility:** at least one successful purchase in the observation window;
- **Target `inactive_90d=1`:** no successful purchase in the prediction window;
- **Customer ID is never used as a model feature.**

The same customer may be scored in multiple months, matching a monthly operating process. Validation is separated by time instead of randomly splitting observations from the same period.
""",
    9: "## 5. Feature quality and business meaning",
    11: """## 6. Rolling validation with a 90-day purge gap

If the customer state on 1 July 2011 is the validation point, every 90-day training label must be fully observed before that date. Training snapshots can therefore extend only through 1 April 2011. This purge gap is stricter than an ordinary time split and prevents overlapping label windows from creating optimistic results.
""",
    13: "## 7. Compare four model families",
    15: "## 8. Final untouched test: September 2011 customer snapshot",
    17: "## 9. Convert probabilities into an operating list: Top 10% and risk deciles",
    19: "## 10. Probability calibration and leading predictive signals",
    21: """## 11. Business conclusions and next steps

### Decisions this project can support

1. Score customers monthly when they have purchased during the previous 180 days;
2. Under fixed contact capacity, send the highest-risk tier into a controlled CRM candidate list;
3. Monitor actual inactivity, calibration, model drift, and Top-K lift by risk decile;
4. Keep a randomized control group within the high-risk list to measure the incremental effect of email, coupons, or service outreach.

### What the project cannot prove

- No purchase for 90 days does not mean permanent churn;
- Predictive risk factors are not causal retention levers;
- The data contain no campaign cost, margin, or contact outcome, so retention ROI cannot be estimated;
- The data represent one UK retailer. Deployment on Tmall, JD, Pinduoduo, or Amazon requires new windows, labels, and thresholds.

### Production extensions

- Generate the same customer snapshot in SQL every month;
- Add training data only when labels have matured and preserve the 90-day purge gap;
- Track data, feature, model, and threshold versions;
- Monitor PR-AUC, Top-K lift, calibration, feature drift, and experiment incrementality.

This project directly demonstrates **classification models for behavioral data analysis with systematic cross-validation** and a **reproducible Python/SQL feature and evaluation pipeline**. The 48,079 rows are repeated customer-month snapshots—not 48,079 independent customers—and must not be used to inflate the resume's customer count.
""",
}

replacements = {
    "# 无论从 portfolio 根目录、项目目录还是 notebooks 目录启动，都自动定位原始数据。": "# Locate the raw data automatically from the portfolio root, project directory, or notebooks directory.",
    "数据文件：": "Data file: ", "输出目录：": "Output directory: ",
    "**结果解释：**": "**Result interpretation:** ",
    "路径检查通过，后续输出将统一保存在本项目的 `outputs` 目录，不会在材料库中创建额外的散乱文件夹。": "Path validation passed. Subsequent outputs are stored in this project's `outputs` directory without creating additional scattered folders.",
    '"指标"': '"Metric"', '"结果"': '"Result"',
    '"工作表"': '"Worksheets"', '"交易明细行"': '"Transaction lines"',
    '"日期起点"': '"Start timestamp"', '"日期终点"': '"End timestamp"',
    '"唯一发票"': '"Unique invoices"', '"唯一客户（非空）"': '"Unique customers (non-missing)"',
    '"客户编号缺失率"': '"Missing customer-ID rate"',
    "原始文件共有 ": "The raw file contains ", " 条商品行、": " product lines and ",
    " 个可识别客户，日期跨度为 ": " identifiable customers, covering ", " 至 ": " to ",
    "客户编号缺失率为 ": "The missing customer-ID rate is ",
    "；缺失编号无法形成客户历史，因此只能用于数据质量审计，不能进入客户级建模。": ". Missing identifiers cannot form customer histories, so those rows remain in the data-quality audit but cannot enter customer-level modeling.",
    '"检查项"': '"Check"', '"原始明细"': '"Raw lines"', '"缺失客户编号"': '"Missing customer ID"',
    '"取消/负数量明细"': '"Cancellation / negative-quantity lines"', '"非正价格明细"': '"Non-positive-price lines"',
    '"可用于成功购买建模的明细"': '"Successful-purchase lines eligible for modeling"',
    '"行数"': '"Rows"', '"占原始数据比例"': '"Share of raw data"',
    "建模只把数量和价格均为正、且不是取消发票的 ": "Only the ",
    " 条记录视为成功购买。": " records with positive quantity and price and no cancellation invoice are treated as successful purchases. ",
    "取消/负数量记录没有被简单删除：它们被单独保留，并在特征阶段形成取消次数和取消金额特征。": "Cancellation and negative-quantity records are not simply discarded; they are retained separately to create cancellation-count and cancelled-value features. ",
    "这避免把退货误当成新购买，也保留了可能与未来不活跃有关的售后信号。": "This prevents returns from being counted as new purchases while preserving after-sales signals that may help predict future inactivity.",
    "各月客户未来 90 天不活跃率": "Customer 90-day inactivity rate by monthly snapshot", "快照月份": "Snapshot month", "不活跃率": "Inactivity rate",
    "整体 90 天Inactivity rate为 ": "The overall 90-day inactivity rate is ",
    "Inactivity rate随月份变化，说明随机切分会混合不同时期的分布；因此下一步必须按时间验证。": "Inactivity changes across months, so random splitting would mix different temporal distributions; model validation must therefore follow time. ",
    "共生成 ": "The pipeline creates ", " 个客户—月份样本，覆盖 ": " customer-month samples across ", " 个快照。": " snapshots. ",
    "整体 90 天不活跃率为 ": "The overall 90-day inactivity rate is ",
    "不活跃率随月份变化，说明随机切分会混合不同时期的分布；因此下一步必须按时间验证。": "Inactivity changes across months, so random splitting would mix different temporal distributions; model validation must therefore follow time. ",
    "快照只纳入过去 180 天仍有交易的客户，模型回答的是‘近期客户中谁将停止购买’，而不是识别多年未出现的沉睡账户。": "Snapshots include only customers with a purchase during the previous 180 days. The model answers who among recent customers will stop purchasing, rather than identifying accounts that have already been dormant for years.",
    "最近一次购买距快照日的天数": "Days since the most recent purchase", "首次购买距快照日的天数": "Days since the first observed purchase",
    "不同窗口的频次、金额和件数": "Frequency, spend, and units over multiple windows", "近 180 天平均订单金额": "Average order value during the previous 180 days",
    "近 180 天购买商品丰富度": "Distinct products during the previous 180 days", "订单间隔均值与波动": "Mean and variability of purchase intervals",
    "近 30 天相对前 60 天月均水平的变化": "Recent 30-day activity relative to the prior 60-day monthly average",
    "取消/退货发票数量与绝对金额": "Cancellation / return invoice count and absolute value", "客户主要国家是否为英国": "Whether the customer's primary country is the UK",
    '"特征组"': '"Feature group"', '"业务含义"': '"Business meaning"', '"缺失率"': '"Missing rate"',
    "缺失主要来自‘购买间隔’：观察窗内只有一笔订单的客户没有可计算的间隔。": "Missingness is concentrated in purchase intervals because customers with only one order in the observation window have no interval to calculate. ",
    "这不是数据错误，建模管道会只用训练期中位数填补，避免用验证期或测试期信息。": "This is expected behavior rather than a data error. The pipeline imputes with the training-period median only, avoiding validation or test information. ",
    "客户编号仅用于建立时间历史，未进入特征；模型不能靠记住客户 ID 得分。": "Customer ID is used only to build histories and never enters the feature set, so the model cannot score by memorizing an identifier.",
    '"阶段"': '"Stage"', '"滚动验证 {i}"': '"Rolling validation {i}"', '"训练快照截止"': '"Training snapshot cutoff"',
    '"验证快照"': '"Validation snapshot"', '"训练样本"': '"Training samples"', '"验证样本"': '"Validation samples"',
    '"最终留出测试"': '"Final untouched test"',
    "模型选择只使用前三个滚动验证月；最后的 2011-09 快照完全留到模型选定后再评估。": "Model selection uses only the first three rolling validation months. The September 2011 snapshot remains untouched until after model selection. ",
    "每个训练截止日与验证日之间至少相隔 90 天，所以训练标签在预测时点之前已经成熟。": "Every training cutoff is separated from validation by at least 90 days, ensuring that training labels have matured before the prediction point.",
    "按主指标平均 PR-AUC，滚动验证表现最好的模型是 ": "Using mean PR-AUC as the primary metric, the best rolling-validation model is ",
    "平均 PR-AUC 为 ": "Its mean PR-AUC is ",
    "PR-AUC 比准确率更适合评估需要优先排序的风险任务；ROC-AUC 衡量整体排序，Brier 越低表示概率误差越小。": "PR-AUC is more informative than accuracy for a prioritization task; ROC-AUC measures overall ranking, while a lower Brier score indicates smaller probability error. ",
    "这里不根据最后测试月选模型，因此测试结果仍是一次真正的样本外检验。": "The final test month does not influence model selection, preserving a genuine out-of-sample evaluation.",
    '"无模型排序的 PR-AUC 基线"': '"No-model PR-AUC baseline"',
    "最终测试月包含 ": "The final test month contains ", " 个近期客户，实际不活跃率为 ": " recent customers with an observed inactivity rate of ",
    " 个近期客户，实际Inactivity rate为 ": " recent customers with an observed inactivity rate of ",
    "选定模型的 PR-AUC 为 ": "The selected model achieves PR-AUC of ", "，高于不做排序时的基线 ": ", above the no-model ranking baseline of ",
    "ROC-AUC 为 ": "ROC-AUC is ",
    "这说明模型能够进行风险排序，但测试月只有一个时间截面，不能把该分数解释为所有未来月份都能保持不变。": "The model can rank risk, but the test covers only one temporal snapshot and the score should not be assumed to persist across every future month.",
    '"运营指标"': '"Operational metric"', '"Top 10% 客户数"': '"Top-10% customers"', '"Top 10% 精确率"': '"Top-10% precision"',
    '"Top 10% 召回率"': '"Top-10% recall"',
    "# 不导出公开客户 ID 名单，只保留聚合结果；真实业务中该名单应进入受控 CRM 环境。": "# Do not export a public customer-ID list; retain aggregate results only. In production, the list belongs in a controlled CRM environment.",
    "如果运营容量只允许触达最高风险的 10%（": "If operating capacity permits contact with only the highest-risk 10% (",
    " 人），": " customers), ", "其中实际未来 90 天未购买的比例为 ": "the observed 90-day inactivity rate within that group is ",
    "，可覆盖全部不活跃客户的 ": ", covering ", "相对不做模型筛选的 Lift 为 ": " of all inactive customers. Lift relative to no model targeting is ",
    " 倍": "x",
    "这展示的是名单浓缩能力，不是召回活动带来的增量效果；是否值得发券仍要结合成本、利润和随机对照实验。": "This demonstrates list concentration rather than the incremental effect of a retention action. Coupon decisions still require cost, margin, and a randomized control.",
    "十分位概率校准": "Probability calibration by decile", "平均预测风险": "Mean predicted risk", "实际不活跃率": "Observed inactivity rate",
    "实际Inactivity rate": "Observed inactivity rate",
    "置换重要性（PR-AUC 降幅）": "Permutation importance (PR-AUC decrease)", "打乱该特征后的 PR-AUC 降幅": "PR-AUC decrease after feature permutation",
    "测试集 Brier 分数为 ": "The final-test Brier score is ", "；校准图比较‘模型预测概率’与‘实际发生率’，": ". The calibration plot compares predicted probabilities with observed rates. ",
    "两者越接近对角线，概率越适合直接用于资源和预算估算。": "The closer the points are to the diagonal, the more suitable the probabilities are for direct resource and budget estimation. ",
    "置换重要性排名靠前的信号为 ": "The leading permutation-importance signals are ",
    "重要性表示这些变量对样本外预测有帮助，不代表改变它们会因果地阻止客户不活跃。": "Importance indicates out-of-sample predictive value, not that changing a feature would causally prevent inactivity.",
}

for index, cell in enumerate(nb.cells):
    if cell.cell_type == "markdown":
        cell.source = markdown_cells[index]
    else:
        text = cell.source
        for old, new in replacements.items():
            text = text.replace(old, new)
        cell.source = text
        cell.outputs = []
        cell.execution_count = None

nbf.write(nb, target)
print(target)
