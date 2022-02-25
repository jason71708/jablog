---
title: 'Responsive Design'
tags:
  - threejs
sidebar_position: 3
keywords: [threejs]
---

> 此筆記對應[官方文件 Responsive Design 章節](https://threejs.org/manual/#en/responsive)。

在有些情況，`canvas` 的長寬會變動，這時候 Camera 的 `aspect` 就需要更新，以保持畫面的比例。

例如側邊欄開起來，原本滿版的 `canvas` 分一些空間給側邊欄後， `canvas` 的寬當然會變短，這時就需要更新畫面比例。

我們可以在上章節寫到的 `render` 函式內加進：
```diff
function render(time) {
  // Emit...

+ const canvas = renderer.domElement;
+ camera.aspect = canvas.clientWidth / canvas.clientHeight;
+ camera.updateProjectionMatrix();

  // Emit...
}
```

這邊的 `updateProjectionMatrix` 是告訴 camera 要更新它的投影矩陣 (frustum)。

## Canvas's internal size
`canvas` 在 css 中設置的長寬就跟一般元素一樣影響在頁面上的大小。

`canvas` 還有個 internal size ，是它畫布的像素。

像是 PNGs 或 JPEGs 的圖片大小 150x150 pixel，但在 CSS 中設置它大小為 `width: 300px; height: 150px` 那樣。

那麼 `canvas` 的 CSS 與 internal size 該怎麼設比較好？

答案是保持一致。

```js
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth; // css 設的
  const height = canvas.clientHeight; // css 設的
  const needResize = canvas.width !== width || canvas.height !== height;
  // `canvas.width` & `canvas.height` is internal size
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
```

上述範例在檢查若是目前 internal size 跟 CSS 設的不一樣的話就更新。

`renderer.setSize` 最後參數帶 `false` 是因為預設 (`true`) 它會將 `canvas` 樣式大小設的跟 internal size 一樣，但這邊我們已經讓 internal size 更新變得跟 `canvas` 樣式大小一樣了，不需多此一舉，所以設 `false`。

