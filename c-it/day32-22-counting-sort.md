<!-- Day 32 你看我 CS - Counting Sort -->

Counting Sort 是以**數字為基礎**的排序演算法，其需要定義**最大範圍值**，作為排序用，整體算法較簡單且速度較快，缺點就是排序元素需要確定在最大範圍值內且需要額外空間儲存做運算。

## Step 1 - Counting How Many Times Each Element Occurs

假設現在有個待排序的陣列 (Input Array: IArray)： `[4, 4, 6, 1, 3, 0, 2]` ，並且定義此算法最大範圍值為 `6` (以下簡稱最大值) 。

> 通常數字可能的範圍會訂在 0 ~ 最大值 之間的**整數**，可根據實際需求做調整，整體概念與流程還是一樣的。

最大值為 `6` ，建立一個陣列 (Counting Array: CArray)有 6 + 1 個元素，暫都先設 `0` ： `[0, 0, 0, 0, 0, 0, 0]` 。

所以 CArray 有 7 個位置，每個位置的 Index 代表 0 ~ 6 的數字。

接著算各個元素出現的次數： `[1, 1, 1, 1, 2, 0, 1]`

上述結果可以看到 Index 5 代表的數字 5 沒有出現過，所以記 `0` 。

Index 4 代表的數字 4 出現過兩次，所以記 `2` 。

## Step 2 - Sorting & Output

接著建立一個空陣列 (Output Array: OArray) ： `[]` 。

根據 CArray 的數值依序加入 OArray 中：

1. `[1, 1, 1, 1, 2, 0, 1]`： `0` 有出現過 1 次，將其加入 OArray 中 -> `[0]` ，並且將 `0` 計次減 1 。
2. `[0, 1, 1, 1, 2, 0, 1]`： `0` 目前計次為 0 ，換下個， `1` 有出現過 1 次，將其加入 OArray 中 -> `[0, 1]` ，並且將 `1` 計次減 1 。
3. `[0, 0, 1, 1, 2, 0, 1]`： `1` 目前計次為 0 ，換下個， `2` 有出現過 1 次，將其加入 OArray 中 -> `[0, 1, 2]` ，並且將 `2` 計次減 1 。
4. `[0, 0, 0, 1, 2, 0, 1]`： `2` 目前計次為 0 ，換下個， `3` 有出現過 1 次，將其加入 OArray 中 -> `[0, 1, 2, 3]` ，並且將 `3` 計次減 1 。
5. `[0, 0, 0, 0, 2, 0, 1]`： `3` 目前計次為 0 ，換下個， `4` 有出現過 2 次，將其加入 OArray 中 -> `[0, 1, 2, 3, 4]` ，並且將 `4` 計次減 1 。
6. `[0, 0, 0, 0, 1, 0, 1]`： `4` 有出現過 1 次，將其加入 OArray 中 -> `[0, 1, 2, 3, 4, 4]` ，並且將 `4` 計次減 1 。
7. `[0, 0, 0, 0, 0, 0, 1]`： `4` 與 `5` 計次都為 0 。
8. `[0, 0, 0, 0, 0, 0, 1]`： `6` 有出現過 1 次，將其加入 OArray 中 -> `[0, 1, 2, 3, 4, 4, 6]` ，並且將 `6` 計次減 1 。
9. 沒有 Index 7 ，超過最大範圍值，結束。

其輸出結果為 `[0, 1, 2, 3, 4, 4, 6]` 。

## Extra - Handling Non-Numeric Items

而如果今天要依價格排序商品的資訊怎辦？

沿用上段的 IArray 做成有商品資訊的版本：

```js
[
  { name: 'Acer Desktop', price: 4 },
  { name: 'Asus Desktop', price: 4 },
  { name: 'MacBook', price: 6 },
  { name: 'Mouse', price: 1 },
  { name: 'Samsung', price: 3 },
  { name: 'Line', price: 0 },
  { name: 'Coke Cola', price: 2 },
];
```

