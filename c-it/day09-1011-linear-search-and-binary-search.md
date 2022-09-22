<!-- Day 9 極速上分 - Linear Search & Binary Search -->

## Linear Search

Linear Search 非常常見，甚至在學迴圈時就已經用過了。以下直接給範例練習！

## Practice - Linear Search

給定一個數字陣列 `array` 與一個數字 `n`，求出 `n` 是否在 `array` 中。回傳 `true` 或 `false。`

```js
function linearSearch(array, n){
for (let i = 0; i < array.length; i++) {
    if (n === array[i]) {
        return true
    }
}
return false;
}
```

最基本的搜尋方式，耗費的時間隨著輸入的資料而增長，時間複雜度為 O(n)。


## Binary Search

Binary Search 是一種更快的搜尋方式，比起 Liner Search 每次查找時只會排除一個元素，Binary Search 每次查找比對後可以排除掉當前資料量的一半元素。但 Binary Search 只能用在**排序過**的資料。

先前 Day 7 - Divide and Conquer 章節有提到過，可回去複習後實作以下練習。

## Practice 1 - Binary Search

給定一個已排序過的數字陣列 `array` 與一個數字 `n`，求出 `n` 是否在 `array` 中。回傳 `true` 或 `false。`

```js
function binarySearch(array, n){
let start = 0,
  end = array.length - 1,
  middle = Math.floor(array.length / 2);

while (start <= end) {
  if (array[middle] === n) {
      return true;
  } else if (array[middle] > n) {
      end = middle - 1;
  } else {
      start = middle + 1;
  }
  middle = Math.floor((start + end) / 2);
}

return false;
}
```

Binary Search 時間複雜度為 `O(log n)`。

每次比對時，排除一半元素。若陣列有 32 個元素，最差的情況會比對 5 次。若陣列有 128 個元素，最差的情況會比對 7 次。

在輸入資料增長的情況下，Binary Search 所需比對的次數增長幅度少很多。
