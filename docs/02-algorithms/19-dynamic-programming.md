---
title: "Dynamic Programming"
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

解決一個問題時，若此問題可以分解成多個**重複性的子問題**，且這些**子問題的解答可以構成最終該問題的解答**，則我們可以用 Dynamic Programming 的技巧，透過紀錄這些重複多次的子問題的解答，可以有效減少許多執行重複計算同樣問題。

> 原文： Dynamic Programming is a technique in computer programming that helps to efficiently solve a class of problems that have overlapping subproblems and optimal substructure property.

計算費氏數列 (Fibonacci) 的問題就符合上述條件，故以下都以該題目舉例。

## Overlapping Subproblems

在之前的 [Fibonacci](./09-recursion.md#practice-3---fibonacci) 練習中，我們使用遞迴的技巧將當前要計算的 `fib(n)` 用 `fib(n-1) + fib(n-2)` 遞迴下去執行。

以計算 `fib(6)` 為例：

```js
//                                     fib(6)  
//                     fib(5)            +              fib(4)
//           fib(4)      +      fib(3)             fib(3) + fib(2)    
//      fib(3) + fib(2)     fib(2) + fib(1)    fib(2) + fib(1)          
// fib(2) + fib(1)        
```

可以看到 `fib(3)` 的部分我們總共計算了 3 次， `fib(4)` 兩次。

在 `n` 越來越大的時候，我們重複計算所耗費的時間也越來越多，用之前 [Fibonacci](./09-recursion.md#practice-3---fibonacci) 練習來執行以下程式碼：

```js
fibonacci(50)
```

上述執行時將會花費許多時間。

而像 `fib(3)` 、 `fib(4)` 這種需要重複計算的問題就屬於 Overlapping Subproblems 。

## Optimal Substructure

接續費氏數列 (Fibonacci) 的例子， `fib(6)` 的解答是 `fib(5) + fib(4)` 而， `fib(5)` 的解答是 `fib(4) + fib(3)` ...。

`fib(6)` 的解答是由底下多個子問題的解答所構成。

此問題分解成多個子問題，子問題的解答可以構成最終該問題的解答的話，那麼該問題具有 Optimal Substructure 。

## Time Complexity with Naive Fibonacci Solution

>![Fibonacci](https://i.stack.imgur.com/kgXDS.png)
From Stack Overflow

上圖顯示了當 N 越大，所需要計算的次數會以指數的方式成長。

原本的解法，其時間複雜度為 **O(2^n)** ，若要認真準確的時間複雜度會接近 **O(1.6^n)** ，有興趣可看[這篇](https://stackoverflow.com/questions/360748/computational-complexity-of-fibonacci-sequence)。

>![Time Complexity](https://i.stack.imgur.com/jIGhf.png)
From Stack Overflow

在效能上甚至比 O(n^2) 還差。

## Memoization

鋪了這麼久相信大家能推敲出解法，沒錯，就是紀錄。

<details>
  <summary>Solution</summary>

  ```js
  function fib_memo(n, memo = []) {
    if (n <= 2) return 1
    if (memo[n] !== undefined) return memo[n]
    const result = fib(n - 1, memo) + fib(n - 2, memo)
    memo[n] = res
    return res
  }

  // or

  function fib_memo(n, memo = [0, 1, 1]) {
    if (memo[n]) return memo[n]
    const result = fib(n - 1, memo) + fib(n - 2, memo)
    memo[n] = res
    return res
  }
  ```

</details>

這邊用了陣列去紀錄各個 `fib(n)` 所產生的結果，若已經有的就直接拿，不用再執行計算。

## Time Complexity with Memoized Fibonacci Solution

根據我們優化過後的解法，當要計算 `fib(7)` 時，我們只要計算一次，`fib(6)` 、 `fib(5)` 、 `fib(4)` 、 `fib(3)` 、 `fib(2)` 、 `fib(1)` 即可，時間複雜度為 **O(n)** 。

```js
fib_memo(100)
```

我們這次用優化後的解法再執行一次上述程式碼，很快就能得到結果。

## A Bottom Up Approach

在之前的解法中，我們都是從 N 一直往下計算： `fib(n - 1) + fib(n - 2)` ，這屬於 Top-Down 的技巧。

而現在要介紹使用 Bottom-Up 技巧的解法，通常都會使用遍歷的方式，並且使用表格 (Tablulation) 紀錄之前計算過的值(以下用陣列)，而且會有較好的空間複雜度。

```js
function fib_table(n) {
  if (n <= 2) return 1
  const fibNums = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2]
  }
  return fibNums[n]
}
```

我們從 Index 3 開始往上計算，直至計算到我們要的 N 位置，也用了迴圈取代遞迴執行的方式。

在之前使用 Top-Down 的解法中，遞迴執行會有可能碰到 Stack Overflow 的問題：

```js
fib_memo(10000)
```

嘗試大一點的數字就會碰到 Maximum call stack size exceeded 的錯誤。

而 Bottom-Up 的解法改用迴圈遍歷從 3 到 N ，避免了 Stack Overflow 的問題，也因為不用一直遞迴執行函式而讓 Call Stack 越積越多，其空間複雜度也有效的減少了。
