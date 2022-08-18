---
title: 'Quick Sort'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

> Quick Sort 有使用到 [Recursion](./09-recursion.md) 的技巧。

第一步是從陣列中取出一個數字當作基準值 (pivot)，我們選該陣列的第一個元素。

將這個基準值和陣列中剩餘的數字做比對，比基準值大的排在後面，比基準值小的排在前面。

結束後，這個基準值將會在此陣列中的正確位置。(左邊的一定比他大，右邊的一定比他小)

接著，將左半部分陣列和右半部分陣列也照著第一步執行下去。

建議可以觀看此[網站](https://visualgo.net/en/sorting)的動畫演示較好理解。

以 `[30, 5, 1, 31, 10, 9, 2, 3, 4, 8, 7, 6]` 來說：

幾個變數須先定義，`startIndex` (基準值在陣列中的 index)，`pivotIndex` (經過一輪比對過後最終基準值要在的位置，初始值和 startIndex 一樣)，`endIndex` (比對到哪裡，一開始先設陣列的長度減一)

1. 基準值取陣列第一個 `30`，與其他數字一一比對 (`startIndex = 0, pivotIndex = 0`)
2. 當前與 `index = 1` 的元素比對：`5` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 1`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。(但位置一樣，所以目前陣列順序沒動)
3. 當前與 `index = 2` 的元素比對：`1` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 2`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。(但位置一樣，所以目前陣列順序沒動)
4. 當前與 `index = 3` 的元素比對：`31` 比較大，故維持原位置
5.  1. 當前與 `index = 4` 的元素比對：`10` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 3`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。
    2. 目前陣列：`[30, 5, 1, 10, 31, 9, 2, 3, 4, 8, 7, 6]`
6. 1. 當前與 `index = 5` 的元素比對：`9` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 4`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。
    2. 目前陣列：`[30, 5, 1, 10, 9, 31, 2, 3, 4, 8, 7, 6]`
7. 1. 當前與 `index = 6` 的元素比對：`2` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 5`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。
    2. 目前陣列：`[30, 5, 1, 10, 9, 2, 31, 3, 4, 8, 7, 6]`
8. 1. 當前與 `index = 7` 的元素比對：`3` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 6`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。
    2. 目前陣列：`[30, 5, 1, 10, 9, 2, 3, 31, 4, 8, 7, 6]`
9. 1. 當前與 `index = 8` 的元素比對：`4` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 7`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。
    2. 目前陣列：`[30, 5, 1, 10, 9, 2, 3, 4, 31, 7, 6, 6]`
10. 1. 當前與 `index = 9` 的元素比對：`8` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 8`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。
    2. 目前陣列：`[30, 5, 1, 10, 9, 2, 3, 4, 8, 31, 7, 6]`
11. 1. 當前與 `index = 10` 的元素比對：`7` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 9`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。
    2. 目前陣列：`[30, 5, 1, 10, 9, 2, 3, 4, 8, 7, 31, 6]`
12. 1. 當前與 `index = 11` 的元素比對：`6` 比較小，`pivotIndex` 需加 1 (`pivotIndex = 10`)，並與 `pivotIndex` 所在的元素進行交換位置 (Swap)。
    2. 目前陣列：`[30, 5, 1, 10, 9, 2, 3, 4, 8, 7, 6, 31]`
13. 1. 由於上一步已經比對到 `index = 11` (endIndex)，也就是陣列的全部了，故最後將基準值所在的 `startIndex` 和最後 `pivotIndex` 的值交換位置 (Swap)。
    2. 目前陣列：`[6, 5, 1, 10, 9, 2, 3, 4, 8, 7, 30, 31]`
14. 第一輪結束，由最後結果可以發現我們的基準值 `30` 左邊都是比他小的數字，右邊都是比他大的數字，基準值被**排在了此陣列中的正確位置**。
15. 接下來將此基準值的左邊與右邊進行排序，遞迴下去，直到 `startIndex` 大於等於 `endIndex`。
16. 1. 左半邊的變數：`startIndex = 0`，`endIndex = 9`
    2. 右半邊的變數：`startIndex = 11`，`endIndex = 11`
17. 遞迴執行~

## Practice 1 - Pivot Helper

首先來實作一個函式，接收一個陣列、一個 `startIndex` 與一個 `endIndex`，照上述範例說明排序好一輪後，回傳最終 `pivotIndex` 的值。

注意：陣列需使用原本的。

<details>
  <summary>Solution</summary>

  ```js
  function pivotHelper(array, startIndex, endIndex) {
    const swap = (arr, index1, index2) => {
      [arr[index1], arr[index2]] = [arr[index2], arr[index1]]; // ES5 寫法
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

</details>

## Practice 2 - Quick Sort

延用上面的 Pivot Helper 來實作 Quick Sort。

<details>
  <summary>Solution</summary>

  ```js
  function quickSort(array, startIndex = 0, endIndex = array.length - 1) {
    if (startIndex >= endIndex) return;

    const pivotIndex = pivotHelper(array, startIndex, endIndex);
    quickSort(array, startIndex, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, endIndex);
  }
  ```

  個人一開始的寫法：

  ```js
  function pivotHelper(array, startIndex = 0, endIndex = array.length - 1) {
    if (startIndex >= endIndex) return;

    function swap(array, i, j) {
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    const pivot = array[startIndex];
    let swapIndex = startIndex;

    for (let i = startIndex + 1; i <= endIndex; i++) {
      if (array[i] < pivot) {
        swapIndex++;
        swap(array, swapIndex, i);
      }
    }

    swap(array, startIndex, swapIndex);

    pivotHelper(array, startIndex, swapIndex - 1);
    pivotHelper(array, swapIndex + 1, endIndex);
  }

  function quickSort(array) {
    pivotHelper(array, 0, array.length - 1);
  }
  ```

</details>

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|---|---|---|---|
| O(n log n) | O(n log n) | O(n²) | O(log n) |

首先最好與平均的情況是當基準值排序好後，在將近中間的位置，接著將基準值左右兩邊再進行一次排序。

此情況會接近像 [Merge Sort](./15-merge-sort.md) 那樣的 O(n log n)，陣列剖半再剖半，然後在每輪中各個元素比對一次。

而最差的情況下每輪排序完後，基準值的左邊或右邊其中一邊只有 1 或 0 個元素，根本沒有剖半到。

就像上面範例說明的： `[30, 5, 1, 31, 10, 9, 2, 3, 4, 8, 7, 6]`

第一輪跑完後 `[6, 5, 1, 10, 9, 2, 3, 4, 8, 7, 30, 31]`

基準值 `30` 的右邊只有一個元素。

所以最差情況一直發生的時間複雜度是 O(n²)。


關於 Space Complexity 為何是 O(log n) 的說明：

For quicksort, your intuition about recursion requiring O(log(n)) space is correct. Since quicksort calls itself on the order of log(n) times (in the average case, worst case number of calls is O(n)), at each recursive call a new stack frame of constant size must be allocated. Hence the O(log(n)) space complexity.