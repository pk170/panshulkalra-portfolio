---
title: 'Sales Prediction Algorithm'
description: 'A machine learning model utilizing linear regression to forecast retail performance, built with Pandas and Scikit-Learn.'
date: '2026-02-15'
slug: '/projects/sales-prediction'
github: 'https://github.com/panshulkalra/Retail-Sales-Forecasting'
---

## The Objective
The goal of this project was to engineer a robust machine learning pipeline capable of predicting future retail sales based on historical data. Accurate sales forecasting is critical for optimizing supply chain logistics and maintaining efficient inventory levels.

## Technical Methodology
I utilized **Python** for the core analytical engine, relying heavily on data science libraries to clean, process, and model the dataset.

* **Data Processing:** Leveraged `Pandas` and `NumPy` to handle missing values, encode categorical variables, and normalize numerical features, ensuring the dataset was primed for algorithmic training.
* **Model Engineering:** Implemented a Linear Regression model using `Scikit-Learn`. I split the data into training and testing sets to validate the model's accuracy and prevent overfitting.
* **Evaluation:** Calculated the Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE) to quantify the model's predictive performance against real-world baseline metrics.

## Key Takeaways
Building this model reinforced the critical importance of feature engineering. The algorithm's accuracy improved significantly once the input data was properly scaled and the statistical outliers were handled.

This foundational architecture can easily be scaled to incorporate more complex ensemble methods like Random Forests or Gradient Boosting in future iterations.