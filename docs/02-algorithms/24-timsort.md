---
title: 'Timsort'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

Timsort 是由 Tim Peter 結合 [Merge Sort](./15-merge-sort.md) 與 [Insertion Sort](./14-insertion-sort.md) 改良所設計出來的。

目前很多程式語言內部實作的 sort() 都採用 Timsort ， Javascript 的 V8 引擎也改用 Timsort 。 (原本是用 [Quick Sort](./16-quick-sort.md) 搭配 Insertion Sort)

Timsort 用了許多方式優化原本的 Merge Sort 讓其依據各種情況下採用不同的策略進行排序演算。

以下先講解簡單版本的。

## Fundamental

首先，Timsort 也採取了切分區塊的方式將一組資料切小塊，這邊統稱一個區塊為 **run** 。

但不像 Merge Sort 切成最終每個 run 一個或零個， Timsort 有設 `MIN_MERGE` 的常數來動態計算這筆陣列應該切成大小多少。通常 `MIN_MERGE` 會設 16 或 32 。

```js
function minRunLength(n)
{
  // Becomes 1 if any 1 bits are shifted off
  let r = 0;
  while (n >= MIN_MERGE)
  {
    r |= (n & 1);
    n >>= 1;
  }
  return n + r;
}
```

以上簡單來說就是會將陣列長度 n 不斷除以 2 直到小於 `MIN_MERGE` 來算出一個 run 要多少個。

假設輸入共有 128 個元素的陣列， `minRunLength()` 算完後得出一個 run 是 16 大小。

接著將資料分組， Index 0 ~ Index 15 一組， Index 16 ~ Index 31 一組，以此類推。

此時每個 run 用 Insertion Sort 排序。

目前每個 run 都是排序過的，接下來要把他們合併起來。

合併策略就和 Merge Sort 使用的一樣，接著就一直倆倆合併直到併成一個。

## Timsort Implementation - Simple ver.

