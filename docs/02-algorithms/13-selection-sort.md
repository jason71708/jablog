---
title: 'Selection Sort'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

Selection Sort 實作上是遍歷一次陣列，找出最小值，並將最小值與陣列的第一個值交換，以此類推，再遍歷一次陣列 (先前排序好的位置可以略過) 找出最小值，並將最小值與陣列的第二個值交換。

以 `[30, 5, 1, 31, 10, 9, 2, 3, 4, 8, 7, 6]` 來說：
- 第一次遍歷：1 為最小值，與位於第一的 30 交換位置，為
- `[1, 5, 30, 31, 10, 9, 2, 3, 4, 8, 7, 6]`
- 第二次遍歷：2 為最小值，與位於第二的 5 交換位置，為
- `[1, 2, 30, 31, 10, 9, 5, 3, 4, 8, 7, 6]`
- 第三次遍歷：3 為最小值，與位於第三的 30 交換位置，為
- `[1, 2, 3, 31, 10, 9, 5, 30, 4, 8, 7, 6]`
- 以此類推直到最後一次遍歷，最後的陣列為
- `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31]`。

## In-place

一定會有人想說為何不建立新的陣列然後把取得的值放進去就好，最後回傳這個新的陣列。

簡單來說就是要節省空間，降低空間複雜度。

若要建立新的陣列並回傳的話空間複雜度就會是 **O(n)** 了，原始的陣列越大，回傳的陣列也會越大。

但如果都是在原本的陣列上做交換位置的動作的話，空間複雜度會優化成 **O(1)** ，原始陣列不管多大也不會消耗額外的儲存空間。

而此做法稱為 In-place algorithm (原地演算法) ，輸入的陣列經過演算法執行過後會被改變其內部的順序或資料。

就像 JavaScript 中陣列的方法 `Array.sort` 就是其中一個例子，使用 `Array.sort` 後陣列內元素順序會改變，並不是像 `Array.map` 那樣會回傳一個新的陣列而不影響原本陣列。

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
