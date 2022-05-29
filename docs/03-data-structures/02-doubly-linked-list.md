---
title: 'Doubly Linked List'
tags:
  - data structures
keywords: [data structures, 資料結構]
---

## Introduction

Singly Linked List 與 Doubly Linked List 差別在 Node 的指標一個只有下一個節點，另個有存上下兩個節點。

Doubly Linked List 中的節點有雙向指標 (prev、next)。

Singly Linked List: 15 -> 133 -> 5 -> -1 -> 0 -> 439 (單向)

Doubly Linked List: 15 <-> 133 <-> 5 <-> -1 <-> 0 <-> 439 (雙向)

## Implementation

接著就照上面定義來實作。

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor(val) {
    this.head = null
    this.tail = null
    this.length = 0
  }
}
```

也因為每個 Node 都有上下兩個指標，所以相關操作方法也都要做調整。

## Push

```js
push(val) {
  const node = new Node(val)
  if (this.length === 0) {
    this.head = node
    this.tail = node
  } else {
    this.tail.next = node
    node.prev = this.tail
    this.tail = node
  }
  this.length++
  return this
}
```

## Pop

在移除 Node 時，也要把跟此 Node 的兩個指標都改成 null 避免此 Node 還能與其他 Node 有關聯。

```js
pop() {
  if (this.length === 0) return undefined
  const popedNode = this.tail
  if (this.length === 1) {
    this.head = null
    this.tail = null
  } else {
    this.tail = popedNode.prev
    this.tail.next = null
    popedNode.prev = null
  }
  this.length--
  return popedNode
}
```

## Shift

實作上和 Pop 幾乎一樣，差別在於方向而已。

```js
shift() {
  if (this.length === 0) return undefined
  const shiftedNode = this.head
  if (this.length === 1) {
    this.head = null
    this.tail = null
  } else {
    this.head = shiftedNode.next
    this.head.prev = null
    shiftedNode.next = null
  }
  this.length--
  return shiftedNode
}
```

## Unshift

```js
unshift(val) {
  const node = new Node(val)
  if (this.length === 0) {
    this.head = node
    this.tail = node
  } else {
    this.head.prev = node
    node.next = this.head
    this.head = node
  }
  this.length++
  return this
}
```

## Get

由於 Doubly Linked List 中的節點都是雙向綁定，故在需要遍歷整個 List 時，可以根據給定的 Index 來決定是要從頭遍歷還是從最後面開始遍歷。

```js
get(index) {
  if (index < 0 || index >= this.length) return null
  let currentNode = null
  if (index <= this.length / 2) {
    currentNode = this.head
    while (index > 0) {
      currentNode = currentNode.next
      index--
    }
  } else {
    currentNode = this.tail
    while (this.length - index > 1) {
      currentNode = currentNode.prev
      index--
    }
  }
  return currentNode
}
```

## Set

```js
set(index, val) {
  const targetNode = this.get(index)
  if (targetNode) {
    targetNode.value = val
    return true
  }
  return false
}
```

## Insert

```js
insert(index, val) {
  if (index < 0 || index > this.length) return false
  if (index === 0) return !!this.unshift(val)
  if (index === this.length) return !!this.push(val)
  const newNode = new Node(val)
  const nextNode = this.get(index)
  nextNode.prev.next = newNode
  newNode.prev = nextNode.prev
  nextNode.prev = newNode
  newNode.next = nextNode
  this.length++
  return true
}
```

## Remove

```js
remove(index) {
  if (index < 0 || index >= this.length) return undefined
  if (index === 0) return !!this.shift()
  if (index === this.length - 1) return !!this.pop()
  const targetNode = this.get(index)
  targetNode.prev.next = targetNode.next
  targetNode.next.prev = targetNode.prev
  targetNode.prev = null
  targetNode.next = null
  this.length++
  return true;
}
```

## Big O Complexity

| Insertion | Removal | Search | Access |
|---|---|---|---|
| O(1) | O(1) | O(n) | O(n) |

實際上 Search 與 Access 是 O(n / 2)，效能上比 Singly Linked List 好。

但也因為 Doubly Linked List 的每個 Node 多存了一個 Prev 指標，因此會需要用多一點的記憶體。

## Doubly Linked List in TypeScript

```ts
class DoublyLinkedNode {
  value: any;
  prev: DoublyLinkedNode | null;
  next: DoublyLinkedNode | null;
  constructor(val: any) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  head: DoublyLinkedNode | null;
  tail: DoublyLinkedNode | null;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: any) {
    const node = new DoublyLinkedNode(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) return undefined;
    const popedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = popedNode.prev;
      this.tail.next = null;
      popedNode.prev = null;
    }
    this.length--;
    return popedNode;
  }

  shift() {
    if (this.length === 0) return undefined;
    const shiftedNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = shiftedNode.next;
      this.head.prev = null;
      shiftedNode.next = null;
    }
    this.length--;
    return shiftedNode;
  }

  unshift(val: any) {
    const node = new DoublyLinkedNode(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return null;
    let currentNode: DoublyLinkedNode | null = null;
    if (index <= this.length / 2) {
      currentNode = this.head;
      while (index > 0) {
        currentNode = currentNode.next;
        index--;
      }
    } else {
      currentNode = this.tail;
      while (this.length - index > 1) {
        currentNode = currentNode.prev;
        index--;
      }
    }
    return currentNode;
  }

  set(index: number, val: any) {
    const targetNode = this.get(index);
    if (targetNode) {
      targetNode.value = val;
      return true;
    }
    return false;
  }

  insert(index: number, val: any) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const newNode = new DoublyLinkedNode(val);
    const nextNode = this.get(index);
    nextNode.prev.next = newNode;
    newNode.prev = nextNode.prev;
    nextNode.prev = newNode;
    newNode.next = nextNode;
    this.length++;
    return true;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return !!this.shift();
    if (index === this.length - 1) return !!this.pop();
    const targetNode = this.get(index);
    targetNode.prev.next = targetNode.next;
    targetNode.next.prev = targetNode.prev;
    targetNode.prev = null;
    targetNode.next = null;
    this.length++;
    return true;
  }
}
```