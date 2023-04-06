---
title: 資深前端面試題庫
description: 此篇文章統整面試資深前端工程師時可能會遇到的考題，並加以統整。
tags: [frontend, interview]
image: ./cover.png
draft: true
---

![cover](./cover.png)

此篇文章收集些面試前端工程師時會遇到的高頻考題

<!--truncate-->

## 實作 debounce 函式

```js
const debounce = (fn, delay = 100) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
```

應用場景像是輸入 google 搜尋時打字停下後才會出現建議的搜尋關鍵字，減少前面還在打字輸入時就去打 API 取得搜尋關鍵字的消耗。

## 實作 throttle 函式

```js
const throttle = (fn, delay = 100) => {
  let timer = null;

  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  }
}
```

## 簡易實作 React.useState

```js
let states = [];
let setters = [];
let firstRun = true;

// React 使用指標去對應每個 useState 的東西，每次重新渲染時會將 cursor 重置為零，並依序回傳 state 與 setter
// 同理可套用到其他 React Hooks，這也是為何規定 hooks 需要定義在 functional component 的最頂端
let cursor = 0;

function createSetter(cursor) {
  return function setterWithCursor(newVal) {
    state[cursor] = newVal;
  };
}

export function useState(initVal) {
  if (firstRun) {
    state.push(initVal);
    setters.push(createSetter(cursor));
    firstRun = false;
  }

  const setter = setters[cursor];
  const value = state[cursor];
  cursor++;

  return [value, setter];
}
```

應用場景像是偵測網頁滾動這類會連續觸發多次的事件，用於減少函式的執行頻率。

> 本文會隨時間而不斷增加更新

<!-- 1. [Map vs Object](https://www.frontendinterviewhandbook.com/blog/javascript-object-vs-map): 此篇先舉出 `Object` 使用上的隱憂與缺點再介紹 `Map` 的出現，並撰寫了一些測試比較兩者在各種情況下的效能。 -->