但是在[第二步](#step-2---sorting--output) 會遇到有兩個 4 但不知道是要拿哪一個的情況。是 Acer Desktop 還是 Asus Desktop ?

所以 CArray 的部分要做些額外處理，去紀錄這些物件對應的最終 Index 順序是多少。

## Step 2 - Sorting & Output - Non-Numeric Items Ver.

前步驟 CArray 的結果是 `[1, 1, 1, 1, 2, 0, 1]`

接著我們要算各個物件的最終 Index 會是多少。

先建立一個空陣列 (Next Index Array: NIArray)： `[]`

1. CArray 的 Index `0` 有一個，所以目前來看 Output 會是 `[0]` ，由於前面沒有東西，所以在 NIArray 紀錄 Index `0` 的 Next Index 為 `0`
2. CArray 的 Index `1` 有一個，所以目前來看 Output 會是 `[0, 1]` ，由於前面已有 1 個元素，所以在 NIArray 紀錄 Index `1` 的 Next Index 為 `1`
3. CArray 的 Index `2` 有一個，所以目前來看 Output 會是 `[0, 1, 2]` ，由於前面已有 2 個元素，所以在 NIArray 紀錄 Index `2` 的 Next Index 為 `2`
4. CArray 的 Index `3` 有一個，所以目前來看 Output 會是 `[0, 1, 2, 3]` ，由於前面已有 3 個元素，所以在 NIArray 紀錄 Index `3` 的 Next Index 為 `3`
5. CArray 的 Index `4` 有**兩**個，所以目前來看 Output 會是 `[0, 1, 2, 3, 4, 4]` ，由於前面已有 4 個元素，所以在 NIArray 紀錄 Index `4` 的 Next Index 為 `4`
6. CArray 的 Index `5` 有**零**個，所以目前來看 Output 會是 `[0, 1, 2, 3, 4, 4]` ，所以在 NIArray 紀錄 Index `5` 的 Next Index 為 `0` 或 `null` 之類的都可以，因為不會有 Index `5` 的元素來查找它最終的 Index 在哪。
7. CArray 的 Index `6` 有一個，所以目前來看 Output 會是 `[0, 1, 2, 3, 4, 4, 6]` ，由於前面已有 **6** 個元素，所以在 NIArray 紀錄 Index `6` 的 Next Index 為 `6`

NIArray 的計算就到此結束，用公式表示會等於：
```js
nextIndex[i] = nextIndex[i - 1] + counts[i - 1]
```

NIArray 的結果會是： `[0, 1, 2, 3, 4, 0, 6]`

先建立一個跟 IArray 相同長度的 Output Array (OArray)。

再按照 IArray 元素的順序一個個查找 NIArray 的值：

1. Acer Desktop 價格為 `4`，找 Index `4` 的值是 `4`，所以 OArray 會是 `[null, null, null, null, 'Acer Desktop', null, null]`，接著將 NIArray 的 Index `4` 的值**加 1**。
目前 NIArray 的結果會是： `[0, 1, 2, 3, 5, 0, 6]`。
2. Asus Desktop 價格為 `4`，找 Index `4` 的值是 **`5`**，所以 OArray 會是 `[null, null, null, null, 'Acer Desktop', 'Asus Desktop', null]`，接著將 NIArray 的 Index `4` 的值**加 1**。
目前 NIArray 的結果會是： `[0, 1, 2, 3, 6, 0, 6]`。
3. MacBook 價格為 `6`，找 Index `6` 的值是 **`6`**，所以 OArray 會是 `[null, null, null, null, 'Acer Desktop', 'Asus Desktop', 'MacBook']`，接著將 NIArray 的 Index `6` 的值**加 1**。
目前 NIArray 的結果會是： `[0, 1, 2, 3, 6, 0, 7]`。
4. Mouse 價格為 `1`，找 Index `1` 的值是 **`1`**，所以 OArray 會是 `[null, 'Mouse', null, null, 'Acer Desktop', 'Asus Desktop', 'MacBook']`，接著將 NIArray 的 Index `1` 的值**加 1**。
目前 NIArray 的結果會是： `[0, 2, 2, 3, 6, 0, 7]`。
5. Samsung 價格為 `3`，找 Index `3` 的值是 **`3`**，所以 OArray 會是 `[null, 'Mouse', null, 'Samsung', 'Acer Desktop', 'Asus Desktop', 'MacBook']`，接著將 NIArray 的 Index `3` 的值**加 1**。
目前 NIArray 的結果會是： `[0, 2, 2, 4, 6, 0, 7]`。
6. Line 價格為 `0`，找 Index `0` 的值是 **`0`**，所以 OArray 會是 `['Line', 'Mouse', null, 'Samsung', 'Acer Desktop', 'Asus Desktop', 'MacBook']`，接著將 NIArray 的 Index `0` 的值**加 1**。
目前 NIArray 的結果會是： `[1, 2, 2, 4, 6, 0, 7]`。
7. Coke Cola 價格為 `2`，找 Index `2` 的值是 **`2`**，所以 OArray 會是 `['Line', 'Mouse', 'Coke Cola', 'Samsung', 'Acer Desktop', 'Asus Desktop', 'MacBook']`，接著將 NIArray 的 Index `2` 的值**加 1**。
目前 NIArray 的結果會是： `[1, 2, 3, 4, 6, 0, 7]`。

IArray 元素遍歷完了，最終排序結果會是 `['Line', 'Mouse', 'Coke Cola', 'Samsung', 'Acer Desktop', 'Asus Desktop', 'MacBook']`。

仔細觀察可以發現 Acer Desktop 與 Asus Desktop 價格一樣，排序過後的前後順序還是一樣不變，這樣可以稱為**穩定排序**(stable sorting)。

## Implementation

```js
function countingSort(inputArray, maxValue) {

  const counts = new Array(maxValue + 1).fill(0);
  for (let item of inputArray) {
    counts[item]++;
  }

  let numItemsBefore = 0;
  for (let i = 0; i <= maxValue; i++) {
    const tmp = counts[i];
    counts[i] = numItemsBefore;
    numItemsBefore += tmp;
  }

  const outputArray = new Array(inputArray.length).fill(0);

  for (let item of inputArray) {

    outputArray[ counts[item] ] = item;

    counts[item] += 1;
  }
  return outputArray;
}
```

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|---|---|---|---|
| O(n+k) | O(n+k) | O(n+k) | O(n+k) |

> K 是指 `maxValue`

時間複雜度部分我們計算元素出現次數遍歷了一次，接著從 0 到 `maxValue` 遍歷一次算出 Next Index ，最後再遍歷元素一次將其放到正確的位置。

總共 2n+k 簡化成 **n+k** 。

空間複雜度我們建立了跟 `inputArray` 一樣的 `outputArray` 並回傳，且也根據 `maxValue` 建立了計算次數和 Next Index 用的陣列，總共 n+k 。

但空間複雜度這邊我們可以再做優化，不建立 `outputArray` 但修改 `inputArray` 內的元素順序。

這樣節省空間複雜度至 **k** ，但這排序法會變成會修改原始資料 (In-place algorithm)。

> 標題的 CS 指的是 LOL 遊戲中的 creep score (小兵擊殺數)