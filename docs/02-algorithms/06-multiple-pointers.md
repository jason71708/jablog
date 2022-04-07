---
title: 'Multiple Pointers'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

## Introduction

建立 pointer 變數代表目前指到哪個位置 (index)。

使用兩個 pointer 代表目前查找的位置與範圍，不用再額外宣告物件或陣列來儲存或遞迴查找。

此技巧能有效減少時間與空間複雜度。

## Practice 1 - sumZero

給定一個**排序過**的數字陣列，找出第一組其中兩個相加為零的數字，若沒有則回傳 `undefined`。

1. 數字會是正負整數。

例如：`[-3, -2, -1, 1, 3, 4]`，答案是 `[-3, 3]`。

例如：`[-2, 0, 10]` ，答案是 `undefined`。

較差的解法：

```js
function sumZero(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] + arr[j] === 0){
                return [arr[i], arr[j]];
            }
        }
    }
}
```

時間複雜度是 O(n^2)。

使用 Multiple Pointers 技巧：

```js
function sumZero(arr){
    let left = 0;
    let right = arr.length - 1;
    while(left < right){
        let sum = arr[left] + arr[right];
        if(sum === 0){
            return [arr[left], arr[right]];
        } else if(sum > 0){
            right--;
        } else {
            left++;
        }
    }
}
```

因為是排序過的陣列所以兩個 pointer 可以從前後開始相加，若大於零代表右邊目前數字太大了則右邊指針往前移，若小於零則左邊指針往後移。

若到最後兩個指針重疊都沒有找到答案，則回傳 `undefined`。

## Practice 2 - countUniqueValues

給定一個**排序過**的數字陣列，計算陣列中不同的數字有幾個。

1. 數字會是正負整數。

例如：`[-1, 1, 4, 4, 4, 5, 5]` ，答案是 `4`。

例如：`[]` ，答案是 `0`。

<details>
  <summary>Solution</summary>

  ```js
  function countUniqueValues(arr){
    if(arr.length === 0){
        return 0;
    }
    let i = 0;
    for(let j = 1; j < arr.length; j++){
        if(arr[i] !== arr[j]){
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1;
  }
  ```

  讓我們依範例題目 `[-1, 1, 4, 4, 4, 5, 5]` 來看：

  ```js
  //  i   j
  // [-1, 1, 4, 4, 4, 5, 5]
  // 目前兩個指針數字不同所以 i 往前一格，並且把 i 往前一格後的位置放 j 指到的數字。繼續跑迴圈。

  //      i  j
  // [-1, 1, 4, 4, 4, 5, 5]
  // 目前兩個指針數字不同所以 i 往前一格，並且把 i 往前一格後的位置放 j 指到的數字。繼續跑迴圈。

  //         i  j
  // [-1, 1, 4, 4, 4, 5, 5]
  // 目前兩個指針數字一樣，不做其他動作，繼續跑迴圈。

  //         i     j
  // [-1, 1, 4, 4, 4, 5, 5]
  // 目前兩個指針數字一樣，不做其他動作，繼續跑迴圈。

  //         i        j
  // [-1, 1, 4, 4, 4, 5, 5]
  // 目前兩個指針數字不同所以 i 往前一格，並且把 i 往前一格後的位置放 j 指到的數字。繼續跑迴圈。

  //            i        j
  // [-1, 1, 4, 5, 4, 5, 5]
  // 目前兩個指針數字一樣，不做其他動作，繼續跑迴圈。
  // 迴圈結束。
  // i 的位置在第 4 格，經過上面整理，我們可以確定到 i 為止的數字都是不同的。
  ```
</details>
