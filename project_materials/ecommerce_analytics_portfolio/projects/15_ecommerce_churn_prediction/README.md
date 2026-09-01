# E-commerce 90-Day Purchase Inactivity Prediction

## Business question

Which recently active customers are most likely to make no successful purchase during the next 90 days, and how can a fixed retention capacity be prioritized?

## Scope

- Unit of analysis: customer-month snapshot
- Feature window: previous 180 days
- Prediction window: next 90 days
- Target: no successful purchase in the prediction window
- Validation: rolling time validation with a 90-day purge gap
- Models: Logistic Regression, Random Forest, HistGradientBoosting, and XGBoost
- Primary metric: PR-AUC
- Operational metrics: recall and lift among the top-risk 10%

## Data source

UCI Machine Learning Repository, Online Retail II:

- Dataset page: https://archive.ics.uci.edu/dataset/502/online+retail+ii
- DOI: https://doi.org/10.24432/C5CG6D
- License: CC BY 4.0
- Coverage: 2009-12-01 to 2011-12-09
- Instances reported by UCI: 1,067,371 transaction lines
- Local ZIP SHA-256: `572E36277C2390FBFDE10664750731E0A86F55E33470D91919085F0408E67BFB`

Raw files are stored once under `data/raw/online_retail_ii/` and are not duplicated inside this project.

## Interpretation boundary

The target is a reproducible inactivity proxy, not a confirmed permanent churn event. Model scores support prioritization, not causal claims about retention interventions. Incremental impact and ROI require a subsequent randomized experiment with treatment cost and margin data.

## Executed results

- Customer-month samples: 48,079 across 16 monthly snapshots
- Overall 90-day inactivity rate: 50.9%
- Best rolling-validation model: Logistic Regression
- Mean rolling-validation PR-AUC: 0.744
- Final September 2011 holdout: 2,772 customers, 39.3% inactivity rate
- Final holdout PR-AUC / ROC-AUC: 0.628 / 0.740
- Highest-risk 10%: 74.8% precision, 19.1% recall, 1.90x lift

The decline from validation PR-AUC to the final-month result is retained and reported. It is evidence of temporal distribution change and is one reason the project uses a true final holdout instead of reporting only cross-validation performance.

## Files

- `notebooks/01_ecommerce_inactivity_prediction_cn.ipynb`: fully executed Chinese analysis with an explanation after every result
- `outputs/rolling_time_validation.csv`: fold-level model metrics
- `outputs/model_comparison_summary.csv`: cross-validation summary
- `outputs/final_holdout_metrics.csv`: untouched final-month metrics
- `outputs/final_test_risk_deciles.csv`: aggregate risk-tier performance
- `outputs/final_test_calibration.csv`: predicted versus observed risk by decile
- `outputs/permutation_importance.csv`: model-agnostic feature importance

The raw customer-level scoring list is intentionally not exported; only aggregate evaluation outputs are retained.
