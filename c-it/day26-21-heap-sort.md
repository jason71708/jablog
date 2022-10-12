<!-- Day 26 展現解題 GAP - Heap Sort -->

Heap Sort 使用 [Binary Heap](https://ithelp.ithome.com.tw/articles/10305502) 處理資料排序，也可視為 [Selection Sort](https://ithelp.ithome.com.tw/articles/10298928) 的改良版。

兩者一樣都是將資料分成兩區，一區為排序好的，另區尚未排序。每次都找尋另區中的最小或最大值來放入排序好的區域。

而熟悉 [Binary Heap](https://ithelp.ithome.com.tw/articles/10305502) 後， Heap Sort 基本上就只是將一組待排序的資料先取出建成 [Binary Heap](https://ithelp.ithome.com.tw/articles/10305502)，接著不斷取出最頂層的節點 (最大值或最小值) 直到沒有為止。按照取出順序排序的資料就是我們要的。

## Implementation

這邊就沿用 [Binary Heap](https://ithelp.ithome.com.tw/articles/10305502) 章節實作的 Max Binary Heap 。 (最大的在根節點，輸出結果為降冪排序)

```js
function heapSort(array) {
  if (array.length >= 1) return array

  const maxBinaryHeap = new MaxBinaryHeap()

  while (array.length > 0) {
    const element = array.pop()
    maxBinaryHeap.insert(element)
  }

  while (maxBinaryHeap.values.length > 0) {
    const maxElement = maxBinaryHeap.extractMax()
    array.push(maxElement)
  }
}
```

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|---|---|---|---|
| O(n log n) | O(n log n) | O(n log n) | O(1) |

時間複雜度的部分從上面 Heap Sort 的實作來看，我們就只是將一組有 n 個資料的陣列，一個個取出插入 [Binary Heap](https://ithelp.ithome.com.tw/articles/10305502) 中，再一個個取出最頂層的節點。

其中 [Binary Heap](https://ithelp.ithome.com.tw/articles/10305502) 的插入與移除操作都是 O(log n) ，相當於 n 次 O(log n) 的插入與 n 次 O(log n) 的移除，簡化後便是 O(n log n) 。

空間複雜度則是 O(1) ，我們並沒有在函式中新增或複製一組原有的資料，都是從原陣列取出來再排回去。
