---
title: 'Binary Search Tree'
tags:
  - data structures
keywords: [data structures, 資料結構]
---

## Introduction

一種樹狀資料結構，含有根節點與子節點，每個節點彼此是親子的關聯。

1. Root: 根節點，樹狀資料結構的第一個的節點。
2. Child: 子節點，具有父節點。
3. Parent: 具有子節點的節點。
4. Siblings: 兄弟節點，具有同個父節點。
5. Leaf: 沒有子節點的節點。
6. Edge: 兩個節點彼此的關聯。

下列兩種情況不是樹狀結構：

1. 具有兩個根節點。
2. 關聯指向相鄰的兄弟節點。

而像網頁的 HTML DOM 就是一種樹狀結構，從 `document` , `body` 到各種標籤元素，都具有父子關係。
電腦本身的資料夾結構也是。

而樹的的種類有[非常多樣](https://en.wikipedia.org/wiki/List_of_data_structures#Trees)，除了上述定義的廣泛樹狀結構，其中有兩項也很基本。