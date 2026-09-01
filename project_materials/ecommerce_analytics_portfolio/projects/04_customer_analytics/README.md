# Customer Segmentation & Lifecycle Analysis

## Business question

How should recently active customers be grouped into operationally useful lifecycle and value segments, and do those segments show different purchase behavior during the following 90 days?

## Scope

- Observation cutoff: 2011-09-01
- Feature window: previous 365 days
- External validation window: following 90 days
- Feature groups: RFM, tenure, purchase cadence, product diversity, recent trend, and cancellations
- Main methods: K-Means and Ward hierarchical clustering
- Benchmarks: Gaussian Mixture and HDBSCAN
- Validation: internal clustering metrics, perturbation stability, minimum segment size, and future 90-day purchasing behavior

## Data source

The project reuses the single local copy of UCI Online Retail II under `data/raw/online_retail_ii/`.

- Official page: https://archive.ics.uci.edu/dataset/502/online+retail+ii
- DOI: https://doi.org/10.24432/C5CG6D
- License: CC BY 4.0
- Raw transaction lines: 1,067,371

## Interpretation boundary

Clusters are analytical groupings created by a chosen feature set, scaling method, and algorithm. They are not naturally observed customer types. Future 90-day behavior is used only for external validation and does not establish the causal effect of any retention action.

The public dataset has only several thousand identifiable customers. This project demonstrates the same methodology as the resume claim but does not represent or replace the 150,000+ sample scale described in professional experience.

## Executed results

- Customers segmented at the cutoff: 4,335
- Selected operational solution: five K-Means segments
- Silhouette / perturbation stability ARI: 0.225 / 0.974
- Smallest K-Means segment: 9.5% of customers
- HDBSCAN noise share: 68.3%, making it unsuitable as the primary operational solution
- Future 90-day repurchase rate: 87.1% for high-value loyal customers versus 27.9% for dormant-risk customers

The modest silhouette score is reported explicitly. The five segments are a stable and useful operational simplification, not evidence that five strongly separated natural customer types exist.

## Files

- `notebooks/01_customer_segmentation_cn.ipynb`: executed Chinese analysis with an explanation after every output
- `notebooks/02_customer_segmentation_en.ipynb`: executed English analysis with fully English outputs
- `outputs/kmeans_k_selection.csv`: K selection metrics
- `outputs/algorithm_comparison.csv`: clustering algorithm comparison
- `outputs/customer_segment_profiles.csv`: aggregate segment profiles
- `outputs/kmeans_centroids_transformed_back.csv`: approximate cluster centers transformed back to business units
- `outputs/segment_future_90d_validation.csv`: future purchasing validation by segment

No raw customer-level segment assignment is exported. Only aggregate profiles and model diagnostics are retained.
