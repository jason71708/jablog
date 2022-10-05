<!-- Day 20 你會分類你要先講 - Bucket Sort -->

Bucket Sort 和之前的 [Radix Sort](https://ithelp.ithome.com.tw/articles/10303968) 有點類似，建立幾個桶子並將資料丟進去排序。而 Bucket Sort 是取區間，例如 1 號桶子裝 0 ~ 9 的數值， 2 號桶子裝 1 ~ 19 的數值，以此類推。

## Fundamental

Bucket Sort 的步驟有 3 個，分散 (Scatter)、排序 (Sort)、收集 (Gather)。

如前述，我們取好區間與需要幾個桶子，並開始將這些資料**分散**在對應區間的桶子中：

資料：

|  0.12  |  11  |  3.12  |  0.03  |  9  |  0.87  |  0.5  |  2  |  -2  |  -4.123  |  -9  |  10  |  3  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

區間與桶子的設定有各種方式，固定的或是依照資料來定的都有，這邊依照資料定有以下兩種做法：

1. 設定桶子 5 個，區間取最大最小值相減再除以 5 。
2. 設定區間，並取最大最小值相減再除以區間 (需再加 1 ，因為有小數點的情況代表還有資料未包含在內)。

這邊我們選做法 1 。

最大最小值分別是 11 與 -9 相減再除以 5 得到區間是 4 。

建出桶子之後將資料放入對應的桶子內：

|  -9 ~ -5  |  -5 ~ -1  |  -1 ~ 3  |  3 ~ 7  |  7 ~ 11  |
|---|---|---|---|---|
| -9 | -2 | 0.12 | 3.12 | 11 |
|  | -4.123 | 0.03 | 3 | 9 |
|  |  | 0.87 |  | 10 |
|  |  | 0.5 |  |  |
|  |  | 2 |  |  |

然後遍歷這些桶子內的資料做**排序**，通常用 Insertion Sort ，用其他的也可以，視需求情況而定。

|  -9 ~ -5  |  -5 ~ -1  |  -1 ~ 3  |  3 ~ 7  |  7 ~ 11  |
|---|---|---|---|---|
| -9 | -4.123 | 0.03 | 3 | 9 |
|  | -2 | 0.12 | 3.12 | 10 |
|  |  | 0.5 |  | 11 |
|  |  | 0.87 |  |  |
|  |  | 2 |  |  |

排序後將桶子從小到大一一組合**收集**起來：

|  -9  |  -4.123  |  -2  |  0.03  |  0.12  |  0.5  |  0.87  |  2  |  3  |  3.12  |  9  |  10  |  11  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

## Implementation

這邊就沿用 Insertion Sort 章節的函式，不在此多寫。

```js
function bucketSort(array, bucketCount = 10) {
  const buckets = Array.from({length: bucketCount}, (_) => [])
  const min = Math.min(...array)
  const max = Math.max(...array)
  const rage = (max - min) / bucketCount

  for (let i = 0; i < array.length; i++) {
    const index = Math.floor((array[i] - min) / rage)
    if (index === buckets.length) {
      buckets[index - 1].push(array[i])
    } else {
      buckets[index].push(array[i])
    }
  }
  for (let i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i])
  }

  return buckets.reduce((result, bucket) => {
    while (bucket.length) {
      result.push(bucket.shift())
    }
    return result
  }, [])
}
```

要注意的是最大值拿到的 Index (`const index = Math.floor((array[i] - min) / rage)`) 會剛好大於桶子的 Index ，所以額外做了判斷。

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|---|---|---|---|
| O(n+k) | O(n+k) | O(n²) | O(n+k) |

> K 為桶子數量

最好的情況是分散完之後，每個桶子都只有一個元素，此時只需分散與合併，兩個動作。分散需遞迴資料所以是 n ，而合併需要遞迴桶子所以是 k。

平均情況可以查看[維基](https://en.wikipedia.org/wiki/Bucket_sort)的 Average-case analysis ， 得出 O(n + n²/k + k ) ，在 k 接近於 n 的情況下， 簡化成 O(n+k) 或是 O(n) 。

最差的情況則是資料都集中在同一個桶子內，照成純粹看**排序**步驟使用的算法最差的情況，故為 n² 。

空間複雜度則是建了 k 個桶子並回傳 n 大小的排序好的陣列回去。

## Conclusion

通常使用 Bucket Sort 時會預期這些未排序的資料的值是平均散佈的，不然最差的情況是所有資料都在同一個桶子內，這樣就沒有分桶子的意義了。
