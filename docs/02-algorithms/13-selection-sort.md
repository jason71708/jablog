---
title: 'Selection Sort'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

## Introduction

Selection Sort 實作上是遍歷一次陣列，找出最小值，並將最小值與陣列的第一個值交換，以此類推，再遍歷一次陣列 (先前排序好的位置可以略過) 找出最小值，並將最小值與陣列的第二個值交換。

以 `[30, 5, 1, 31, 10, 9, 2, 3, 4, 8, 7, 6]` 來說：
1. 第一次遍歷：1 為最小值，與位於第一的 30 交換位置，為 `[1, 5, 30, 31, 10, 9, 2, 3, 4, 8, 7, 6]`
2. 第二次遍歷：2 為最小值，與位於第二的 5 交換位置，為 `[1, 2, 30, 31, 10, 9, 5, 3, 4, 8, 7, 6]`
3. 第三次遍歷：3 為最小值，與位於第三的 30 交換位置，為 `[1, 2, 3, 31, 10, 9, 5, 30, 4, 8, 7, 6]`

以此類推直到最後一次遍歷，最後的陣列為 `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31]`。

## Practice

依據以上範例，實作 Selection Sort：

<details>
  <summary>Solution</summary>

  ```js
  function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }
      if (minIndex !== i) {
        const temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
      }
    }
    return arr
  }
  ```
</details>

巢狀遍歷陣列，Selection Sort 的時間複雜度為 **O(n²)**。
