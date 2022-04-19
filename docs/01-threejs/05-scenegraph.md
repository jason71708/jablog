---
title: 'Scenegraph'
tags:
  - threejs
keywords: [threejs]
---

> 此筆記對應[官方文件 Scenegraph 章節](https://threejs.org/manual/#en/scenegraph)。

像瀏覽器的 [DOM tree](https://javascript.info/dom-nodes) 最上層是 `Document` 與 `HTML` 一樣，在 Three.js 環境中，`Scene` 就是根元素，其他物件都是被加在 `Scene` 底下呈現樹狀結構。

![scene-graph](https://threejs.org/manual/resources/images/scenegraph-generic.svg)

## Key point

這篇官方文件中最主要的重點是**父層的縮放與旋轉等等變化都會影響其子層物件**，就像 `div` 放大 10 倍然後旋轉，`div` 裡的元素也會跟著縮放和旋轉一樣。

而文中為了模擬太陽系內行星自轉與公轉，多加了 `solarSystem`、`earthOrbit`、`moonOrbit`，來模擬公轉，而自轉由行星物件本身轉動。

## emissive

`MeshPhongMaterial` 有個 `emissive` 屬性可以設置顏色，當沒有光源照該物件時，它本身會呈現 emissive 的顏色。

```js
const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
```

## AxesHelper

此 Helper 物件加進要觀察的物件裡面後就可看到該物件 X Y Z 軸的輔助線。

```js
const axes = new THREE.AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 1;
object.add(axes);
```

這邊要注意 `axes.material.depthTest = false;` 這段，`depthTest` 用來決定被其他物件擋到時不要繪製，預設是 `true`，我們改成 `false` 讓 `AxesHelper` 就算位置在物件中心被遮蓋還是要繪製出來。

而 `renderOrder` 決定繪製的順序，預設是 `0`，數字越大越後面被繪製，越晚繪製的其圖層會在上面。

上面兩個設置是確保 `AxesHelper` 能顯示出來。

## AxisGridHelper

這段實作了 `AxisGridHelper` class 方便同時顯示 X Y Z 軸的輔助線與網格平面，

> 看到 `AxisGridHelper` 段落可發現，我們若在模擬介面打開 `earthOrbit`、`moonOrbit` 會發現兩個旋轉是一樣的，個人覺得 `moonOrbit` 有點多餘，因為為了模擬地球繞太陽公轉，所以我們建了 `solarSystem` 物件然後把太陽與地球加進去，為了模擬月球繞地球公轉，所以我們建了 `earthOrbit` 把地球與月球加進去，但沒有東西要繞著月球，所以 `moonOrbit` 這層可以不用，但如果要加隕石(?)之類的繞著月球公轉，`moonOrbit` 就需要了 XD。

## Practice - Tank & Target

在官方實作範例中我們挑幾個實用的片段來講解：

### Scene Graph

![tank-scene-graph](https://threejs.org/manual/resources/images/scenegraph-tank.svg)

範例中將坦克各個部件拆分，尤其 `target` 部分更拆了許多層，每層都只負責一種變化狀態，像 `targetBob` 就只做 Y 軸的上下移動。這樣能讓物件本身專注在自己的行為，其他交由父層 (範例中使用很多 `THREE.Object3D`) 來處理。像坦克的輪子本身就只做 X 軸旋轉，整體坦克沿著曲線移動，其子層的輪子也會沿著曲線移動。

### Time

requestAnimationFrame 會將一個 [timestamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) 帶入我們傳入的 callback function 中，此 timestamp 等同於呼叫 [`performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) 所得到的結果。

我們可以用此 timestamp 做些動畫效果，例如：

旋轉或移動

```js
targetOrbit.rotation.y = timestamp * .27;
targetBob.position.y = Math.sin(timestamp * 2) * 4;
```

隨機顏色
```js
targetMaterial.emissive.setHSL(time * 10 % 1, 1, .25);
targetMaterial.color.setHSL(time * 10 % 1, 1, .25);
```

### Curve

新建一個曲線

```js
const curve = new THREE.SplineCurve( [
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( -5, 5 ),
  new THREE.Vector2( 0, 0 ),
  new THREE.Vector2( 5, -5 ),
  new THREE.Vector2( 10, 0 ),
  new THREE.Vector2( -10, 0 ),
] );
```

將此曲線切分成多個等距離的點並取得這些點

```js
const points = curve.getPoints( 50 );
// [{ x: -10, y: 0 }, { x: -9.7025, y: 0.3425 }, ...]
```

使用 `THREE.BufferGeometry` 的 `setFromPoints` 與 `THREE.LineBasicMaterial` 將此曲線繪製出來

```js
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color : 0x0000ff } );
const splineObject = new THREE.Line( geometry, material );
```

使用 `curve.getPoint(number, vector)` 給定 0 ~ 1 之間的數字與座標物件，會將曲線上的座標寫入到座標物件內。然後我們可以用 timestamp 來給定數字取得目前座標來讓坦克移動。

```js
const tankPosition = new THREE.Vector2();
const tankTime = timestamp * .05; // 這邊之所以要乘 0.05 是因為原本移動速度會太快。
curve.getPointAt(tankTime % 1, tankPosition); // % 1 代表將整數位都去掉，只剩小數位來符合參數條件。
tank.position.set(tankPosition.x, 0, tankPosition.y);
```

### Camera

我們也能根據 timestamp 變化來切換各個 `camera` 的視角

```js
const cameras = [
  { cam: camera, desc: 'detached camera', },
  { cam: turretCamera, desc: 'on turret looking at target', },
  { cam: targetCamera, desc: 'near target looking at tank', },
  { cam: tankCamera, desc: 'above back of tank', },
];

...

const camera = cameras[time * .25 % cameras.length | 0]; // 乘 0.25 來減慢速度， | 0 這段是為了去掉小數點
renderer.render(scene, camera.cam);
```

> 範例中還有 `shadow` 相關的設置就留到後面章節統一解說。
