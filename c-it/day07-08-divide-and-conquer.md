<!-- Day 7 BO5-4 - Divide and Conquer -->

將一組資料切分成兩組或多組資料，再用切分後的資料進行處理。此技巧能有效減少時間複雜度。

此技巧大量用於搜尋演算法內，以下用 **二分搜尋法 (Binary Search)** 來舉例：

## Practice 1 - Binary Search

給定一個**排序過**的數字陣列與一個數字 `n`，在陣列中找出該數字 `n` 的位置，若沒有則回傳 `-1`。

較差解法：

```js
function linearSearch(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      return i;
    }
  }
  return -1;
}
```

時間複雜度是 O(n)。

使用 Divide and Conquer 技巧：

```js
function binarySearch(arr, n) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === n) {
      return mid;
    } else if (arr[mid] < n) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// 例如： [1, 4, 5, 6, 11, 14, 23, 45, 67, 89, 100] 找出 89 的位置
// 因為是排序過的陣列，先抓中間位置的數字 14，若 89 比它大則往右搜尋，若小則往左搜尋。
// 接著繼續抓右半邊的中間數字 67，若 89 比它大則往右搜尋，若小則往左搜尋。
// 繼續比對，直到找到 89 或跳出迴圈為止。
```

二分法搜尋有效減少了搜尋比較次數，時間複雜度為 **O(log n)**。

在 Big O 表示中，log 的 base 是 2，所以 *log n* **代表的是 2 的幾次方會等於 n**。
在 Binary Search 中，每次比對都會過濾掉幾乎一半的元素，因此可以大略計算如下：
- 一個長度為 8 的陣列中用 Binary Search 找特定元素
- 第一次比對後會剩下 4 個
- 第二次比對後會剩下 2 個
- 第三次比對後會剩下 1 個

陣列長度為 16 就會在 4 次比對後剩下 1 個，以此類推。

![trands](./trands.jpg)

要記得在 Big O 表示中我們關心的是隨著輸入資料越大越多而時間與記憶體使用的增長**趨勢**， **O(log n)** 增長的趨勢會比 O(n) 還平緩，甚至和 O(1) 較接近，是一個很優秀的複雜度。
