---
title: 'Priority Queue'
tags:
  - data structures
keywords: [data structures, 資料結構]
---

Priority Queue 的每個節點都含有優先度 (Priority)，而套用至 Queue 的規則中則是優先度高的會先被移除。

舉日常開發的任務優先度來說，一般功能開發佔 3 ，嚴重 Bug 佔 5 ， 版面樣式微調佔 1 ：
- 原本待處理的任務中有兩個一般功能開發 - `[3, 3]`
- 發現某些頁面需要微調樣式 - `[3, 3, 1]`
- 又發現有嚴重 Bug - `[3, 3, 1, 5]`
- 要執行任務時就會挑優先度最高的出來執行，所以待處理任務剩下 - `[3, 3, 1]`

以這類情況來說用單純的陣列也可以處理，不過每次都要遍歷整個陣列來找出優先度最高的值，時間複雜度會是 O(n) 。

所以我們可以用上篇提到的 [Binary Heap](./07-binary-heap.md) 處理，每次加入任務時，優先度最高的總是會在根節點的位置，這時我們只要使用 ExtractMax 方法就可以將優先度最高的拿出來，不用像遍歷整個 Binary Heap。

## Implementation

由於 Max Binary Heap 在[上篇](./07-binary-heap.md)已經練習過了，所以這邊來練習 Min Binary Heap 。

這邊 Priority 越小代表優先度越高。

首先來定義基本的 Node 與 Priority Queue Class 。

```js
class Node {
  constructor(val, priority) {
    this.val = val
    this.priority = priority
  }
}

class Priority Queue {
  constructor() {
    this.values = []
  }
}
```

## Enqueue

Enqueue 就是加新節點到 Queue 的方法名稱，相當於在[上篇](./07-binary-heap.md)實作的 Insert 方法，不同的是這次要改成 Priority 小的會是在上面。

```js
enqueue(val, priority) {
  const newNode = new Node(val, priority)
  this.values.push(newNode)
  this.bubbleUp()
  return this.values
}
bubbleUp() {
  let currentIndex = this.values.length - 1
  const newNode = this.values[currentIndex]

  while (currentIndex > 0) {
    let parentIndex = Math.floor((currentIndex - 1) / 2)
    let parentNode = this.values[parentIndex]
    if (newNode.priority >= parentNode.priority) break
    this.values[parentIndex] = newNode
    this.values[currentIndex] = parentNode
    currentIndex = parentIndex
  }
}
```

## Dequeue

Dequeue 就是移除節點，以這次實作的 Priority Queue 規格來說就是移除優先度最高的節點， Binary Heap 的資料結構已經幫我們把優先度最高的放到根節點了，所以移除根節點就行，相當於在[上篇](./07-binary-heap.md)實作的 ExtractMax 方法。 (在 Max Binary Heap 是叫 ExtractMax ，在 Min Binary Heap 是叫 ExtractMin )

一樣，因為這次是用 Min Binary Heap 所以 Priority 小的會是在上面。

```js
dequeue() {
  const maxNode = this.values[0]
  const lastNode = this.values.pop()
  if (this.values.length > 0) {
    this.values[0] = lastNode
    this.sinkDown()
  }
  return maxNode
}
sinkDown() {
  let currentIndex = 0
  const node = this.values[currentIndex]
  let leftIndex = 2 * currentIndex + 1
  let rightIndex = 2 * currentIndex + 2

  while (leftIndex < this.values.length || rightIndex < this.values.length) {
    let leftNode = this.values[leftIndex]
    let rightNode = this.values[rightIndex]

    let swapLeft = false
    let swapRight = false
    if (leftNode && node.priority > leftNode.priority) swapLeft = true
    if (rightNode && node.priority > rightNode.priority) swapRight = true
    if (swapLeft && swapRight) {
      if (leftNode.priority < rightNode.priority) {
        swapRight = false
      } else {
        swapLeft = false
      }
    }

    if (swapLeft) {
      this.values[leftIndex] = node
      this.values[currentIndex] = leftNode
      currentIndex = leftIndex
    } else if (swapRight) {
      this.values[rightIndex] = node
      this.values[currentIndex] = rightNode
      currentIndex = rightIndex
    } else {
      break
    }

    leftIndex = 2 * currentIndex + 1
    rightIndex = 2 * currentIndex + 2
  }
}
```
