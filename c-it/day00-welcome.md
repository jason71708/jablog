<!-- Day 0 歡迎來到刷題峽谷 - Algorithms & Data Structures -->

> 本系列將使用 JavaScript 來撰寫程式，文中也會穿插英文讓讀者盡量熟悉這些單詞，未來在看相關題目時能夠幫助理解。

## 什麼是演算法與資料結構

演算法指的是一系列的運算步驟，為的是解決特定問題。
例如要算出目前購物車金額有無達到滿 3000 免運的資格，會先將購物車內的商品金額做相加，再比對是否大於等於 3000。
這簡短的流程表示就是演算法，一步步操作、運算，接著給出想要的結果。

資料結構是資料在電腦中儲存、組織的方式，如 JavaScript 中的物件與陣列都是一種資料結構。
不同的資料結構會有不一樣的操作方法，例如陣列有 `push` 、 `forEach` 、 `map` 等等方法，但是物件卻沒有。

每種資料結構都有其優缺點，根據不同情況選用適合的資料結構與演算法就是優秀軟體工程師的必要條件啦。

## 為啥要學

萬年不變的老題目，幾乎每屆鐵人賽都會有的系列，一定有其重要程度。

比喻來說就是練基本功，現在網站前端工具與框架百花齊放的時代，這些工具與框架都大大幫助我們能專注在寫業務邏輯上，但是當工具或框架本身不足以應付業務需求需要自造工具或從底層開始撰寫相關邏輯時，這時基本功的價值就出來了。

也跟讀者分享以前一位資深工程師在當我的 Metor 時給我的一句話：

*Learn things with a longer lifetime, e.g. computer science > programming language > library > framework*

網站前端十年前都用 JQuery ，現在是 Vue 、 React 甚至還有更新的 Svelte 、 Preact 。
程式語言也是每隔幾年就會有新的誕生，撰寫後端的語言從以前到現在也多了很多選擇。

相對來說電腦科學本身是基礎，是不太會變動的，現今那些大型科技公司所用的演算法等等也都是從這些基礎延伸、優化而來。

因此這塊的投資報酬率不覺得很高嗎XD ，學一套用到老欸。

~~還有，面試會考。~~

## 本系列大綱

### 從鐵牌爬起
- [Day 1 這到底是什麼符號喔齁齁齁齁齁 - Big O Notation](https://ithelp.ithome.com.tw/articles/10288453)
- [Day 2 哎呀這什麼水平 - 時間與空間複雜度](https://ithelp.ithome.com.tw/articles/10292419)
- [Day 3 好用兩件套 - 物件與陣列的時間與空間複雜度](https://ithelp.ithome.com.tw/articles/10293886)
- [Day 4 BO5-1 - Frequency Counter](https://ithelp.ithome.com.tw/articles/10294036)
- [Day 5 BO5-2 - Multiple Pointers](https://ithelp.ithome.com.tw/articles/10294084)
- [Day 6 BO5-3 - Sliding Window](https://ithelp.ithome.com.tw/articles/10296153)
- [Day 7 BO5-4 - Divide and Conquer](https://ithelp.ithome.com.tw/articles/10296157)
- [Day 8 BO5-5 - Recursion](https://ithelp.ithome.com.tw/articles/10296158)

### 金銀銅牌本一家
- [Day 9 極速上分 - Linear Search & Binary Search](https://ithelp.ithome.com.tw/articles/10296159)
- [Day 10 還敢下來啊 - Bubble Sort](https://ithelp.ithome.com.tw/articles/10294082)
- [Day 11 選我選我選我選我 - Selection Sort](https://ithelp.ithome.com.tw/articles/10298928)
- [Day 12 我的回合，抽卡！！！ - Insertion Sort](https://ithelp.ithome.com.tw/articles/10298937)
- [Day 13 只會往前絕不後退 - Singly Linked List](https://ithelp.ithome.com.tw/articles/10298945)
- [Day 14 左右開通 - Doubly Linked List](https://ithelp.ithome.com.tw/articles/10298946)
- [Day 15 先進後出 - Stack](https://ithelp.ithome.com.tw/articles/10300208)
- [Day 16 先進先出 - Queue](https://ithelp.ithome.com.tw/articles/10300209)

### 白金上鑽石之路
- [Day 17 切出去合進來 升職發大財 - Merge Sort](https://ithelp.ithome.com.tw/articles/10300778)
- [Day 18 快還要更快 - Quick Sort](https://ithelp.ithome.com.tw/articles/10301442)
- [Day 19 排序新理解 - Radix Sort](https://ithelp.ithome.com.tw/articles/10303968)
- [Day 20 你會分類你要先講 - Bucket Sort](https://ithelp.ithome.com.tw/articles/10304456)
- [Day 21 超硬 Tree 登場 - Binary Search Tree](https://ithelp.ithome.com.tw/articles/10304503)
- [Day 22 這篇若...不看...財哥也...感嘆... - Tree Traversal](https://ithelp.ithome.com.tw/articles/10305480)
- [Day 23 - Tree Sort](https://ithelp.ithome.com.tw/articles/10305481)
- Day 24 - Binary Heap
- Day 25 - Priority Queue
- Day 26 - Heap Sort
- Day 27 - Hash Table

### 大師
- Day 28 - Graph
- Day 29 - Graph Traversal
- Day 30 - Dijkstra's Algorithm
- Day 31 - Dynamic Programming
- Day 32 - Counting Sort
- Day 33 - Shell Sort

### 邁向菁英
- Day 34 - Timsort
- Day 35~

原則上 Day 30 之後會不定期更新，盡量把這系列重要的東西都涵蓋到，以下圖為準。

![algorithm cheat sheet](https://www.bigocheatsheet.com/img/big-o-cheat-sheet-poster.png)

*其實本人沒有在打 LOL ，只有看 YT 的實況精華而已哈哈。*
