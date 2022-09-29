<!-- Day 13 只會往前絕不後退 - Singly Linked List -->

Linked List 是一種資料結構，由一個個節點 (Node) 鏈結起來組成，本身僅存有 Head Node 和 Tail Node 以及總節點數 (length)。每個節點都有一個資料和一個指向下一個節點的指標。

例如有一個 Linked List 為：

15 -> 133 -> 5 -> -1 -> 0 -> 439

共有六個節點， Head Node 的值為 `15` 並指向下一個節點 `133`， Tail Node 為 `439` 並指向 `null`。

Linked List 的新增 (Insertion)、刪除 (Deletion) 的效能比陣列好，因為只需要改變指向下一個節點 (指標) 就好。而陣列如果新增元素在非最後面的位置，則 Index 對應的元素都要改變。

但 Linked List 存取 (Access) 元素的效能比陣列差，因為每個節點只知道下個節點是誰，所以只能從頭開始找到指定的節點。而陣列可以用 Index 找到指定的元素。

建議可以觀看此[網站](https://visualgo.net/en/list)操作看看 Linked List 的新刪修查。

## Implementation

首先定義一個 Node 的 Class。

```js
class Node {
  constructor(val) {
    this.value = val;
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

## Get

建立一個 Get 方法，可以取得 Linked List 的第 n 個節點。

若 n 大於 Linked List 的長度或小於零，回傳 `null` 。

```js
get(index) {
  if (index < 0 || index >= this.length) return null;
  let current = this.head;
  let count = 0;
  while (count !== index) {
    current = current.next;
    count++;
  }
  return current;
}
```

## Set

建立一個 Set 方法，可以將 Linked List 的第 n 個節點設定為新的值。

若成功將第 n 個節點設定為新的值，回傳 `true` ，否則回傳 `false` 。

```js
set(index, val) {
  const foundNode = this.get(index);
  if (foundNode) {
    foundNode.value = val;
    return true;
  }
  return false;
}
```

## Insert

新增一個節點到 Linked List 的第 n 個位置。

一樣若成功新增則回傳 `true` ，否則回傳 `false` 。

```js
insert(index, value) {
  if (index < 0 || index > this.length) return false;
  if (index === this.length) return !!this.push(value);
  if (index === 0) return !!this.unshift(value);
  const newNode = new Node(value);
  const prev = this.get(index - 1);
  const temp = prev.next;
  prev.next = newNode;
  newNode.next = temp;
  this.length++;
  return true;
}
```

## Remove

刪除指定位置的節點。

回傳規則和 Insert 一樣。

```js
remove(index) {
  if (index < 0 || index >= this.length) return false;
  if (index === this.length - 1) return !!this.pop();
  if (index === 0) return !!this.shift();
  const prev = this.get(index - 1);
  const removed = prev.next;
  prev.next = removed.next;
  this.length--;
  return true;
}
```

## Reverse

將 Linked List 原地(In Place)反轉順序。

最後回傳自己。

```js
reverse() {
  if (this.length <= 1) return this;
  let current = this.head;
  this.head = this.tail;
  this.tail = current;
  let next = null;
  let prev = null;
  for (let i = 0; i < this.length; i++) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return this;
}
```

## Big O Complexity

| Insertion | Removal | Search | Access |
|---|---|---|---|
| O(1) | O(1) | O(n) | O(n) |

## Singly Linked List in TypeScript

以下稍微整理成 TypeScript 的版本。

```ts
class SinglyLinkedNode {
  value: any;
  next: SinglyLinkedNode | null;
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  head: SinglyLinkedNode | null;
  tail: SinglyLinkedNode | null;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: any) {
    const node = new SinglyLinkedNode(val);
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

  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let pre = current;
    while (current.next) {
      pre = current;
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

  unshift(val: any) {
    const node = new SinglyLinkedNode(val);
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

  get(index: number) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    let count = 0;
    while (count !== index) {
      current = current.next;
      count++;
    }
    return current;
  }

  set(index: number, val: any) {
    const foundNode = this.get(index);
    if (foundNode) {
      foundNode.value = val;
      return true;
    }
    return false;
  }

  insert(index: number, val: any) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);
    const newNode = new SinglyLinkedNode(val);
    const prev = this.get(index - 1);
    const temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;
    this.length++;
    return true;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) return false;
    if (index === this.length - 1) return !!this.pop();
    if (index === 0) return !!this.shift();
    const prev = this.get(index - 1);
    const removed = prev.next;
    prev.next = removed.next;
    this.length--;
    return true;
  }

  reverse() {
    if (this.length <= 1) return this;
    let current = this.head;
    this.head = this.tail;
    this.tail = current;
    let next: SinglyLinkedNode | null = null;
    let prev: SinglyLinkedNode | null = null;
    for (let i = 0; i < this.length; i++) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    return this;
  }
}
```