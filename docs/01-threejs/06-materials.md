---
title: 'Materials'
tags:
  - threejs
keywords: [threejs]
---

> 此筆記對應[官方文件 Materials 章節](https://threejs.org/manual/#en/materials)。

## Color
顏色輸入支援多種格式：
- `0x00FFFF`
- `'red'`
- `'rgb(255, 127, 64)'`
- `'hsl(180, 50%, 25%)'`
- `'#F00'`

## MeshBasicMaterial
此材質不被光源影響，之後提到的大多數材質都會被光源影響陰影、光澤、能見與否。

## MeshLambertMaterial
此材質只計算該幾何物件頂點的光影。

## MeshPhongMaterial
相比 MeshLambertMaterial，會計算每個 pixel 的光影，多了 `shininess` 參數可以設置，更貼近立體的光澤感。

## MeshToonMaterial
特色是陰影不是漸層，而是直接分色塊，像是卡通的風格。

## MeshStandardMaterial
用於顯示更貼近現實的材質。

與前面的 `MeshPhongMaterial` 不同，沒有 `shininess` 參數，但多了 `roughness` 與 `metalness`。

## MeshPhysicalMaterial
比 `MeshStandardMaterial` 多了 `clearcoat`, `clearCoatRoughness` 參數可以設置。(個人看起來像是烤漆的感覺)

## Rendering Performance
由快到慢：

`MeshBasicMaterial` ➡ `MeshLambertMaterial` ➡ `MeshPhongMaterial` ➡ `MeshStandardMaterial` ➡ `MeshPhysicalMaterial`

## Other materials
其他還有些特別用途的材質，有些不需要光源即有顏色深淺呈現。
`ShadowMaterial`, `MeshDepthMaterial`, `MeshNormalMaterial`, `ShaderMaterial`, `RawShaderMaterial`

## flatShading
預設是 `flase`，若開啟則會呈現幾何圖形的效果，忘了這視覺風格是什麼名稱，但我很喜歡這風格！

## side
多數的立體物件都只需渲染外層即可，因為內層看不到。

但如果是平面的物件則需要 `side: THREE.DoubleSide` 來渲染兩面，否則只有一側看得到。

## `material.needsUpdate`

如果 material 動態變更時情況是以下：
- `flatShading` 改動
- 無 texture 改成有 texture 或有 texture 改成無 texture

則需要設置 `needsUpdate` 告訴 Three.js 需要更新 material
```js
material.needsUpdate = true
```

## 補充
material 相關屬性可以到[官方](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)的線上編輯器操作，調各個參數看看效果差異!

其中 material 大都有的 `wireframe` 屬性也好用，用來觀看該物件的結構線。