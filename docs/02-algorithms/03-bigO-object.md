---
title: 'Big O of Object'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

這篇介紹物件本身操作的時間複雜度

## 操作物件的時間複雜度
- Insertion - **O(1)**
- Removal - **O(1)**
- Searching - **O(n)**
- Access - **O(1)**

這邊的搜尋是指找物件內特定值:
```js
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
}
```
搜尋 `30` 這個值就需要遍歷這個物件，所以時間複雜度是 **O(n)**。

至於其他操作都是透過 Key 來執行，所以時間複雜度是 **O(1)**。

## 物件方法的時間複雜度
- Object.keys - **O(n)**
- Object.values - **O(n)**
- Object.entries - **O(n)**
- Object.hasOwnProperty - **O(1)**
- Object.assign - **O(n)**

`Object.keys`, `Object.values` 和 `Object.entries` 都是遍歷物件的方法，所以時間複雜度是 **O(n)**。

`Object.hasOwnProperty` 是檢查物件內是否有特定的 Key，所以時間複雜度是 **O(1)**。

`Object.assign` 在合併物件時也會需要遍歷物件，時間複雜度是 **O(n)**。

## 物件的特色
- 不需要順序
- 新增、刪除、存取等等操作都非常快。
