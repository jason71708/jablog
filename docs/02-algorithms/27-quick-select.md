---
title: 'Quick Select'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

Quick Select 簡而言之就是使用基準值 (pivot) 比對排序，並透過 [Recursion](./09-recursion.md) 的技巧，不斷將每個元素放到正確的位置上。
(之前的 [Quick Sort](./16-quick-sort.md) 就是使用此方法來實作，只是忘了 Quick Select 直接略過先寫 [Quick Sort](./16-quick-sort.md) 了XD)

## Fundamental

主要概念在 [Quick Sort](./16-quick-sort.md) 都有詳細解釋，此演算法適合用來在陣列中找到第 kth 的數字，它不用像 [Quick Sort](./16-quick-sort.md) 兩邊都要處理排序，只需要在第 kth 的數字在的那一邊處理比對即可，因此可以將其簡化成每次算出的基準值 (pivot) 若比 kth 大，就往左半邊找，若比 kth 小，就往右半邊找，若相等，就回傳答案。

## Implementation

```js
function quickSelect(nums, start, end, kth) {
  if (start === end) return nums[start];

  const pivot = pivotHelper(nums, start, end);

  if (pivot === kth) {
    return nums[pivot];
  } else if (pivot > kth) {
    return quickSelect(nums, start, pivot - 1, kth);
  } else {
    return quickSelect(nums, pivot + 1, end, kth);
  }
}
```

`pivotHelper` 的部分就直接複製貼過來了：

```js
function pivotHelper(array, startIndex, endIndex) {
  const swap = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };

  let pivot = array[startIndex];
  let pivotIndex = startIndex;

  for (let i = startIndex + 1; i <= endIndex; i++) {
    if (array[i] < pivot) {
      pivotIndex++;
      swap(array, pivotIndex, i);
    }
  }

  swap(array, startIndex, pivotIndex);
  return pivotIndex;
}
```

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity | Space Complexity (Worst) |
| ---------------------- | ------------------------- | ----------------------- | ---------------- | ------------------------ |
| *O(n)*                 | *O(n)*                    | *O(n²)*                 | *O(log n)*       | *O(n)*                   |

最差的情況下和 [Quick Sort](./16-quick-sort.md) 一樣，每輪排序完後，基準值的其中一邊只有 1 或 0 個元素，根本沒有剖半到。所以時間複雜度是 O(n²)，同理空間複雜度也會因此變成每個元素都要 Recursion 一次 所以是 O(n) ，但是這個情況可以用 *隨機取基準值* 的方式來避開。

至於平均和最佳情況的時間雜度是 O(n) 的原因是每次剖半後只比對其中一邊： n + 1/2 \* n + 1/4 \* n + 1/8 \* n + 1/16 \* n ...，會無限趨近於 2n 。

## Optimization

上段提到避開最差的情況可以用 *隨機取基準值* 的方式，以下就來修改下 `pivotHelper` 的實作：

```js
function pivotHelper(array, startIndex, endIndex) {
  const swap = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };

  let pivotIndex = left + Math.floor(Math.random() * (right - left)); // 取隨機一個位置當作 pivot
  let pivot = array[pivotIndex];

  swap(array, startIndex, pivotIndex); // 將基準值放在第一個位置

  // 因為第一個位置是基準值，所以從第二個開始比較
  for (let i = startIndex + 1; i <= endIndex; i++) {
    if (array[i] < pivot) {
      pivotIndex++;
      swap(array, pivotIndex, i);
    }
  }

  swap(array, startIndex, pivotIndex); // 一樣，比對完後將基準值所在的第一個位置和最終比對出來的位置調換。
  return pivotIndex;
}
```

雖然還是有機率隨機取基準值後都是取到最左或最右的位置，所以最差情況依然是 O(n²)，但是在實務上可以很大幅度避開且接近平均情況。
