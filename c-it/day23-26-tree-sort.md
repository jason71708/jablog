<!-- Day 23 極速解題 - Tree Sort -->

Tree Sort 簡而言之就是使用 Tree 結構來排序資料，建議先看資料結構篇章中的 [Binary Search Tree](https://ithelp.ithome.com.tw/articles/10304503) 和 [Tree Traversal](https://ithelp.ithome.com.tw/articles/10305480) ，再回來看這篇會很好理解。

## Fundamental

我們建立一個 Binary Search Tree ，並把要排序的陣列資料一個個加進去，因為要**按照大小順序**取出，所以要使用 DFS Inorder 遍歷樹中的節點。

## Implementation

這邊就沿用 Binary Search Tree 和 Tree Traversal 章節的函式與 Class ，不在此多寫。

```js
function treeSort(array) {
  const bst = new BinarySearchTree()
  array.forEach(n => bst.insert(n))
  return bst.depthFirstSearchInOrder()
}
```

非常簡潔，實作細節都在資料結構裡面了， Tree Sort 只是拿來使用。

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|---|---|---|---|
| *O(n log(n))* | *O(n log(n))* | *O(n²)* | *O(n)* |

Tree Sort 的時間複雜度部分，我們加入 *n* 個資料進 Binary Search Tree 中，每個 Insertion 動作需要 *O(log(n))* 所以普遍與最好的情況會是 *O(n log(n))*。

而 Insertion 動作最差的情況會是 *n* ，所以 Tree Sort 最差情況下的時間複雜度會是 *O(n²)* 。

Tree Sort 的空間複雜度部分，我們建立了一個 Binary Search Tree 並把 *n* 個資料加入進去，故需額外 *O(n)* 空間。
