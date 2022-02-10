---
title: 'Clean Architecture'
tags:
  - Architecture
sidebar_position: 1
keywords: [Architecture]
---

乾淨架構設計原則：
1. 內層不依賴外層
2. 外層應依賴於內層提供的抽象層，不應該依賴內層實作

![Uncle Bob's Clean Architecture Proposal](./CleanArchitecture.jpeg)
> Uncle Bob's Clean Architecture Proposal

由內而外來解讀

Entities：為解決Problem Domain建模後的結果。

Use Cases：可視為該系統所呈現的行為，或可以說是Business Rules。

Controller/Gateways/Presenters：則是隔離了最外層，也就是傳統的IO層。

UI/Web/Devices/DB/External Interface：一般來說，不一定是我們程式碼的一部分，而是該系統與外界交互作用的統稱。

簡潔架構特別強調分層解耦，即使要有耦合，也要讓負責對外IO的低層相依於Domain Model的高層。