<!-- Day 15 先進後出 - Stack -->

Stack 是一種 **LIFO** (Last In First Out) 資料結構

最後一個加入的元素，會被第一個移除。

可應用在回復上一步的功能，在操作繪圖軟體時，每個動作都會被加到 Stack 中，若最後一個動作做錯了，我們需要回到上一步，則 Stack 會先移除最後一個元素。

而瀏覽器儲存上一頁下一頁的功能，也是類似 Stack 的原理。

而精準一點來說， Stack 是一種**抽象**的資料結構，它只定義了元素被新增與移除的順序邏輯，因此可以套用在各個資料結構上，例如陣列、 Linked List 等等。

## Implementation

只要有符合 **LIFO** (Last In First Out) 的規則，都可以算是 Stack 結構。

像是 JavaScript 中， 陣列本身的 Pop 與 Push 組合或是 Shift 與 Unshift 組合。

但是陣列中的 Shift 與 Unshift 方法會讓所有元素都更新 Index，顯然使用 Pop 與 Push 方法在效能上會是比較好的選擇

而在前面 Linked List 實作中， Pop 與 Push 組合或是 Shift 與 Unshift 組合也符合 Stack 結構。

而在之前 Singly Linked List 實作中， Pop 方法需要遍歷陣列至最後一個，顯然在效能上會是使用 Shift 與 Unshift 方法會比較好。

Doubly Linked List 則沒差，因為有雙向指標，要從前或從後都可以。

以下實作簡單的 Stack 結構：

```js
class Node {
  constructor() {
    this.value = value;
    this.next = null;
  }
}
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  push(val) {
    const node = new Node(val)
    if (!this.first) {
      this.first = node
      this.last = node
    } else {
      const temp = this.first
      this.first = node
      this.first.next = temp
    }
    return ++this.size
  }
  pop() {
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

想像 Stack 是桌上疊超多本書，我們要拿只能從最上方開始拿。

這邊定義 Push 與 Pop 方法，且是針對第一個位置操作，時間複雜度為 O(1)。

方法回傳什麼都可以，只要符合用途就行，唯一要注意的是減少時間複雜度至 Constant Time。

## Big O Complexity

| Insertion | Removal | Search | Access |
|---|---|---|---|
| O(1) | O(1) | O(n) | O(n) |
