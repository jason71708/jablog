---
title: 'Hash Table'
tags:
  - data structures
keywords: [data structures, 資料結構]
---

## Introduction

Hash Table 是用來儲存鍵值對的資料 (key-value pairs)。

而 Hash Table 在找特定資料與新增刪除時的速度都非常快，類似像 JS 的 Object 。

為了練習實作 Hash Table ，我們使用陣列來儲存 Value ，還需要有個 Hash Function 來接受一個 Key 並回傳一個數字。 (對應 Array Index )。


## Hash Function

```js
function hash(key, arrayLen) {
  let total = 0
  let WEIRD_PRIME = 31
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i]
    let value = char.charCodeAt(0) - 96
    total = (total * WEIRD_PRIME + value) % arrayLen
  }
  return total
}
```

這邊主要實作簡易的 Hash Function ，還有其他百百種 Hash 的方式可以使用。

特別提到 Hash Table 有設大小上限，例如設 100 ，那麼此 Hash Function 最多就是回傳 99 (Index)。

再來有個 `WEIRD_PRIME` 的變數，此主要用來降低回傳數字的重複率，例如用：

```js
hash('cyan', 13)
hash('pink', 13)
```

執行以下函式時會得到相同的輸出 `5`。

而這背後牽涉到複雜的數學就不深入探究了 XD ，有興趣的可以[搜尋](https://www.google.com/search?q=hash+function+prime+number)。總之 Prime Number 就是用於降低輸出重複率的變數。

## Collisions

上段講到不同的 Key 可能會輸出同樣的數字出來，遇到這情況時有幾個方式可以解決，以下介紹兩種：

### Separate Chaining

原本我們 Hash Table 存值用的陣列，每個位置都是存值，改為存陣列。

不同的 Key 輸出同樣的數字時，因為該位置是陣列，所以將值塞進該位置的陣列內就行了。

原本：
```js
['value1', 'value2', 'value3']
```

變成：
```js
[['value1'], ['value2'], ['value3']]
```

有重複的 Key 輸出同樣數字時：

```js
[['value1'], ['value2', 'value4'], ['value3']]
```

### Linear Probing

和上個方法不同，每個位置依然存值，但遇到重複數字時，我們往下一個或上一個位置移動，如果那個位置是空的就把值存進去。

## Implementation

實作 HashTable Clase ， 陣列長度在一開始實例化就可以帶進去，我們的 Hash Function 只需接受 Key 就好。

我們採用上面提到 Separate Chaining 方法，所以我們 `keyMap` 中每個元素都會是陣列，真的要存的 Value 是放到此陣列中。

```js
class HashTable {
  constructor(size = 53) {
    this.keyMap = Array.from({length: size}, () => [])
  }

  _hash(key) {
    let total = 0
    let WEIRD_PRIME = 31
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i]
      let value = char.charCodeAt(0) - 96
      total = (total * WEIRD_PRIME + value) % this.keyMap.length
    }
    return total
  }
}
```

## Set

接著實作 Set 方法，此方法接受一個 Key 與 Value ，我們將 Hash 輸入的 Key 得到數字 (Index) ，接著把 Value 存進數字對應的 `keyMap` 位置內。

由於我們採用 Separate Chaining 方法，所以我們也把 Key 跟 Value 一起存進去方便做對應。

```js
set(key,value) {
  let index = this._hash(key)
  this.keyMap[index].push([key, value])
}
```

`keyMap` 使用後會長的像以下這樣：

```js
[[], [], [], [['Key 1', 'Value 2'], ['Key 3', 'Value 3']], [], [['Key 2', 'Value 2']], []]
```

## Get

接受一個 Key ，將 Hash 輸入的 Key 得到數字 (Index) ，從 `keyMap` 的對應位置拿出來。

由於我們採用 Separate Chaining 方法，所以拿出來的會是陣列，要遍歷此陣列找出 Key 在哪個位置，並回傳該 Key 對應的 Value。

```js
get(key) {
  let index = this._hash(key)
  if(this.keyMap[index]){
    for(let i = 0; i < this.keyMap[index].length; i++){
      if(this.keyMap[index][i][0] === key) {
        return this.keyMap[index][i][1]
      }
    }
  }
  return undefined
}
```
