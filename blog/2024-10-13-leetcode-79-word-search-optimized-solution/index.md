---
title: Leetcode 79. Word Search 解法優化分享
description: 在解這題的過程中，發現了一些 test case 能提早判斷 return 掉，跑測試後能把時間壓在 100ms 以內，其他人分享的解法大都落在 300ms 上下，所以分享一下這個能穩定 beat 99% 其他人的優化方式。
tags: [javascript, leetcode]
image: ./cover.png
---

![cover](./cover.png)

在解這題的過程中，發現了一些 test case 能提早判斷 return 掉，跑測試後能把時間壓在 100ms 以內，其他人分享的解法大都落在 300ms 上下，所以分享一下這個能穩定 beat 99% 其他人的優化方式。

<!--truncate-->

## 解法

原題[連結](https://leetcode.com/problems/word-search/description/)

這題主要是在 `mxn` 的矩陣中，透過走格子方式看是否能組出題目要求的字串 (`word`)，然後回傳 true or fasle。

大致上思路是先遍歷矩陣每個位置的字母，若找到跟 `word` 第一個字母一樣時就開始查找，從當前位置上下左右查找下一個字母，直到無法匹配或是匹配到最後一個字母。

並且我們需要紀錄已經找到的位置，這樣每次上下左右移動時才不會走回頭路。

```js
var exist = function(board, word) {
    const M = board.length
    const N = board[0].length

    var helper = function(m, n, i) {
        if (word.length === i) return true // end of search
        if (m >= M || n >= N || m < 0 || n < 0) return false // out of bondary
        if (board[m][n] !== word[i]) return false // is not the correct route

        const visitedChar = board[m][n]
        board[m][n] = '.'
        i++
        // go up, down, left, right and change visited char to '.'
        const result = helper(m+1, n, i) || helper(m-1, n, i) || helper(m, n+1, i) || helper(m, n-1, i)
        board[m][n] = visitedChar
        return result
    }

    for (let j = 0; j < M; j++) {
        for (let k = 0; k < N; k++) {
            if (helper(j, k, 0)) {
                return true
            }
        }
    }
    return false
};
```

我們把上述程式碼拆成兩個部分。第一個部分就如同上段所述，先查找矩陣每個位置並執行 `helper` 查找，如果有匹配到第一個字母就繼續往上下左右執行 `helper`。

第二部分是 `helper` 函式需要處理邊際案例，例如當下個要查找的位置超出矩陣範圍時，就直接回傳 `false`。已經沒有需要匹配的字母時，也直接回傳 `false`。

這裡比較特別的是，`helper` 函式在每次要往上下左右執行下去前要先把當前位置的字母設為 `.` 來記錄已經匹配過的位置，之後在執行完成前再把該位置的字母還原回來。

到這裡其實就是標準解法了，在 Leetcode 上的 Solution 幾乎都是分享這種解法，且時間都是在 300ms 上下。

## 優化

其實在跑測試案例時，我有發現到一些邊際情況，例如：

```js
const board = [
  ["A","A","A","A","A","A"],
  ["A","A","A","A","A","A"],
  ["A","A","A","A","A","A"],
  ["A","A","A","A","A","A"],
  ["A","A","A","A","A","A"],
  ["A","A","A","A","A","A"]
]
const word = "AAAAAAAAAAAAAAB"
```

這裡不用往上下左右匹配，一眼看就知道整個 `board` 少了 `B` 根本不可能匹配完 `word`。

所以優化的方向很明顯，在遍歷匹配前先計算 `board` 和 `word` 所需的字母數，接著比對看 `board` 有沒有缺少。

```js
var exist = function(board, word) {
  const M = board.length
  const N = board[0].length
  const boardMap = {}
  const wordMap = {}
  for (let j = 0; j < M; j++) {
      for (let k = 0; k < N; k++) {
          if (boardMap[board[j][k]]) {
              boardMap[board[j][k]] ++
          } else {
              boardMap[board[j][k]] = 1
          }
      }
  }
  for (let j = 0; j < word.length; j++) {
      if (wordMap[word[j]]) {
          wordMap[word[j]] ++
      } else {
          wordMap[word[j]] = 1
      }
  }
  for (let char in wordMap) {
      if (!boardMap[char] || boardMap[char] < wordMap[char]) return false
  }
}
```

雖然會多佔用一點點記憶體，但是平均的耗時可以減少到 100ms 以下。

![cover](./cover.png)

這個解法只能優化平均耗時，最差的情況依舊是 `O(M * N * 4^len)`。

## 完整優化解法

```js
var exist = function(board, word) {
    const M = board.length
    const N = board[0].length

    /**
     * Improve time complexity
     * check letters in board could satisfied the word
     */
    const boardMap = {}
    const wordMap = {}
    for (let j = 0; j < M; j++) {
        for (let k = 0; k < N; k++) {
            if (boardMap[board[j][k]]) {
                boardMap[board[j][k]] ++
            } else {
                boardMap[board[j][k]] = 1
            }
        }
    }
    for (let j = 0; j < word.length; j++) {
        if (wordMap[word[j]]) {
            wordMap[word[j]] ++
        } else {
            wordMap[word[j]] = 1
        }
    }
    for (let char in wordMap) {
        if (!boardMap[char] || boardMap[char] < wordMap[char]) return false
    }

    var helper = function(m, n, i) {
        if (word.length === i) return true // end of search
        if (m >= M || n >= N || m < 0 || n < 0) return false // out of bondary
        if (board[m][n] !== word[i]) return false // is not the correct route

        const visitedChar = board[m][n]
        board[m][n] = '.'
        i++
        // go up, down, left, right and change visited char to '.'
        const result = helper(m+1, n, i) || helper(m-1, n, i) || helper(m, n+1, i) || helper(m, n-1, i)
        board[m][n] = visitedChar
        return result
    }

    for (let j = 0; j < M; j++) {
        for (let k = 0; k < N; k++) {
            if (helper(j, k, 0)) {
                return true
            }
        }
    }
    return false
};
```

## 結語

每次解完 Leetcode 都會去看其他人用的解法和有沒有可以學習的地方，但這次看到幾個解法的耗時大都落在 300ms 上下，自己的都在 100ms 以內，比較下差異後特別寫了篇分享，另外我有也提供 Solution 在上面，希望有看到的朋友們可以幫我 Upvote 一下。
