<!-- Day 33 極致改良 - Shell Sort -->

Shell Sort 是 [Insertion Sort](https://ithelp.ithome.com.tw/articles/10298937) 的改良版，加入了間距 (Gap) 的概念將資料分成小區塊，將整組資料分組，每區塊用 Insertion Sort 比對排列，下輪間距變小再進行一次分組與比對，直到間距為 1 時比對完成即結束。

Gap 要設多少都可以，這邊使用 D.L Shell (Shell Sort 發明人)原先提出時使用的對半分 (length / 2) ，每輪反覆除以 2。

## Separate Element & Insertion Sort

以 `[9, 133, 567, 44, 21, 45, 11, 561]` 來說：

Gap = length / 2 = 4

分組如下：

|  9  |  133  |  567  |  44  |  21  |  45  |  11  |  561  |
|---|---|---|---|---|---|---|---|
|  9  |    |   |    |  21  |    |   |    |
|   |  133  |   |   |   |  45  |   |   |
|   |    |  567  |   |   |   |  11  |   |
|   |    |    |  44  |   |   |    |  561  |

每列 (row) 中的數字做比對，以上面來說就是 `9, 21` 一列、 `133, 45` 一列，以此類推。

每組用 [Insertion Sort](https://ithelp.ithome.com.tw/articles/10298937) 比對並交換位置後：

|  9  |  133  |  567  |  44  |  21  |  45  |  11  |  561  |
|---|---|---|---|---|---|---|---|
|  9  |    |   |    |  21  |    |   |    |
|   |  45  |   |   |   |  133  |   |   |
|   |    |  11  |   |   |   |  567  |   |
|   |    |    |  44  |   |   |    |  561  |

第一輪結果：

|  9  |  45  |  11  |  44  |  21  |  133  |  567  |  561  |
|---|---|---|---|---|---|---|---|

接續將 Gap 再次砍半變成 2

分組如下：

|  9  |  45  |  11  |  44  |  21  |  133  |  567  |  561  |
|---|---|---|---|---|---|---|---|
|  9  |    |  11  |    |  21  |    |  567  |    |
|    |  45  |    |  44  |    |  133  |    |  561  |

每組用 [Insertion Sort](https://ithelp.ithome.com.tw/articles/10298937) 比對後：

|  9  |  45  |  11  |  44  |  21  |  133  |  567  |  561  |
|---|---|---|---|---|---|---|---|
|  9  |    |  11  |    |  21  |    |  567  |    |
|    |  44  |    |  45  |    |  133  |    |  561  |

第二輪結果：

|  9  |  44  |  11  |  45  |  21  |  133  |  567  |  561  |
|---|---|---|---|---|---|---|---|

接續將 Gap 再次砍半變成 1，用 [Insertion Sort](https://ithelp.ithome.com.tw/articles/10298937) 比對後的結果：

|  9  |  11  |  21  |  44  |  45  |  133  |  561  |  567  |
|---|---|---|---|---|---|---|---|

## Implementation

```js
function shellSort( array ) {
  // Separating element by gap
  for ( let gap = Math.floor( array.length / 2 ); gap >= 1; gap = Math.floor( gap / 2 ) ) {
    // Iterating every element and comparing with it's previous element
    for ( let i = gap; i < array.length; i++ ) {
      let currentIndex = i;
      // If it founds need to swap, keep forward comparing until current element is bigger than previous element
      while ( currentIndex - gap >= 0 && array[ currentIndex ] < array[ currentIndex - gap ] ) {
        let temp = array[ currentIndex ];
        array[ currentIndex ] = array[ currentIndex - gap ];
        array[ currentIndex - gap ] = temp;
        currentIndex -= gap;
      }
    }
  }
}
```

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|---|---|---|---|
| O( n log(n) ) | O( n (log(n))² ) | O( n (log(n))² ) | O(1) |

整體而言複雜度概念上和 [Insertion Sort](https://ithelp.ithome.com.tw/articles/10298937) 相近，只是 Shell Sort 多加了 Gap 的概念做改良。

空間複雜度一樣都是 O(1)， 都使用原本輸入的陣列做原地排序 (in-place)。

時間複雜度的部分，若是在**快排序好的資料**上，最好的情況接近於 **log(n)** (總共幾輪 Gap 遞減) 乘上 **n** (每輪元素一一比對，但卻都沒有需要往前遍歷交換位置)。

大部分與最壞的情況下，每輪元素比對時會需要往前遍歷做交換，由於每輪比對後會保證其一部份的順序是正確的，故每輪每個元素遍歷時最多就是 **log(n)** 次，所以是 n log(n) 再乘上 log(n) 。
