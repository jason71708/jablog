---
title: 'Divide and Conquer'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

## Introduction

將一組資料切分成兩個或多組資料，再用切分後的資料進行處理。

此技巧能有效減少時間複雜度。

此技巧大量用於搜尋演算法內，以下用**二分搜尋法 (Binary Search)**來舉例：

## Practice 1 - Binary Search

給定一個**排序過**的數字陣列與一個數字 `n`，在陣列中找出該數字 `n` 的位置，若沒有則回傳 `-1`。

較差解法：

```js
function linearSearch(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      return i;
    }
  }
  return -1;
}
```

時間複雜度是 O(n)。

使用 Divide and Conquer 技巧：

```js
function binarySearch(arr, n) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === n) {
      return mid;
    } else if (arr[mid] < n) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// 例如： [1, 4, 5, 6, 11, 14, 23, 45, 67, 89, 100] 找出 89 的位置
// 因為是排序過的陣列，先抓中間位置的數字 14，若 89 比它大則往右搜尋，若小則往左搜尋。
// 接著繼續抓右半邊的中間數字 67，若 89 比它大則往右搜尋，若小則往左搜尋。
// 繼續比對，直到找到 89 或跳出迴圈為止。
```

二分法搜尋有效減少了搜尋比較次數，時間複雜度為 **O(log n)**。
