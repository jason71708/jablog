---
title: Leetcode 215. Kth Largest Element in an Array 解法分享
description: 這題可以用 JS 本身提供的 Array.sort 解掉，也可以用 Max Binary Heap，但這兩種方式的時間複雜度都比不上今天要講解的主角 Quick Select。
tags: [javascript, leetcode]
---

這題可以用 JS 本身提供的 `Array.sort()` 解掉，也可以用 [Max Binary Heap](/docs/data-structures/binary-heap/)，但這兩種方式的時間複雜度都比不上今天要講解的主角 [Quick Select](/docs/algorithms/quick-sort/)。

<!--truncate-->

## 解析

用 `Array.sort()` 與 [Max Binary Heap](/docs/data-structures/binary-heap/) 的時間複雜度都是 O(n * log(n))，但是用 [Quick Select](/docs/algorithms/quick-sort/) 可以優化至 O(n)。

這題在敘述中有提到："Can you solve it without sorting?"，有點在引導我們用 [Quick Select](/docs/algorithms/quick-sort/) 來解決。但是！在 test case 中作者又很巧妙的安排幾個用一般的 [Quick Select](/docs/algorithms/quick-sort/) 會遇到處理時間超時而無法通過測試。

這邊來看原本的解法與會遇到的問題：

<details>
  <summary>原本的 Quick Select</summary>

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
</details>

Test case:

```js
// 中間省略超多的 1
let nums = [1,2,3,4,5,1,1,,1,1,1,1,1,...,1,1,1,1,1,1,-5,-4,-3,-2,-1]
let kth = 5000
```

用上述解法去跑測試會得到 Time Limit Exceeded 的結果，而這若是用隨機取基準值的優化方式實作也還是會超時。
仔細看 Test case 能知道因為中間過多的 1 會讓 `pivotHelper` 都在花時間將 `2,3,4,5` 一個個和"每個" `1` 交換。

## 兩種 partition 方式

### Lomuto partition scheme

原本的 `pivotHelper` 是用了 [Lomuto partition scheme](https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme) 的方式實作，接下來介紹另種 partition 方式：[Hoare partition scheme](https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme)。

### Hoare partition scheme

```js
const swap = (arr, index1, index2) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
};

const partition = (nums, start, end) => {
  // 以 nums[start] 為基準值 (pivot)，從 start + 1 的位置與 end 的位置一起往內比對
  // pivot 取哪個位置都可以
  let swapStart = start + 1, swapEnd = end
  const pivotNum = nums[start]
  while(swapStart <= swapEnd) {
    // 兩邊遞迴直到需要交換時才停下
    while(nums[swapStart] < pivotNum) {
      swapStart++
    }
    while(nums[swapEnd] > pivotNum) {
      swapEnd--
    }
    if (swapStart <= swapEnd) {
      swap(nums, swapStart, swapEnd)
      swapStart++
      swapEnd--
    }
  }
  swap(nums, swapEnd, start)
  return swapEnd
}
```

相較於 [Lomuto partition scheme](https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme) 從比對範圍的最左或最右開始比對排序與交換，[Hoare partition scheme](https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme) 從左右兩邊一起開始比對排序並交換位置，在上面的 Test case 中更能有效避免無意義的一直交換 `1`。

[Wiki](https://en.wikipedia.org/wiki/Quicksort#Repeated_elements) 上也有提到 [Hoare partition scheme](https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme) 較適合處理這類陣列中重複元素過多的情況。

## 優化後的解法

```js
const swap = (nums, i, k) => {
  [nums[i], nums[k]] = [nums[k], nums[i]]
}
const partition = (nums, start, end) => {
  let swapStart = start + 1, swapEnd = end
  const pivotNum = nums[start]
  while(swapStart <= swapEnd) {
    while(nums[swapStart] < pivotNum) {
      swapStart++
    }
    while(nums[swapEnd] > pivotNum) {
      swapEnd--
    }
    if (swapStart <= swapEnd) {
      swap(nums, swapStart, swapEnd)
      swapStart++
      swapEnd--
    }
  }
  swap(nums, swapEnd, start)
  return swapEnd
}
const quickSelect = (nums, k, start, end) => {
  if (start === end) return nums[start]
  const pivotIndex = partition(nums, start, end)

  if (pivotIndex === k) {
    return nums[k]
  } else if (pivotIndex > k) {
    return quickSelect(nums, k, start, pivotIndex - 1)
  } else {
    return quickSelect(nums, k, pivotIndex + 1, end)
  }
}
var findKthLargest = function(nums, k) {
  return quickSelect(nums, nums.length - k, 0, nums.length - 1)
};
```

## 其他更多的優化方式

除了 partition 方式的選擇，還有基準值的取法。除了隨機取之外，還有取當前範圍的中間位置，這用在陣列是那種已經有部分排序好的情況是蠻不錯的方式。

## 參考資料

- https://en.wikipedia.org/wiki/Quicksort#Optimizations
