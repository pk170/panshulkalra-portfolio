---
title: 'Oncology Outcome Classifier'
description: 'A predictive machine learning model analyzing SEER registry datasets to assess patient survival outcomes.'
date: '2026-03-01'
slug: '/projects/seer-cancer-analysis'
github: 'https://github.com/panshulkalra/Oncology-Outcome-Classifier'
---

## Project Overview
This project implements a comprehensive machine learning pipeline to predict patient survival outcomes using the SEER (Surveillance, Epidemiology, and End Results) Breast Cancer dataset. The system benchmarks 8 different classification algorithms to establish a "Champion Model" for clinical outcome prediction.

## Tech Stack
* **Language:** Python 3.x
* **Data Processing:** Pandas, NumPy, Regex
* **Visualization:** Seaborn, Matplotlib
* **Machine Learning:** Scikit-Learn (KNN, SVM, FFNN, Random Forest), XGBoost, LightGBM, CatBoost

## Methodology & Clinical Engineering
Medical data analysis requires a specialized approach, as the model must not only be accurate but also highly interpretable to provide clinical value. 

* **Data Leakage Prevention:** Strictly dropped the "Survival Months" feature prior to training to prevent the model from artificially learning the outcome.
* **Feature Engineering:** Synthesized a new biological marker, the Lymph Node Ratio (LNR), by computing the ratio of positive nodes to examined nodes.
* **Regex Sanitization:** Cleaned column nomenclatures to ensure compatibility with LightGBM's strict parsing constraints.
* **Benchmarking:** Scaled all features and trained 8 distinct architectures, ranging from distance-based (KNN) and structural (Neural Networks) to advanced tree ensembles (Gradient Boosting).

## Key Results
* Extracted and visualized the **Pearson Correlation Matrix** to map biological relationships.
* Identified **XGBoost** as the Champion Model for the clinical deep dive.
* Generated **Feature Importance Profiles**, identifying the most critical variables driving mortality predictions in the dataset.

## Key Takeaways
This project highlighted the critical balance between raw algorithmic performance and domain-specific constraints. By translating clinical registry data into a machine-readable format, the model successfully identified key prognostic indicators, demonstrating how data-driven insights can effectively supplement traditional medical prognostic tools.