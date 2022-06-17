---
title: 'Graph Traversal'
tags:
  - data structures
keywords: [data structures, 資料結構]
---

## Introduction

當要取得、更新、檢查 Graph 裡所有的節點時就會需要用到 Traversal 方法，常見的使用場景為點對點的網際網路、網站爬蟲、導航、迷宮問題或遊戲類的 AI 。

如同 [Three Traversal](./06-tree-traversal.md) 有 DFS 與 BFS ， Graph Traversal 也有 Depth First 和 Breadth First 兩種的遍歷方法。

## Depth First Graph Traversal

由於 Graph 並沒有特定的根節點，所以遍歷的起始節點是哪個都可以。

Depth First 的規則是從起始節點開始往相鄰的節點查訪，到下一個節點時再往下一個節點相鄰的節點繼續查訪，有點像深入尋找的意思。

假設我 FB 好友有個叫 Jason ， Jason 有個好友叫 Ken ， Ken 有個好友叫 Alex 和 Ray......，照這樣遍歷下去，至於說如果相鄰的節點有超過一個的話，選哪個都可以。

當沒有相鄰節點時就回到上個節點去看還有沒有沒訪問過的相鄰節點，以此類推，直到回到起始節點。

### DFS Recursive

和 Three Traversal 的 [DFF](./06-tree-traversal.md#depth-first-search---inorder) 一樣，使用到了[遞迴](../02-algorithms//09-recursion.md)的技巧。

從起始節點開始訪問，訪問過的節點放入 Result 陣列內，然後遍歷該節點的相鄰的節點 (`forEach(adjacencyList)`) ，遍歷時，訪問第一個節點後再遍歷該節點的相鄰的節點，以此遞迴下去。

避免遍歷到訪問過的節點，我們還需定義一個 Visited 的物件，已訪問過的節點當作 Key ，值設 `true` 。

```js
depthFirstRecursive(start){
  const result = []
  const visited = {}
  const adjacencyList = this.adjacencyList

  function dfs(vertex){
    if(!adjacencyList[vertex]) return
    visited[vertex] = true
    result.push(vertex)
    adjacencyList[vertex].forEach(neighbor => {
      if(!visited[neighbor]){
        dfs(neighbor)
      }
    })
  }
  dfs(start)

  return result
}
```
