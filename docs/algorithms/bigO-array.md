---
title: 'Big O of Array'
tags:
  - algorithms
sidebar_position: 4
keywords: [algorithms, 演算法]
---

## 操作物件的時間複雜度
- Insertion - **O(1)**
- Removal - **O(1)**
- Searching - **O(n)**
- Access - **O(1)**

存取陣列內特定值是用 Index 直接存取，跟物件使用 Key 是一樣的。

新增或刪除依照位置決定:
```js
const array = ['Jason', 'John', 'Mike']
array.push('Tom')
console.log(array) // ['Jason', 'John', 'Mike', 'Tom']
array.shift('Jason') // ['John', 'Mike', 'Tom']
```
由上面範例可以看出，新增或刪除在最後一個位置時，其他陣列內元素不會被影響，所以時間複雜度是 **O(1)**。

但若在最後一個位置以外，則會影響其他陣列內元素的排列，所以時間複雜度是 **O(n)**。

## 陣列方法的時間複雜度
- push - **O(1)**
- pop - **O(1)**
- shift - **O(n)**
- unshift - **O(n)**
- sort - **O(n log n)**
- concat - **O(n)**
- splice - **O(n)**
- slice - **O(n)**
- map - **O(n)**
- filter - **O(n)**
- forEach - **O(n)**
- reduce - **O(n)**
- some - **O(n)**
- every - **O(n)**
- find - **O(n)**
- findIndex - **O(n)**
- reverse - **O(n)**
- join - **O(n)**

影響陣列內元素的排列，或是遍歷陣列內元素相關的都是 **O(n)**。

`push`, `pop` 就如上段提到的是操作最後一個位置，沒有影響其他元素排列，所以時間複雜度是 **O(1)**。

`sort` 部分在之後的排序章節會有詳細說明。

## 陣列的特色
- 有順序
- 存取一樣很快，但新增或刪除依情況而定。
