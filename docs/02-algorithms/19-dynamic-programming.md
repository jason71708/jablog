---
title: "Dynamic Programming"
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

## Introduction

> 原文： Dynamic Programming is a technique in computer programming that helps to efficiently solve a class of problems that have overlapping subproblems and optimal substructure property.

解決一個問題時，若此問題可以分解成多個**重複性的子問題**，且這些**子問題的解答可以構成最終該問題的解答**，則我們可以用 Dynamic Programming 的技巧，透過紀錄這些重複多次的子問題的解答，可以有效減少許多執行重複計算同樣問題。

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

## Big O Complexity with Naive Fibonacci Solution

>![Fibonacci](https://i.stack.imgur.com/kgXDS.png)
From Stack Overflow

上圖顯示了當 N 越大，所需要計算的次數會以指數的方式成長。

原本的解法，其時間複雜度為 **O(2^n)** ，若要認真準確的時間複雜度會接近 **O(1.6^n)** ，有興趣可看[這篇](https://stackoverflow.com/questions/360748/computational-complexity-of-fibonacci-sequence)。

>![Time Complexity](https://i.stack.imgur.com/jIGhf.png)
From Stack Overflow

在效能上甚至比 O(n^2) 還差。
