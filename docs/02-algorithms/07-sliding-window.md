---
title: 'Sliding Window'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

Sliding Window 跟上篇 [Multiple Pointers](./06-multiple-pointers.md) 類似，定義兩個指標，一個是 `start`，一個是 `end`。

像是：

| start |     |     |     | end |     |     |
| ----- | --- | --- | --- | --- | --- | --- |
| 1     | 2   | 3   | 4   | 5   | 6   | 7   |

`start` 與 `end` 根據題目所需來移動，這兩個指標所圍出的範圍可大可小，類似像可滑動的兩片窗戶一樣。

在追蹤陣列或字串的子集 (subset) 或子序列 (subsequence) 上非常實用。

:::tip
Subarrays & Subsequence & Subsets

舉一個最簡單的例子：
```js
const array = [1, 2, 3, 4, 5]
let subarray = [1, 2, 3]
subarray = [2, 3]
subarray = [3, 4, 5]
subarray = [1]
```
Subarrays 必須要照原本陣列的元素排列**順序**與**連續**

```js
const array = [1, 2, 3, 4, 5]
let subsequence = [1, 3, 5]
subsequence = [2, 4]
subsequence = [1, 2, 4, 5]
subsequence = [1]
```
Subsequence 只要照原本陣列的元素排列**順序**

```js
const array = [1, 2, 3, 4, 5]
let subset = [5, 4, 1]
subset = [2, 3, 1]
subset = [5, 2, 3]
subset = [1]
```
Subsets 只要元素有包含在原本陣列即可，不用照順序與連續
:::

## Practice 1 - maxSubArraySum

給定一個數字陣列與正整數 `n`，請找出陣列中的最大子序列和，該子序列的長度必須等於 `n`。

這邊說要找子序列，所以是要相鄰的元素。

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

以上有巢狀迴圈，所以在 `arr.length` 與 `n` 越來越大的情況下會跑 `n * arr.length` 次，時間複雜度會是 **O(n²)** 。

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
  // 實際上只需減掉 1，與加上 7，不用每次都遞迴相加一次。
  // 換句話說就是每次減掉第一個元素，加上下一個元素。

  // 移到： [5, 7, 9]
  // 實際上只需減掉 3，與加上 9，不用每次都遞迴相加一次。

  // 以此類推
}
```

以上迴圈是平行的，在 `arr.length` 與 `n` 越來越大的情況下頂多跑 `n + arr.length` 次，時間複雜度會是 **O(n)** 。

## Practice 2 - findLongestSubstring

給定一個字串，請找出其中最長且不重複字母的子字串。

1. 字串只有空字串或小寫英文字母的字串，無其他標點符號或語言。
2. 空字串回傳 `0`。

例如：`"abcabcbb"`，回傳 `3`，因為 `"abc"` 是最長的不重複字母的子字串。

例如：`"bbbbb"`，回傳 `1`，因為 `"b"` 是最長的不重複字母的子字串。

<details>
  <summary>Solution</summary>

  以 `'abccba'` 為例：

  | start |     |     |     |     |     |
  | ----- | --- | --- | --- | --- | --- |
  | end   |     |     |     |     |     |
  | a     | b   | c   | c   | b   | a   |

  檢查目前 *end* 指到的字元 `a` 有沒有出現過，

  沒有的話將目前 *end* 指到的字元 `a` 用 Frequency Counter 技巧記錄到物件內，紀錄 `a` 的 `index` ，

  紀錄一下目前 *start* 到 *end* 範圍的長度

  最後移動 *end* 到下一格。

  | start |     |     |     |     |     |
  | ----- | --- | --- | --- | --- | --- |
  |       | end |     |     |     |     |
  | a     | b   | c   | c   | b   | a   |

  `b` 也沒出現過重複上述動作。

  | start |     |     |     |     |     |
  | ----- | --- | --- | --- | --- | --- |
  |       |     | end |     |     |     |
  | a     | b   | c   | c   | b   | a   |

  `c` 也沒出現過重複上述動作。

  | start |     |     |     |     |     |
  | ----- | --- | --- | --- | --- | --- |
  |       |     |     | end |     |     |
  | a     | b   | c   | c   | b   | a   |

  `c` 有出現過了，上次出現的位置是 `2` ，

  所以只好移動 *start* 到上次出現的位置的下一格，以排除之前出現過的字元。

  |     |     |     | start |     |     |
  | --- | --- | --- | ----- | --- | --- |
  |     |     |     | end   |     |     |
  | a   | b   | c   | c     | b   | a   |

  紀錄 `c` 的**新**出現過的位置 `index` 等於 `3` ，

  紀錄一下目前 *start* 到 *end* 範圍的長度

  最後移動 *end* 到下一格。

  |     |     |     | start |     |     |
  | --- | --- | --- | ----- | --- | --- |
  |     |     |     |       | end |     |
  | a   | b   | c   | c     | b   | a   |

  `b` 雖然有出現過，但上次出現的位置是 `1` ，目前 `start` 的位置是 `3` ，已經排除該字元了，所以不用變更 `start` 的位置。

  紀錄 `b` 的**新**出現過的位置 `index` 等於 `4` ，

  紀錄一下目前 *start* 到 *end* 範圍的長度

  最後移動 *end* 到下一格。

  以此類推直到 *end* 移到陣列最後一個位置。

  ```js
  function findLongestSubstring(str) {
    // 字串小於等於 1 個字元，直接回傳字串長度;
    if (str.length <= 1) return str.length;

    // 此解法也有用到 Frequency Counter 技巧來紀錄每個字元最後出現的位置。
    let longest = 0;
    let seen = {};
    let start = 0;

    for (let i = 0; i < str.length; i++) {
      let char = str[i];

      //  檢查有無出現過且出現過的位置比 start 還後面，則移動 start 到上次出現過的位置的後一格
      if (Object.prototype.hasOwnProperty.call(seen, char) && seen[char] >= start) {
          start = seen[char] + 1;
      }

      // 將目前的字串長度跟之前的最長字串長度比較，取最長的。
      longest = Math.max(longest, i - start + 1);

      // 更新目前字元出現的位置。
      seen[char] = i;
    }

    return longest;
  }
  ```
</details>
