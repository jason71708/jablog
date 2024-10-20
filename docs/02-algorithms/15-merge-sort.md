---
title: 'Merge Sort'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

Merge Sort 是一種透過切分資料再一一合併的排序演算法。

> Merge Sort 有使用到 Divide and Conquer 與 Recursion 的技巧。

第一步：將陣列分割成更小的陣列，直到每個陣列只有一個或零個元素。

第二步：將每個陣列兩兩合併排序成一個陣列。

第三部：持續將陣列兩兩合併排序成一個陣列，直到合成一個。

以 `[30, 5, 1, 31, 10, 9, 2, 3, 4, 8, 7, 6]` 來說：

- 將陣列切半：
- `[30, 5, 1, 31, 10, 9]`、`[2, 3, 4, 8, 7, 6]`
- 再繼續切半：
- `[30, 5, 1]`、`[31, 10, 9]`、`[2, 3, 4]`、`[8, 7, 6]`
- 再繼續切半：
- `[30, 5]`、`[1]`、`[31, 10]`、`[9]`、`[2, 3]`、`[4]`、`[8, 7]`、`[6]`
- 再繼續切半直到每個陣列只有一個或零個元素：
- `[30]`、`[5]`、`[1]`、`[31]`、`[10]`、`[9]`、`[2]`、`[3]`、`[4]`、`[8]`、`[7]`、`[6]`
- 將每個陣列兩兩合併排序成一個陣列：
- `[5, 30]`、`[1]`、`[10, 31]`、`[9]`、`[2, 3]`、`[4]`、`[7, 8]`、`[6]`
- 繼續將每個陣列兩兩合併排序成一個陣列：
- `[1, 5, 30]`、`[9, 10, 31]`、`[2, 3, 4]`、`[6, 7, 8]`
- 繼續將每個陣列兩兩合併排序成一個陣列：
- `[1, 5, 9, 10, 30, 31]`、`[2, 3, 4, 6, 7, 8]`
- 繼續將每個陣列兩兩合併排序成一個陣列：
- `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31]`

實作上，我們需要兩個函式，一個負責將陣列切半，另一個負責將陣列兩兩合併排序。

## Practice 1 - Merge Sort (Split Array part)

首先實作切分陣列的函式，這邊會使用到 Recursion 的技巧，只要陣列長度大於 1 就呼叫自己再切一次。

<details>
  <summary>Solution</summary>

  ```js
  function splitArray(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return [splitArray(left), splitArray(right)];
  }
  ```

  用上面範例陣列輸入之後所得的結果會是：

  `[[[[30],[[5],[1]]],[[31],[[10],[9]]]],[[[2],[[3],[4]]],[[8],[[7],[6]]]]]`
</details>

## Practice 2 - Merge Sort (Merge and Sort Array part)

接著實作合併陣列的函式。

<details>
  <summary>Solution</summary>

  ```js
  function merge(array1, array2){
    let i = 0, j = 0, newArray = [];
    // 這邊謹記，我們是從只有一個或零個元素的陣列開始合併，所以每次執行這個函式所拿到的兩個陣列各自都會是排序過後的
    // 其中一方陣列已經空了，就直接把另一方陣列的元素加入新陣列
    // 假設左方陣列空了，右方還有，就代表右方剩下的數字都比左方大，所以直接加入新陣列
    while (i < array1.length && j < array2.length) {
      if (array1[i] === array2[j]) {
        newArray.push(array1[i], array2[j]);
        i++;
        j++;
      } else if (array1[i] > array2[j]) {
        newArray.push(array2[j])
        j++;
      } else {
        newArray.push(array1[i])
        i++;
      }
    }
    if (i < array1.length) {
      newArray.push(...array1.slice(i));
    } else if (j < array2.length) {
      newArray.push(...array2.slice(j));
    }
    return newArray;
  }
  ```

  以上是比較白話的寫法，以下精簡版本：

  ```js
  function merge(left, right) {
    const result = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return [...result, ...left, ...right];
  }
  ```
</details>

## Practice 3 - Merge Sort

來實作完整的 Merge Sort！ (上面的 `merge` 可以沿用)

<details>
  <summary>Solution</summary>

  ```js
  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)

    return merge(mergeSort(left), mergeSort(right));
  }
  ```

  這邊用到 Recursion 的技巧類似於 [費氏數列這題](./09-recursion.md#practice-3---fibonacci)
</details>

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
| ---------------------- | ------------------------- | ----------------------- | ---------------- |
| O(n log n)             | O(n log n)                | O(n log n)              | O(n)             |

Space Complexity 的部分較好理解，輸入的陣列元素有多少，我們在分割存新陣列或是合併成新陣列時，總元素的個數就有多少。

Time Complexity 的部分，不像前面 Insertion Sort 最好的情況是 O(n)，Merge Sort 總是先切分成最小個陣列後再合併排序起來，所以在各個情況下，Time Complexity 都是 O(n log n)。

至於為何是 n * log n，其中 n 是陣列的元素總數 (比對幾次)，log n 是切分的次數。

在 Big O 中，log 的 base 是 2，所以 log n **代表的是 2 的幾次方會等於 n**。

假設現在有個陣列長度為 8 (以下數字都代指陣列長度)：
1. 切一次會是 4, 4
2. 再切一次會是 2, 2, 2, 2, 2
3. 再切一次會是 1, 1, 1, 1, 1, 1, 1, 1

總共會有 3 次切分。

陣列長度為 16 就會有 4 次切分，以此類推。

接著延續陣列長度為 8 的例子，合併排序時，從只有一個元素的陣列合併回來：
1. 合併排序一次會是 2, 2, 2, 2, 2
2. 再合併排序一次會是 4, 4
3. 再合併排序一次會是 8

每次的合併排序，每個元素都會比較一次，元素總數為 n，合併排序 3 次，總共會比較 n * 3 次。

合併次數就是 log n 次。

所以 Time Complexity 是 O(n log n)。

Merge Sort 雖然在 Space Complexity 犧牲了一些，但是在 Time Complexity 上，比前面提到的三種排序都還優秀。

試著切換註解跑跑看下列範例：

```js
const data = Array(100000).fill().map(() => Math.floor(Math.random() * 100000));
insertionSort(data); // 注意先前的實作的 insertionSort 函式會改變輸入的陣列噢
```

```js
const data = Array(100000).fill().map(() => Math.floor(Math.random() * 100000));
mergeSort(data); // 注意先前的實作的 insertionSort 函式會改變輸入的陣列噢
```

實際體驗看看兩種排序所耗費的時間差別吧！
