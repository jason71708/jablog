---
title: 'Linear Search'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

## Introduction

Linear Search 非常常見，甚至在學迴圈時就已經學過了。以下直接給範例練習！

## Practice - Linear Search

給定一個數字陣列 `array` 與一個數字 `n`，求出 `n` 是否在 `array` 中。回傳 `true` 或 `false。`

<details>
  <summary>Solution</summary>

  ```js
  function linearSearch(array, n){
    for (let i = 0; i < array.length; i++) {
        if (n === array[i]) {
            return true
        }
    }
    return false;
  }
  ```
</details>

最基本的搜尋方式，耗費的時間隨著輸入的資料而增長，時間複雜度為 O(n)。