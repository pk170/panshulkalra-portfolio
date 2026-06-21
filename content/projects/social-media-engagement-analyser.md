---
title: 'Social Media Engagement Analyser (Facebook)'
description: 'An unsupervised machine learning model utilizing K-Means clustering to segment user engagement metrics.'
date: '2026-02-20'
slug: '/projects/social-media-engagement-analyser'
github: 'https://github.com/panshulkalra/Live-Commerce-Segmenter-'
---

## The Objective
The goal of this project was to discover underlying patterns in social media commerce by analyzing engagement data from Facebook Live sellers. By segmenting different types of live streams based on user interaction, we can mathematically identify the drivers of high-converting content.

## Technical Methodology
This project heavily utilized **Python** for data processing and unsupervised machine learning, focusing specifically on clustering algorithms.

* **Feature Engineering:** Processed a dataset of user engagement metrics, isolating key features such as `num_reactions`, comments, and shares to serve as the primary dimensions for the model.
* **Algorithmic Modeling:** Engineered a K-Means clustering algorithm to segment the data into distinct behavioral groups. 
* **Optimization:** Utilized the "Elbow Method" to calculate the mathematically optimal number of clusters, ensuring the model was driven by data variance rather than arbitrary selection.

## Key Takeaways
This analysis demonstrated the power of unsupervised learning in extracting structure from unlabeled data. By relying on geometric distance within the feature space, the algorithm successfully identified discrete tiers of seller performance without needing predefined categories.