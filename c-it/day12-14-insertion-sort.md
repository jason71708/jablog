<!-- Day 12 我的回合，抽卡！！！ - Insertion Sort -->

從**第二個**元素開始，往前比對，如果比前一個元素小，則交換位置，以此類推。

以 `[30, 5, 1, 31, 10, 9, 2, 3, 4, 8, 7, 6]` 來說：
- 第一次比對：從第二個元素開始往前比對，5 比 30 小，交換位置：
- `[5, 30, 1, 31, 10, 9, 2, 3, 4, 8, 7, 6]`
- 第二次比對：從第三個元素開始往前比對，1 比 30 小，交換位置，1 比 5 小，交換位置：
- `[1, 5, 30, 31, 10, 9, 2, 3, 4, 8, 7, 6]`
- 第三次比對：從第四個元素開始往前比對，31 比 30 大，順序不變
- `[1, 5, 30, 31, 10, 9, 2, 3, 4, 8, 7, 6]`

很像玩撲克牌在整理手牌時會用的方式。

若當前比對不成立時 (像上述範例的第三步驟)，代表 31 也不會再比更前面的元素小了，所以可以直接結束該輪比對。

由於此特性，Insertion Sort 很適合用在**幾乎快完成排序**的資料上。例如某 server 上儲存一組排序過的陣列資料，之後有一筆新資料加進來時，使用 Insertion Sort 可以很快排序完成。

## Practice

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }
  return arr;
}
```

比較白話文的寫法：

```js
function insertionSort(arr) {
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        let temp = array[j];
        array[j] = array[j - 1];
        array[j - 1] = temp;
      } else {
        break;
      }
    }
  }
  return array;
}
```

還有另種較好的寫法：

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}
// 以 [1, 3, 5, 7, 11, 13, 9] 來說，
// 在 i 等於 6 的最後一輪比對時，
// 先將當前元素 9 存起來 (temp)
// 9 比 13 小，故 index 6 的位置放 13：[1, 3, 5, 7, 11, 13, 13]
// 繼續比對，9 比 11 小，故 index 5 的位置放 11：[1, 3, 5, 7, 11, 11, 13]
// 繼續比對，9 比 7 大，結束該輪比對，將 temp 放到目前 index 4 的位置，即：[1, 3, 5, 7, 9, 11, 13]
```

最好情況下，Insertion Sort 的時間複雜度為 **O(n)**。

最壞情況下的時間複雜度為 **O(n²)**。
