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
