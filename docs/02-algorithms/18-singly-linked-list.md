---
title: 'Singly Linked List'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

Linked List 是一種資料結構，由一個個節點 (Node) 鏈結起來組成，本身僅存有 Head Node 和 Tail Node 以及總節點數 (length)。每個節點都有一個資料和一個指向下一個節點的指標。

例如有一個 Linked List 為：

15 -> 133 -> 5 -> -1 -> 0 -> 439

共有六個節點， Head Node 的值為 `15` 並指向下一個節點 `133`， Head Node 為 `439` 並指向 `null`。

Linked List 的新增 (Insertion)、刪除 (Deletion) 的效能比陣列好，因為只需要改變指向下一個節點 (指標) 就好。而陣列如果新增元素在非最後面的位置，則 Index 對應的元素都要改變。

但 Linked List 存取 (Access) 元素的效能比陣列差，因為每個節點只知道下個節點是誰，所以只能從頭開始找到指定的節點。而陣列可以用 Index 找到指定的元素。

建議可以觀看此[網站](https://visualgo.net/en/list)操作看看 Linked List 的新刪修查。

## Implementation

首先定義一個 Node 的 Class。

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
```

再來定義一個 Linked List 的 Class。

```js
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
```

就像陣列一樣有 `push` 、 `pop` 、 `shift` 一樣，我們也為 Linked List 定義幾個操作資料的方法。

## Push

在 Linked List 的最後面加入一個新的節點。

加入第一個節點的時候，要把 Head Node 與 Tail Node 都指向新的節點。

同時，Linked List 的 `length` 加一。

最後可以回傳 Linked List 本身。

```js
push(val) {
  const node = new Node(val);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  this.length++;
  return this;
}
```

## Pop

移除 Linked List 的最後一個節點。

我們需要將倒數第二個節點的 `next` 指向 `null` ，並且把 tail 指向倒數第二個節點。

但 Linked List 要存取除了頭尾的節點需要從頭開始找，所以我們定義兩個變數，一個是 `current` 用來記錄目前所在的節點，一個是 previous 用來記錄上一個節點。

`current.next` 為 `null` 時代表找到最後一個節點。

最後回傳被移除的節點。

還有兩個情況需要考慮：

1. Linked List 為空時回傳 `undefined` 。
2. Linked List 只剩一個元素時， `pop` 後將 Head Node 與 Tail Node 都指向 `null` 。

```js
pop() {
  if (!this.head) return undefined;
  let current = this.head;
  let pre = current;
  while (current.next) {
    pre = current
    current = current.next;
  }
  this.tail = pre;
  this.tail.next = null;
  this.length--;
  if (this.length === 0) {
    this.head = null;
    this.tail = null;
  }
  return current;
}
```

## Shift

移除 Linked List 的第一個節點。

Linked List 為空時回傳 `undefined` 。

Linked List 只剩一個元素時， `shift` 後將 Tail Node 也指向 `null` 。

最後回傳被移除的節點。

```js
shift() {
  if (!this.head) return undefined;
  let current = this.head;
  this.head = current.next;
  this.length--;
  if (this.length === 0) {
    this.tail = null;
  }
  return current;
}
```

## Unshift

新增一個節點到 Linked List 的第一個位置。

實作規格與 Push 方法相似。

```js
unshift(val) {
  const node = new Node(val);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    node.next = this.head;
    this.head = node;
  }
  this.length++;
  return this;
}
```