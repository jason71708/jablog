---
title: 'Sliding Window'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

定義兩個指標，一個是 `start`，一個是 `end`。

像是：
```js
//start     end
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

`start` 與 `end` 根據題目所需來移動，這兩個指標所圍出的範圍可大可小，類似像可滑動的兩片窗戶一樣。

在追蹤陣列或字串的子集 (subset) 或子序列 (subsequence) 上非常實用。

## Practice 1 - maxSubArraySum

給定一個數字陣列與正整數 `n`，請找出陣列中的最大子序列和，該子序列的長度必須等於 `n`。

例如：`[1, 3, 5, 7, 9, 2, 4, 6, 8, 10]`，`n = 3`，最大子序列 (`[6, 8, 10]`) 和為 `24`。

例如：`[1]`，`n = 2`，回傳 null。

較差的解法：

```js
function maxSubArraySum(arr, n){
    if (arr.length < n) return null;
    let maxSum = -Infinity;
    for(let i = 0; i < arr.length - n + 1; i++){
        let tempSum = 0;
        for(let j = 0; j < n; j++){
            tempSum += arr[i + j];
        }
        if(tempSum > maxSum){
            maxSum = tempSum;
        }
    }
    return maxSum;
}
```

使用 Sliding Window 技巧：

```js
function maxSubArraySum(arr, n) {
  if (arr.length < n) return null;

  let maxSum = 0;
  let tempSum = 0;

  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }

  tempSum = maxSum;

  for (let i = n; i < arr.length; i++) {
    tempSum = tempSum - arr[i - n] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;

  // 以範例 [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]，n = 3 為例：
  // 初始： [1, 3, 5]
  // 移到： [3, 5, 7]
  //           i
  //          num
  // [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]
  // 實際上只需減掉 1，與加上 7，不用每次都遞迴相加一次。

  // 移到： [5, 7, 9]
  //              i
  //          num
  // [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]
  // 實際上只需減掉 3，與加上 9，不用每次都遞迴相加一次。
}
```

## Practice 2 - findLongestSubstring

給定一個字串，請找出其中最長且不重複字母的子字串。

1. 字串只有空字串或小寫英文字母的字串，無其他標點符號或語言。
2. 空字串回傳 `0`。

例如：`"abcabcbb"`，回傳 `3`，因為 `"abc"` 是最長的不重複字母的子字串。

例如：`"bbbbb"`，回傳 `1`，因為 `"b"` 是最長的不重複字母的子字串。

<details>
  <summary>Solution</summary>

  ```js
  function findLongestSubstring(str) {
    // 字串小於等於 1 個字元，直接回傳 1 或 0;
    if (str.length <= 1) return str.length;

    // 此解法也有用到 Frequency Counter 技巧來紀錄每個字元最後出現的位置。
    let longest = 0;
    let seen = {};
    let start = 0;

    for (let i = 0; i < str.length; i++) {
      let char = str[i];

      // 該字元在之前出現過且出現過的位置比現在 start 指針的位置還要後面。
      // 在前面就不用管了，例如：
      //  start
      //    |
      // abccba
      //     |
      //     i
      // 因為 start 已經在第二個 c 位置，比 i 目前所在的 b 出現過的位置還要前面，所以不用考慮。
      // 反之，則 start 移動到目前字元出現過的位置的後一格。
      if (obj.hasOwnProperty(char) && obj[char] >= start) {
          start = obj[char] + 1;
      }

      // 將目前的字串長度跟之前的最長字串長度比較，取最長的。
      longest = Math.max(longest, i - start + 1);

      // 紀錄目前字元出現的位置。
      seen[char] = i;
    }

    return longest;
  }
  ```
</details>