```js
// Javascript program to perform TimSort.
let MIN_MERGE = 32;

function minRunLength(n)
{
	// Becomes 1 if any 1 bits are shifted off
	let r = 0;
	while (n >= MIN_MERGE)
	{
		r |= (n & 1);
		n >>= 1;
	}
	return n + r;
}

// This function sorts array from left index to
// to right index which is of size atmost RUN
function insertionSort(arr,left,right)
{
	for(let i = left + 1; i <= right; i++)
	{
		let temp = arr[i];
		let j = i - 1;
		
		while (j >= left && arr[j] > temp)
		{
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = temp;
	}
}

// Merge function merges the sorted runs
function merge(arr, l, m, r)
{
	
	// Original array is broken in two parts
	// left and right array
	let len1 = m - l + 1, len2 = r - m;
	let left = new Array(len1);
	let right = new Array(len2);
	for(let x = 0; x < len1; x++)
	{
		left[x] = arr[l + x];
	}
	for(let x = 0; x < len2; x++)
	{
		right[x] = arr[m + 1 + x];
	}

	let i = 0;
	let j = 0;
	let k = l;

	// After comparing, we merge those two
	// array in larger sub array
	while (i < len1 && j < len2)
	{
		if (left[i] <= right[j])
		{
			arr[k] = left[i];
			i++;
		}
		else
		{
			arr[k] = right[j];
			j++;
		}
		k++;
	}

	// Copy remaining elements
	// of left, if any
	while (i < len1)
	{
		arr[k] = left[i];
		k++;
		i++;
	}

	// Copy remaining element
	// of right, if any
	while (j < len2)
	{
		arr[k] = right[j];
		k++;
		j++;
	}
}

// Iterative Timsort function to sort the
// array[0...n-1] (similar to merge sort)
function timSort(arr, n)
{
	let minRun = minRunLength(MIN_MERGE);
		
	// Sort individual subarrays of size RUN
	for(let i = 0; i < n; i += minRun)
	{
		insertionSort(arr, i, Math.min(
			(i + MIN_MERGE - 1), (n - 1)));
	}

	// Start merging from size
	// RUN (or 32). It will
	// merge to form size 64,
	// then 128, 256 and so on
	// ....
	for(let size = minRun; size < n; size = 2 * size)
	{
		
		// Pick starting point
		// of left sub array. We
		// are going to merge
		// arr[left..left+size-1]
		// and arr[left+size, left+2*size-1]
		// After every merge, we
		// increase left by 2*size
		for(let left = 0; left < n;
						left += 2 * size)
		{
			// Find ending point of left sub array
			// mid+1 is starting point of right sub
			// array
			let mid = left + size - 1;
			let right = Math.min((left + 2 * size - 1),
									(n - 1));

			// Merge sub array arr[left.....mid] &
			// arr[mid+1....right]
			if(mid < right)
				merge(arr, left, mid, right);
		}
	}
}
```

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|---|---|---|---|
| O(n) | O((n log(n)) | O(n log(n)) | O(n) |

最好的情況就是資料已經排序過，所以是 [Insertion Sort](./14-insertion-sort.md) 的比對的 n，加上合併時的所需的 n-1，簡略成 **O(n)** 。

而其他大部分情況下，合併兩個 run 時需要再做比對排序，所以和一般的 Merge Sort 一樣都是 **O((n log(n))** 。

而 Timsort 合併時需要額外的空間所以空間複雜度為 **O(n)** 。

## Real World Timsort

現在講複雜版本，上段有提到 Timsort 用許多方式優化來讓其依據各種情況下採用不同的策略進行排序演算。

### Ascending 升冪

假設有兩組 run 長這樣：

`[11, 21, 31, 41, 51, 9], [5, 4, 3, 2, 1, 9]`

考慮到有部分元素已經排序好的情況，我們在排序時可以加上觀察一連串元素目前是升序還是降序，是降序的話則原地反轉 (in-place)。就不會像一般 Insertion Sort 遇到降序時會一個個往前交換順序，多了很多操作時間。

### `merge_collapse`

Timsort 會用 [Stack](../03-data-structures/03-stack.md) 來暫存 run ，並用 `merge_collapse` 的函式合併。

策略如下：

1. A > B + C
2. B > C

當目前 3 個 run 的大小符合以上條件時，A 會被丟進另個 Stack 中，接著從舊的 Stack 取出前三個 B 、 C 、 D 繼續比對。

不符合上述條件時則會判斷 A 、 C 大小，小的跟 B 合併，之所以只跟 B 合併是為了保持 Stable 順序，所以只能相鄰合併。

所以當 A:30 B:20 C:10 時，最後會是 A:30 B+C:30 。

而此策略在於平衡每個 run 的大小，使合併能更有效率。假設目前幾組 run 的數量長這樣：128, 64, 32, 16, 8, 4, 2。

前面那幾個都會被丟進 Stack 中，直到 8、4、2 最後一組，最後變 8、4+2。

Stack 是先進後出，所以接著合併回來會變成：

1. `6 8 16 32 64 128`
2. `14 16 32 64 128`
3. `30 32 64 128`
4. `62 64 128`
5. `126 128`
6. `254`

可以看出能此合併策略可以使每個 run 更平均，不會有 2 與 128 合併這樣沒效率的行為出現。

### `gollaping mode`

而兩個 run 合併時，一般 Merge Sort 所用的方法稱為 `one-pair-at-a-time` 。

但在合併時，兩個 run 都是排序好的。假設如下：

`A: [3, 7, 11, 12, 13, 31, 45, 221]` 、 `B: [21, 22, 24, 24, 29, 1000]`

此時可以觀察到其實 `3, 7, 11, 12, 13` 可以直接整組排在 B 的前面。

所以 Timsort 有個 `gollaping mode` 的合併演算，去觀察 run 的第一個元素是排列在另個 run 的哪個位置，像上例 B[0] 的大小是在 A[4] 和 A[5] 中間，所以可以說 A[0] ~ A[4] 的元素全都小於 B[0]。

另外合併時 Timsort 也會建立一個暫存的陣列，大小時兩個 run 取最小長度，並將較小的 run 放進暫存陣列內：

```
A: [] B: [21, 22, 24, 24, 29, 1000]
temp: [3, 7, 11, 12, 13, 31, 45, 221]
```

像上面所說，A[0] ~ A[4] 都小於 B[0] 所以可以整段放回去：

```
A: [3, 7, 11, 12, 13] B: [21, 22, 24, 24, 29, 1000]
temp: [31, 45, 221]
```

接著換 temp[0] 比對，大於 B[4]，小於 B[5]。

所以一樣整段放進去：

```
A: [3, 7, 11, 12, 13, 21, 22, 24, 24, 29] B: [1000]
temp: [31, 45, 221]
```

以此類推。

但實際情況可能不會都那麼剛好，當元素都沒有剛好整組可排列時 `galloping mode` 會比 `one-pair-at-a-time mode` 還耗時間，所以 Timsort 還有個固定參數 `MIN_GALLOP=7` 與變數 `minGallop=MIN_GALLOP` 去決定要用哪個模式 ，一開始使用 `one-pair-at-a-time mode` ，一直遇到第一個元素大於另個 run 多個元素時會改用 `galloping mode` 。

假設 A[0] 在 B[9] 與 B[10] 中間，此時找到的位置是 9 ，大於 `minGallop` 會採用 `galloping mode` 否則使用 `one-pair-at-a-time mode`。

而一直使用 `galloping mode` 則還會降低 `minGallop` 的值，使其更容易觸發 `galloping mode` 。

### `galloping search`

使用 `galloping mode` 時會需要查找 A[0] 的元素排序在 B[0] 的哪個位置，這時除了 [Binary Search](./11-binary-search.md) 之外， Timsort 還使用了 `galloping search` (expotential search) 。

`galloping search` 使用 `(2^k)th` 方式查找元素，也就是 1, 3, 7, 15, 31 的順序方式。

而作者有列出 `galloping search` 對比 `linear search` 與 Binary Search 的計算花費，得出 Index = 7 之前 `galloping search` 會需要更多的比較次數，所以 `MIN_GALLOP` 預設是 7。大於等於 7 才使用 `galloping search` 。

## Timsort Implementation

以下提供其他人已經實作好的程式碼：https://github.com/mziccard/node-timsort/blob/master/src/timsort.js

作者原文：https://bugs.python.org/file4451/timsort.txt
