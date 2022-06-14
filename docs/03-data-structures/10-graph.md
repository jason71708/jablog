---
title: 'Graph'
tags:
  - data structures
keywords: [data structures, 資料結構]
---

## Introduction

簡言之， Graph 就是很多個節點與節點之間的連線所組成的，與前幾篇提到的 [Three](./05-binary-search-tree.md) 也算是 Graph 的一種 ， Graph 主要有以下幾點特色：
- Graph 沒有特定的根節點
- 節點之間的連線可以有或沒有方向性
- 一個節點可以任意與多個節點連線
- 節點之間的連線可以有權重 (例如地圖上兩個景點間的連線距離)

Graph 是目前最廣泛應用的資料結構之一，在社群網路、地圖與路線演算法、推薦廣告等等都可以用到。

當提到 Graph 時有幾點名詞與用途也要介紹一下：

- Vertex - 節點
- Edge - 節點之間的連線
- Undirected - 節點之間的連線**沒有方向性** (雙向)
- Directed - 節點之間的連線**有方向性** (單向或雙向)
- Weighted - 節點之間的連線**有權重**
- Unweighted - 節點之間的連線**沒有權重**

在實作前先來介紹兩種存 Graph 資料的方式：
1. Adjacency Matrix (相鄰矩陣)
2. Adjacency List (相鄰列表)

## Storing Graph - Adjacency Matrix

>![graph-uw-ud](./graph-uw-ud.png)
![ad-matrix-uw-ud](./ad-matrix-uw-ud.png)
[來源](https://visualgo.net/en/graphds)

以上圖為範例， Adjacency Matrix 以表格的方式來表示每個節點之間有無連線，有的話寫 1 、沒有的話寫 0 (要用 `true` 、 `false` 也可，只要能表示有無的就行)。
