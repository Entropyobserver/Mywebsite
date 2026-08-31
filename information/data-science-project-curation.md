# Data science portfolio curation

This note records how the selected website case studies map to the Data Scientist resume and to evidence in `projects_DS`. The source notebooks remain unchanged; the website contains concise, stakeholder-facing summaries.

| Resume capability                             | Website case study                           | Source evidence                                                                                         |
| --------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Customer segmentation and behavioral analysis | E-commerce Customer Retention & Segmentation | `projects_customer_analytics/02_customer_retention_cohort&rfm/rfm&kmeans_analysis_online_dataset.ipynb` |
| A/B testing and statistical inference         | Marketing Conversion A/B Testing             | `projects_product_analytics/a-b-testing-analysis.ipynb`                                                 |
| Forecasting and model evaluation              | Retail Sales Forecasting & Model Comparison  | `projects_product_analytics/timeseries_analysis/timeseries_analysis_superstore.ipynb`                   |
| Classification and interpretable ML           | E-commerce Customer Churn Prediction         | `projects_customer_analytics/04_customer_churn_prediction/customer_churn_prediction.ipynb`              |

## Curation rules

- Use only metrics visible in saved notebook outputs.
- Distinguish portfolio case studies from claims about professional work.
- Prefer business questions, evaluation design, and decision relevance over a list of libraries.
- Keep causal claims out of observational analyses.
- Leave raw datasets and notebooks in `projects_DS`; do not copy large or potentially redistributable data files into the public website.
