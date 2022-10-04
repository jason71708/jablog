<!-- Day 19 排序新理解 - Radix Sort -->

在這篇之前的排序法都可以用在任何可以比較的資料上，例如一個含有帳戶資料的陣列，按照每個帳戶的 ID 、更新時間、名字、帳戶餘額等等來排序。但 Radix Sort (基數排序) 較不一樣，它只可以用在**數字**的排序上，而且它**不比大小**。

以 `[9, 133, 567, 44, 21, 45, 11, 561]` 來說：

1. 首先我們有編號 0 - 9 的桶子，從個位數開始一輪，將個位數是對應桶子編號的放進去：

|  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |
|---|---|---|---|---|---|---|---|---|---|
|   |  21  |   |  133  |  44  |  45  |   |  567  |   |  9  |
|   |  11  |   |   |   |   |   |   |   |   |
|   |  561  |   |   |   |   |   |   |   |   |

2. 接著我們按照桶子編號順序**從最先放入桶子中**的數字開始拿出來排列：

`[21, 11, 561, 133, 44, 45, 567, 9]`

3. 接著是十位數，將十位數是對應桶子編號的放進去：

如果數字只有個位數的話，相當於它的其他位數都是零。

|  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |
|---|---|---|---|---|---|---|---|---|---|
|  9  |  11  |  21  |  133  |  44  |    |  561  |    |    |    |
|    |    |    |    |  45  |    |  567  |    |    |    |

4. 按照步驟 2. 排列：

`[9, 11, 21, 133, 44, 45, 561, 567]`

5. 接著是百位數，將百位數是對應桶子編號的放進去：

|  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |
|---|---|---|---|---|---|---|---|---|---|
|  9  |  133  |    |    |    |  561  |    |    |    |    |
|  11  |    |    |    |    |  567  |    |    |    |    |
|  21  |    |    |    |    |    |    |    |    |    |
|  44  |    |    |    |    |    |    |    |    |    |
|  45  |    |    |    |    |    |    |    |    |    |

6. 按照步驟 2. 排列：

`[9, 11, 21, 44, 45, 133, 561, 567]`

7. 由於沒有到千位數的數字，所以排列完成！

## Practice 1 - Digit Count

給一個數字，回傳這個數字有幾位數，例如 `digitCount(123)` 回傳 `3`。

```js
function digitCount(n) {
  return String(n).length;
}
```

或者是

```js
function digitCount(n) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
  // 由於 Math.log10(0) 的情況會是 -Infinity，所以要額外做判斷。
}
```

## Practice 2 - Most Digits

給定一個只有數字的陣列，回傳其中最大數字有幾位數，例如 `mostDigits([13, 56, 7899])` 回傳 `4`。

```js
function mostDigits(arr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (String(arr[i]).length > max) {
      max = String(arr[i]).length;
    }
  }
  return max;
}
```

## Practice 3 - GetDigits

給定一個數字與位數，回傳這個數字的這個位數的數字，例如 `getDigits(123, 3)` 回傳 `1`。

```js
function getDigits(num, digit) {
  return Math.floor(Math.abs(num) / Math.pow(10, digit - 1)) % 10;
}
```

## Practice 4 - Radix Sort

接著沿用上面幾個練習來實作。

```js
function radixSort(arr) {
  const maxDigit = mostDigits(arr);
  for (let k = 1; k <= maxDigit; k++) {
    const digitSlots = Array(10).fill().map(() => []);
    // 或是 Array.from({ length: 10 }, () => []);
    for (let i = 0; i < arr2.length; i++) {
      digitSlots[getDigits(arr2[i], k)].push(arr2[i]);
    }
    arr = digitSlots.flat();
    // 或是 arr = [].concat(...digitSlots);
  }
  return arr2;
}
```

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|---|---|---|---|
| O(nk) | O(nk) | O(nk) | O(n + k) |

`n` = 數字總數，`k` = 數字的位數

由上述實作可知數字的位數也會影響到我們第一層迴圈的執行次數。

而 `k` 要根據題目的情境來決定，假設說題目限定數字大小範圍是 -10² ~ 10²，那麼 `k` 的值會是 `3` 可以當作是常數，相近於 O(n)。

在沒有特別用常數定義數字的大小時， `k` 會相近於 log(n)。解釋來自於[這篇](https://stackoverflow.com/questions/48451734/radix-sort-on-log-n-efficiency)

在 `k` 會是常數的情境下，效能會比之前提到 O(n log n) 系列的排序都還好。

就算是特別的情境下 `k ~= log(n)` 也跟 O(n log n) 系列的排序幾乎持平。

空間複雜度則很簡單，除了一直儲存 `n` 個數字到對應的桶子之外，每個位數 (`k`) 的比對都會建立桶子，所以空間複雜度是 O(n + k)。

> Radix Sort 依筆者理解常用於只有整數的數字的排序，不太適用於小數點，否則還需要先找出擁有小數點最多的位數是到多少，且要從那一位開始排序。