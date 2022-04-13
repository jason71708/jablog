---
title: 'Time Complexity & Space Complexity'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

在[上篇](./01-bigO-notation.md)我們講到的複雜度表示都是指時間複雜度，在輸入的參數越多越大的情況下，所要執行的步驟(執行所需花費的時間)的增長趨勢。

我們也可以使用 Big O notation 来表示空間複雜度。

空間複雜度指的是在輸入的參數越多越大的情況下，執行該演算法所需要記憶體空間的增長趨勢。

空間複雜度考慮的是執行演算法時所需要的記憶體，不考慮參數本身的大小。

## Space Complexity in JS

- 原始型別的資料: 如數字、布林值、`null`、`undefined` 等等，空間複雜度是 **O(1)** (constant space)。
- 字串: 空間複雜度是 **O(n)** (linear space)。字串越長，所需的空間越多。
- 物件與陣列: 空間複雜度是 **O(n)**。 物件的鍵值越多 (key)，陣列的長度越長，所需的空間越多。

## Examples

```js
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
```
我們來看上面的函式，宣告 `total` 變數存數字，在迴圈中反覆加總，最後回傳 `total`。

就算 `arr` 參數本身長度無限大，影響的只有時間複雜度。函式裡面只有用到 `total` 與 `i` 這兩個數字變數，，所以空間複雜度是 **O(1)**。

```js
function double(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i] * 2);
  }
  return newArr;
}
```

把輸入的陣列內元素全部乘以 2，最後回傳一個新的陣列。

在這個函式，輸入的陣列越長，`newArr` 也會越長，所需的空間當然也越多，所以空間複雜度是 **O(n)**。

## Recap

1. 我們使用 Big O notation 來表示一個演算法的效能。
2. Big O notation 能用來表示時間或空間複雜度。
3. Big O notation 只看複雜度的增長趨勢 (linear, quadratic, constant)，而不是精確的計算。
4. 時間或空間複雜度不考慮執行演算法的硬體如何，只考慮演算法本身。
