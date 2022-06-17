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

從起始節點開始訪問，訪問過的節點放入 Result 陣列內，然後遍歷該節點的相鄰的節點，遍歷時訪問第一個節點後再遍歷該節點的相鄰的節點，以此遞迴下去。

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

### DFS Iterative

除了使用[遞迴](../02-algorithms//09-recursion.md)的方式實作，我們也可以不依賴 Call Stack 的機制，改用自己定義的 [Stack](./03-stack.md) 來實作。

一樣的概念，假設從 Jason 開始遍歷，先把 Jason 丟到 Stack 中等待遍歷，然後設迴圈：當 Stack 中還有節點時， Pop 取出來，放進 Result 陣列中，並遍歷當前節點的相鄰節點，將這些相鄰節點一一丟到 Stack 中等待遍歷，然後進入下一次迴圈，從 Stack 中取最後一個節點出來，繼續上述動作以此類推。(提醒一下 Stack 的規則是先進後出)

記得在遍歷時依然要把訪問過的節點記錄起來。

```js
depthFirstIterative(start){
  if (!this.adjacencyList[start]) throw new Error('Not a valid Vertex');
  const stack = [start]
  const result = []
  const visited = {}
  visited[start] = true

  while(stack.length){
    const currentVertex = stack.pop()
    result.push(currentVertex)

    this.adjacencyList[currentVertex].forEach(neighbor => {
      if(!visited[neighbor]){
        visited[neighbor] = true
        stack.push(neighbor)
      } 
    })
  }
  return result
}
```

上面的 DFS Iterative 比較不一樣的地方是遍歷相鄰節點的順序，由於我們是把相鄰節點一一丟進 Stack 中，故之後取出時會是從最後一個相鄰節點開始。

而 DFS Recursive 則是會先從第一個相鄰節點開始遞迴。

兩者最後輸出的結果，順序上會有不同，但都是屬於 DFS 的實作。

## Breadth First Graph Traversal

而 Breadth First 規則是從起始節點開始，先把起始節點的相鄰節點都遍歷一次之後，再從第一個相鄰節點開始，將第一個相鄰節點的相鄰節點都遍歷過一次，接著再換第二個相鄰節點的相鄰節點們，以此類推。

一樣假設我 FB 好友有 Jason 、 Lisa 、 Kevin 、 Jane ，會先遍歷完這些好友後，再從第一個 Jason 開始 ，遍歷 Jason 的所有好友，接著換第二個，遍歷 Lisa 的所有好友，...到 Jane 也遍歷完她的好友後，再從 Jason 的好友中的第一個好友開始遍歷他的所有好友，以此類推。

整體實作上和 Tree Traversal 的 [BFS](./06-tree-traversal.md#breadth-first-search) 差不多，使用到 [Queue](./04-queue.md) 的資料結構來實作訪問順序。

```js
breadthFirst(start) {
  if (!this.adjacencyList[start]) throw new Error('Not a valid Vertex');
  const queue = [start]
  const result = []
  const visited = {}
  visited[start] = true

  while(queue.length) {
    const currentVertex = queue.shift()
    result.push(currentVertex)

    this.adjacencyList[currentVertex].forEach(neighbor => {
      if (!visited[neighbor]) {
        visited[neighbor] = true
        queue.push(neighbor)
      }
    })
  }
  return result
}
```

## Test Case

以下附上一些測試程式碼：

```js
const g = new Graph();

g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")


g.addEdge("A", "B")
g.addEdge("A", "C")
g.addEdge("B","D")
g.addEdge("C","E")
g.addEdge("D","E")
g.addEdge("D","F")
g.addEdge("E","F")

console.log(g.depthFirstRecursive('A'))
console.log(g.depthFirstIterative('D'))
console.log(g.breadthFirst('D'))
```
