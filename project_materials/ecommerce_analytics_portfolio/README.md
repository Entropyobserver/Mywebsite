# E-commerce Analytics Portfolio

An end-to-end portfolio covering the full e-commerce value chain: acquisition, conversion, customers, products, marketing, pricing, inventory, fulfillment, returns, service, profitability, risk, planning, and personalization.

The original `projects_DS` directory remains the source and experimentation library. This repository contains only curated, reproducible, business-facing projects.

## Portfolio principles

- Start from a concrete business decision, not a model or chart.
- Define every KPI before calculating it.
- Separate descriptive, predictive, experimental, and causal claims.
- Keep raw data local and document its origin.
- Produce reusable tables and decision-ready outputs.
- Report uncertainty, limitations, and data-quality risks.

## Project roadmap

| No. | Domain | Core decision | Status |
| --- | --- | --- | --- |
| 01 | Business overview | How are sales, orders, categories, and sellers performing? | Complete — Olist |
| 02 | Traffic and acquisition | Which channels acquire valuable customers efficiently? | Planned |
| 03 | Conversion funnel | Where do users leave before payment? | Planned |
| 04 | Customer analytics | Which customers should be retained, reactivated, or developed? | Partial — Online Retail II 90-day inactivity risk |
| 05 | Product analytics | Which products drive growth, profit, and returns? | Planned |
| 06 | Marketing incrementality | Did the campaign cause incremental value? | Planned |
| 07 | Pricing and promotions | Do discounts increase contribution profit? | Planned |
| 08 | Inventory and supply chain | How much stock is needed, and where is it at risk? | Planned |
| 09 | Fulfillment and logistics | Which delivery problems damage experience and cost? | Planned |
| 10 | Returns and after-sales | Why are orders returned, and what do returns cost? | Planned |
| 11 | Customer service and reviews | Which issues reduce satisfaction and repeat purchase? | Complete — real Amazon review data |
| 12 | Finance and profitability | Is revenue growth economically sustainable? | Planned |
| 13 | Risk and fraud | Which orders, payments, or promotions are suspicious? | Planned |
| 14 | Forecasting and planning | What demand, revenue, and inventory should be planned? | Planned |
| 15 | Recommendation and personalization | What should each customer see next? | Planned |

See [the detailed roadmap](docs/portfolio_roadmap.md) for deliverables and dependencies, and the [Chinese data-source registry](docs/data_source_registry_cn.md) for provenance and claim boundaries.

## Current featured project

### 11 — Amazon Review Intelligence & Product Quality Diagnosis

The first resume-aligned featured project uses 2,500,939 real public Amazon Fashion reviews from Amazon Reviews 2023. Its executed Chinese notebook builds a deterministic 100,000-review analytical sample, validates data quality, trains a time-split TF-IDF sentiment baseline, audits errors, diagnoses review aspects, and creates a statistically smoothed product-review risk queue. Every result is followed by a Chinese interpretation and an explicit claim boundary.

See the [project case study](projects/11_customer_service_reviews/README.md) and the executed [Chinese notebook](projects/11_customer_service_reviews/notebooks/01_amazon_review_intelligence_cn.ipynb).

## Current customer analytics projects

### 04 — Customer Segmentation & Lifecycle Analysis

This project uses K-Means and Ward hierarchical clustering on 4,335 customers derived from Online Retail II. It evaluates cluster count, perturbation stability, alternative algorithms, aggregate customer profiles, and future 90-day purchasing behavior. See the [project case study](projects/04_customer_analytics/README.md) and the executed [Chinese notebook](projects/04_customer_analytics/notebooks/01_customer_segmentation_cn.ipynb).

### Customer inactivity risk — Online Retail II

This executed project converts 1,067,371 real transaction lines into 48,079 monthly customer snapshots and predicts whether a recently active customer will make no successful purchase during the next 90 days. It compares four classifiers under rolling time validation with a 90-day purge gap, then evaluates the selected model on an untouched final month. See the [project case study](projects/15_ecommerce_churn_prediction/README.md) and the executed [Chinese notebook](projects/15_ecommerce_churn_prediction/notebooks/01_ecommerce_inactivity_prediction_cn.ipynb).

## Current foundational project

### 01 — Olist E-commerce Business Overview

This project uses the Olist order relationships to build a concise business-performance analysis covering sales, orders, AOV, order status, freight, categories, products, and sellers.

It deliberately excludes contribution profit and multi-platform claims because the available data do not contain real COGS, advertising, marketplace-fee, or cross-border-cost fields. See the [project case study](projects/01_business_overview/README.md) and [Chinese project structure](docs/01_olist_business_overview_structure_cn.md).
