---
title: 'Queue'
tags:
  - data structures
keywords: [data structures, 資料結構]
---

## Introduction

和上篇的 [Stack](./03-stack.md) 類似。

Queue 是一種 **FIFO** (First In First Out) 資料結構。

第一個加入的元素，會被第一個移除。

可應用在排隊等待處理的功能，像是對戰遊戲配對時，等越久的應該要先被排到。

## Implementation

只要有符合 **FIFO** (First In First Out) 的規則，都可以算是 Queue 結構。

像是 JavaScript 中， Array 本身的 Shift 與 Push 組合或是 Pop 與 Unshift 組合。

而一樣的，陣列中的 Shift 與 Unshift 方法會讓所有元素都更新 Index ，所以使用陣列來實作 Queue 在效能上可能要考慮一下。

而在之前的 [Linked List](./01-singly-linked-list.md) 實作中， Shift 與 Push 組合或是 Pop 與 Unshift 組合也符合 Queue 結構。

但 Pop 方法需要遍歷整個 Linked List ，顯然 Shift 與 Push 的效能會比較好。

同理，Doubly Linked List 則沒差，因為有雙向指標，要從頭新增或移除或從後新增或移除效能上都一樣。

以下實作簡單的 Queue 結構：

```js
class Node {
  constructor() {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(val) {
    const node = new Node(val)
    if (!this.first) {
      this.first = node
      this.last = node
    } else {
      this.last.next = node
      this.last = node
    }
    return ++this.size
  }
  dequeue() {
    if (!this.first) return null
    const temp = this.first
    if (this.first === this.last) {
      this.last = null
    }
    this.first = this.first.next
    this.size--
    return temp.value
  }
}
```

## Big O Complexity

| Insertion | Removal | Search | Access |
|---|---|---|---|
| O(1) | O(1) | O(n) | O(n) |
