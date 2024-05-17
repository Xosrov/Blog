---
title: {{ replace .File.ContentBaseName "-" " " | title }}
date: {{ time.Now.Format "2006-01-02" }}
lastmod: {{ time.Now.Format "2006-01-02" }}
draft: false
author: Alireza Miryazdi
# Common-Defined params
summary: ENTER SUMMARY
categories: 
  - Networking
  - Upper
tags: 
  - lower
  - lower
menu: main # Add page to a menu. Options: main, footer
# Theme-Defined params
comments: true # Enable/disable Disqus comments for specific page
authorbox: true # Enable/disable Authorbox for specific page
toc: true # Enable/disable Table of Contents for specific page
tocOpen: true # Open Table of Contents block for specific page
mathjax: true # Enable/disable MathJax for specific page
related: true # Enable/disable Related content for specific page
meta: 
  - date
  - categories
  - tags
---

