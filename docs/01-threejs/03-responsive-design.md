---
title: 'Responsive Design'
tags:
  - threejs
keywords: [threejs]
---

> 此筆記對應[官方文件 Responsive Design 章節](https://threejs.org/manual/#en/responsive)。

## Camera Aspect Ratio

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

## Rendering
所以在 `canvas` 大小變動時，除了長寬比要考慮到，還要考慮到 internal size 保持畫面比例與解析度正確。

綜合上述兩個原因，我們修改一下 `render` 函式：
```diff
function render(time) {
  // Emit...

+ if (resizeRendererToDisplaySize(renderer)) {
+   const canvas = renderer.domElement;
+   camera.aspect = canvas.clientWidth / canvas.clientHeight;
+   camera.updateProjectionMatrix();
+ }

- const canvas = renderer.domElement;
- camera.aspect = canvas.clientWidth / canvas.clientHeight;
- camera.updateProjectionMatrix();

  // Emit...
}
```

在瀏覽器重繪時，判斷是否需要更新 `canvas`，接著更新 `canvas` 的 internal size 與 Camera 的長寬比。

## Handling HD-DPI displays

在現今的顯示螢幕如 Apple Retina displays 技術使旗下產品都有高解析度的螢幕，同樣 1x1 pixel 的物理尺寸，在高解析度螢幕 (假設 Device Pixel Ratio 為 2) 下能顯示 4 CSS pixels，而在低解析度螢幕 (假設 Device Pixel Ratio 為 1) 下則只能顯示 1 CSS pixel。

關於 Device Pixel 與 CSS Pixel 可以參考[此篇講解](https://web.dev/codelab-density-descriptors/)。

假設我們設置一個 `img` 寬度為 250 pixels，那它在低解析度螢幕 (假設 Device Pixel Ratio 為 1)，最適合的原圖尺寸為 250 piexls，而在高解析度螢幕 (假設 Device Pixel Ratio 為 2)，最適合的原圖尺寸為 500 piexls。

回到 `canvas` 上，在上半段我們將它的 CSS 寬高與 internal size 設為同樣，在高解析度螢幕觀看下會略顯粗糙。所以為了顯示適合當前顯示器的畫面，我們有兩個方法可以處理：

1.
```js
renderer.setPixelRatio(window.devicePixelRatio);
```

`window` 物件本身有當前裝置的解析度可以取用，接著直接設置 `renderer` 的 pixel ratio。之後設置 internal size 後會自動乘上 `devicePixelRatio`。

2.
```js
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width  = canvas.clientWidth  * pixelRatio | 0;
  const height = canvas.clientHeight * pixelRatio | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
```

直接改 `canvas` 的 internal size。

第二個方法較為推薦，因為可以很清楚知道設了多少 internal size。在複雜的應用下，由於第一個方法是設完之後都會自動乘上，會比較難追溯到底現在的 internal size 是什麼。

請審慎評估是否要使用 `devicePixelRatio`，假設 `pixelRatio = 2`，那我們 Render 所需的 pixel 就會變 4 倍。在智慧型手機這類效能有限的裝置上，可能會跑不動太複雜的 3D 場景。
