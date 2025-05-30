---
title: 淺談對 AI 的看法
description: 本文將淺談筆者對 AI 的看法，以及筆者對於 AI 日後發展與影響人類生活的看法。
tags: [Engineering]
image: ./cover.png
---

![cover](./cover.png)

自從 2022 年 11 月 30 日，OpenAI 發布了 ChatGPT 以來，AI 就開始了爆炸性的成長。短短不到兩年的時間，各種 AI 模型如雨後春筍般湧現，而這些模型也逐漸影響了我們的生活。

<!--truncate-->

## Vibe Coding

在社群媒體最常看到的名詞，Vibe Coding 一詞最早是由一位 OpenAI 的共同創始人所提出的，他認為 Vibe Coding 是一種新的寫程式的方式，它強調的是寫程式的樂趣，而不是寫程式的效率。

### 軟體工程師將會被 AI 取代嗎?

看著一些非工程背景的人或是初學者也能靠著 AI 生成自己想要的應用或遊戲，讓人感覺工程師是不是將要被取代了？

我的看法是不太會，簡單來說我覺得 AI 本質就是輔助人類的一項工具，它不會取代人類，而是會輔助人類，讓人類能夠更有效率地完成工作。

目前 AI 模型強大的上下文推斷能力與豐富的知識庫，的確可以在短時間內大量產出程式碼，做些簡單的 Demo 或是小遊戲小工具上非常便利且門檻低，但如果是要做出一個複雜應用程式，其中包含許多商業邏輯，各種用戶交互，僅單靠 AI 來完成在目前是有點勉強。更別說實務上 PM 或客戶開的規格，可能本身就存在一些模糊不清的地方，還是得需要有經驗的軟體工程師來協助釐清需求，將需求轉換成更明確的規格，才能交由 AI 來自動生成。

## AI 在前端軟體開發中的應用

其實在 GitHub Copilot 剛發布時，就有去使用體驗看看，但是那時上下文的推斷能力還沒有現在這麼強大，使用上像是我現在要寫一個功能，它才會幫我生成，如果我沒有明確告訴它我要寫什麼，它就會不知道要幹嘛，所以中間停了一陣子沒繼續訂閱。
後來 Cursor 發布後，經同事推薦又開始使用，發現現在的上下文推斷能力越來越強大，甚至可以推斷出我接下來要幹嘛，這樣的體驗就蠻像 Vibe Coding 的，可以省下很多時間讓我專注在思考如何解決問題或是實作商業邏輯。

以我工作上的開發流程來說，AI 大大提升效率或是減少了許多重複性的工作，舉例以下但不限於：

### i18n 詞條生成

這個算是在前端開發中比較常見的，如果公司本身是做產品需要支援多國語言，一定很常需要為各種各樣的文案命名一個詞條 Key。以前都會為了命名花時間去想，現在可以交由 AI 來生成，只要給個命名規範與文案就好。

### 規格與型別定義

在串接 API 時，常常需要定義 API 回傳資料的規格與型別，現在可以根據後端提供的 API 文件，交由 AI 來生成。

### 生成程式碼片段 (boilerplate 生成)

在前端開發時，常常需要重複撰寫一些程式碼片段，例如 React 的 `useEffect` 或是 `useState` 等等，抑或是寫通用元件時可以給定規格與型別，交由 AI 來生成。

### 程式碼注釋

現在 AI 強大的前後文推斷並生成相對應的內容，讓寫注釋這件事易如反掌。

### 生成單元測試

一樣也是因為前後文推斷的能力，丟給 AI 一段程式碼就行。

### 生成開發小工具

這個算是節省最多時間的一項，以前常常需要為了開發一些小工具，而花時間去看文件或是範例，現在只要丟給 AI 一段描述，它就會生成一個小工具。我要做的就只剩測試這個小工具是否符合需求而已。(也蠻接近 Vibe Coding 的概念?)

### 推斷程式碼意圖

其實上面幾項都能歸類到這裡，推斷程式碼意圖，像是寫一個彈窗組件時，只要我們命名好組件名稱，AI 大概就能知道我們接下來要幹嘛而生成彈窗組件。或是寫一個 Submit 方法時，AI 就能從當前檔案的上下文拿表單資料，並且幫我們寫好 API 請求。

## 我理想中的 AI 對於各種產業的幫助

大抵上還是圍繞在減少許多重複性的工作，讓人類能夠更專注在創造或是思考解決問題的方案這些更有價值的事情上面。

AI 訓練方式簡言之就是餵給模型大量的資料，讓模型能夠學習到資料的特徵。例如給它很多張相同繪師的圖片，它就能學會繪師的風格，並且生成出與其風格類似的圖樣，抑或是給它很多關於這家公司的產品服務資訊與相關的 Domain knowhow，它就能夠幫助實時回答客戶的問題。

> 先聲明我覺得目前訓練 AI 模型的資料，還是有道德與法律上的問題，畢竟很多被用來訓練 AI 模型的資料，都是未經過原作者授權的，只是目前 AI 模型發展過於快速，法律還沒來得及跟上來。

## 工具是為了降低門檻

舉個例子，計算機的出現，讓我們不再需要花時間在白紙上計算才能得到答案，花不了幾秒鐘也能完成複雜的運算。

同理，AI 的出現也降低許多門檻，族繁不及備載，以下列舉幾個例子：

### 繪圖

這裡指的是一些比較簡單的，像是早餐店菜單想要設計稍微漂亮點，對於沒有美感或是相關背景的人可以描述想要的樣子交由 AI 來生成，或是像這個部落格的文章封面圖也是由 AI 產生的。

### 文案

像筆者是屬於文筆較不好的人，以前寫正式的文件或是報告，常常需要花很多時間去潤飾，現在有了 AI 可以幫助處理那些繁瑣的部分，讓我們可以更專注在內容的撰寫上。

### 程式碼

非工程背景的人也能透過描述想要的功能，交由 AI 來生成小工具應用程式，來提升團隊或是自己的工作效率。

### 知識庫

之前有看到一種模型是可以幫人們讀完一本書、文章或是研究報告，並且能夠給出摘要，這樣的模型可以幫助人們節省時間快速了解內容，吸收這些精華知識，而有不懂的地方也能和 AI 回答，相當於有個專屬的知識庫。

## 結語

AI 的出現，的確讓許多事情變得更加方便，進一步改變了人們的工作方式，但同時也帶來許多挑戰，像是 AI 模型訓練資料來源授權的問題，以及 AI 模型可能會帶來的負面影響，例如隱私問題以及 AI 模型被惡意濫用導致政治傾向某個方向 (模型偏見) 等等。
