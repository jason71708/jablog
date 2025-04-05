---
title: 'Topological Sorting'
tags:
  - algorithms
keywords: [algorithms, 演算法]
---

## Fundamental

Topological Sorting (拓撲排序) 是一種排序算法，只適用於有向無環圖 (DAG) 的排序，使用 [DFS](../03-data-structures/11-graph-traversal.md#depth-first-search---inorder) 來進行排序。

有向無環圖 (DAG) 是一種有方向的圖，其中沒有任何迴圈。

對於 Graph 的介紹可以參考 [Graph](../03-data-structures/10-graph.md) 這篇。

![DAG](./DAG.jpg)

此類型的 Graph 使用場景像是工作流程、選修課程安排、任務排程等等，以課程安排為例：其中每個節點代表一個課程，而每個邊代表課程間的依賴關係，例如需要先修完課程 A 和 B 才能選修課程 C。

而和一般直接使用 [DFS](../03-data-structures/11-graph-traversal.md#depth-first-search---inorder) 來進行排序不同的是，Topological Sorting 排序的結果是有方向依賴性的，例如課程 A 和 C 的依賴關係是 A -> C，則在排序結果中，A 必須出現在 C 之前，而 A 與 B 之間沒有依賴關係，所以 A 和 B 的順序可以互換，這也代表 Topological Sorting 的結果可能不只有一種。

## Implementation

首先我們需要先建立一個 Graph 的資料結構，並且記錄每個節點的相鄰節點。

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
  }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
```

再來我們遍歷 Graph 的每個節點，並且使用 [DFS](../03-data-structures/11-graph-traversal.md#depth-first-search---inorder) 來進行排序，每個訪問過的節點會標記為 `true`，並且將訪問過的節點放入 Stack 中。

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  topologicalSort() {
    const stack = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    for (const vertex in adjacencyList) {
      if (!visited[vertex]) {
        this.dfs(vertex, visited, stack);
      }
    }

    return stack.reverse();
  }

  dfs(vertex, visited, stack) {
    visited[vertex] = true;

    for (const neighbor of this.adjacencyList[vertex]) {
      if (!visited[neighbor]) {
        this.dfs(neighbor, visited, stack);
      }
    }

    stack.push(vertex);
  }
}
```

經過 `topologicalSort` 後，會回傳一個 Stack，Stack 中的元素就是 Topological Sorting 的結果。

```js
graph.topologicalSort();
// ['A', 'B', 'C']
```

而 `['B', 'A', 'C']` 也是一個正確的順序，因為 A 與 B 之間沒有依賴關係，但 A 和 B 必須在 C 之前。

回過頭來分析下，我們使用 DFS 來進行遍歷，並且訪問到最後沒有下一個節點時，我們才把當前的節點推入 Stack 中，所以 Stack 中越早被推入的節點，代表它的依賴關係越深，越晚被推入的節點，代表它的依賴關係越淺。

然後我們再將 Stack 反轉，就得到了 Topological Sorting 的結果。可以看到 `['A', 'B', 'C']` 是可行的一種順序，我們可以先修 A 課程，再修 B 課程，最後修 C 課程。

## Big O Complexity

| Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity | Space Complexity (Worst) |
| ---------------------- | ------------------------- | ----------------------- | ---------------- | ------------------------ |
| *O(V + E)*             | *O(V + E)*                | *O(V + E)*              | *O(V)*           | *O(V)*                   |

- V: 節點數量
- E: 邊數量

我們使用 DFS 來訪問所有節點與其邊(相鄰的下個節點)，所以總體來說時間複雜度為 `O(V+E)`。

空間複雜度方面，我們需要一個 `visited` 來記錄每個節點是否被訪問過，這裡空間複雜度為 `O(V)`，再來還需要一個 `stack` 來存放排序後的節點，這裡空間複雜度為 `O(V)`，所以總空間複雜度為 `O(V)`。

再下一個篇章我們會介紹 [Kahn's Algorithm](../02-algorithms/29-kahn-algorithm.md)，它會使用 BFS 來進行 Topological Sorting，時間複雜度為 `O(V + E)`，空間複雜度為 `O(V)`。

## Testcase

```js
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
console.log(graph.topologicalSort());
// ['B', 'A', 'C']
```
