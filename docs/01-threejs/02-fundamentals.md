---
title: 'Fundamentals'
tags:
  - threejs
sidebar_position: 2
keywords: [threejs]
---

> 此筆記對應[官方文件 Fundamentals 章節](https://threejs.org/manual/#en/fundamentals)。

Three.js 是使用 WebGL 畫出 3D 圖形。

WebGL 是 JavaScript 提供的 API，提供畫點、線、面，但這些操作太低層級，光是要畫出個正方體就需要非常多的程式碼，故 Three.js 透過封裝底層 WebGL 相關的邏輯，提供了更簡易的操作方式。

以下介紹 3D 環境中的**三劍客**:

## Scene
為了方便理解，Scene 譬喻成我們熟悉瀏覽器環境中的 `Document`，我們會將許多的 3D 物件都加在這個 Scene 底下，且會呈現樹狀結構。

為何是樹狀結構？

就像

```html
<div>
  <h1>Hello World!</h1>
</div>
```

我們寫個 CSS 屬性讓 `div` 移動時裡面的 `h1` 也會跟著動吧。

在 3D 環境中，有個人物移動，那它身上的器官像眼睛、鼻子、嘴巴等等的物件也都要跟著動，這就是稍後章節會提到的 [Scenegraph](./scenegraph)

## Camera
Camera 掌管 3D 環境中哪個範圍需要被畫在瀏覽器的 Canvas 上，好比我們眼睛就只能看到前方。

Camera 這個物件比較特殊，它可以不被加在 Scene 裡面，自己設置座標，好比設置在某個位置的監視器。

也可以被加在 Scene 裡面，就像人物眼睛，假設有個叫 `eyeCamera` 的 Camera 物件被加在 3D 眼睛物件底下，人物走動時，我們視角也會跟著動，就像第一人稱視角一樣。

## Renderer
負責渲染畫面。

需要給它 Scene 與 Camera，才能決定畫面是在什麼**場景**的哪個**視角**。

--------
其他重要物件：
## Mesh
Mesh 是由 Geometry 與 Material 組成，是一個基本的 3D 物件單位。

Geometry 與 Material 可以類比為 HTML 與 CSS 的關係，骨架與樣式。
只是 Material 是一定要給定的，只有 Geometry 會無法顯示。

創建 Material 時還能給定 Texture，給材質貼圖。

## Light
光源也是 3D 環境中非常重要的元素，它會影響 3D 物件在場景中的光影相關的渲染。

就像現實中有許多光源一樣，Light 也可以設置多組，也能給定顏色。

## Hello Cube!
Renderer 可以給定 canvas 元素，讓它繪製 3D 畫面在該地方，

```js
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});
```

Renderer 若沒給定 canvas 元素，它會產生一個，能動態 append 到網頁元素上。

```js
const renderer = new THREE.WebGLRenderer();
document.body.appendChild( renderer.domElement );
```

這邊用到的 `WebGLRenderer` 是使用最新的 WebGL 版本的渲染物件，舊版的是 `WebGL1Renderer` ，其使用 WebGL 1。
未來若有新的 WebGL 版本的話，也許會有 `WebGL2Renderer` 或 `WebGPURenderer`。

Camera 需要給定下列參數：
- `fov`: 想像成眼睛上下範圍的角度，眯眼與睜大眼睛的差別。
- `aspect`: 代表畫面的長寬比，通常會使用當前瀏覽器視窗的 `window.innerWidth / window.innerHeight`，來保證畫面比例正確。
- `near` & `far`: 想像成一個有老花眼又有近視的人，太遠的看不到，太近的也看不到，反之在 `near` 與 `far` 之間的場景就會顯示。

有了以上幾個參數就能決定出一個 frustum (截頭錐體) 的 3D 形狀，此範圍就是 canvas 上會呈現的。

```js
const fov = 75;
const aspect = window.innerWidth / window.innerHeight; // 依照螢幕寬高比
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
```

接著定義場景：
```js
const scene = new THREE.Scene();
```

還有 3D 物件：
```js
const boxWidth = 10;
const boxHeight = 10;
const boxDepth = 10;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
```

有很多內建的 Geometry (幾何形狀) 可以使用，各個需要的參數也不同。

材質：
```js
const material = new THREE.MeshBasicMaterial({color: 0xee1188});
```

組合起來變成一個完整的 3D 物件：
```js
const cube = new THREE.Mesh(geometry, material);
```

加到場景裡：
```js
scene.add(cube);
```

各個物件包括 Camera 預設位置都是在 `(0,0,0)`
所以我們可以將 Camera 位置移動，以便我們看到在 `(0,0,0)` 的 cube。
```js
camera.position.z = 50;
```

接著我們可以寫個函式讓 cube 動起來，我們用到 [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) - 它會在瀏覽器重繪時執行，每個瀏覽器更新畫面的頻率不太一樣。

```js
function render(time) { // requestAnimationFrame 執行 callback 時會帶入當前的 timestamp
  time *= 0.001;  // convert time to seconds
 
  cube.rotation.x = time; // 讓 cube 動起來
  cube.rotation.y = time;
 
  renderer.render(scene, camera); // 記得讓 renderer 重新渲染 3D 場景
 
  requestAnimationFrame(render); // 這一次跑完後，也要再呼叫一次 requestAnimationFrame 才能在下一幀執行，連續下去達成動畫效果。
}
requestAnimationFrame(render); // 最初要執行一次
```

我們還可以增加光源：
```js
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-10, 20, 50);
scene.add(light);
```

還記得上面講過在場景中的物件初始位置都會是 `(0,0,0)`，所以我們的 `DirectionalLight` 會在初始位置。而且此光源還有個 `target` 屬性，決定光要照哪個方向，這個 `target` 一樣也是在初始位置。

所以上面程式碼我們把光源位置移動，而 `target` 保持不變，(因為 `target` 和 cube 都在初始位置)。

```diff
- const material = new THREE.MeshBasicMaterial({color: 0xee1188});
+ const material = new THREE.MeshPhongMaterial({color: 0xee1188});
```
而為了能看出光照的效果，我們把不會受光源影響的材質 `MeshBasicMaterial`，改成會受光源影響的 `MeshPhongMaterial`。
[Materials](./materials) 相關的文章會在後面提到。

接著寫一個函式將建立 cube 的程式碼封裝在內，讓我們容易建立多個 cube。

```js
function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  cube.position.x = x;
 
  return cube;
}
```

注意上方範例已經在函式內將 cube 加進 `scene` 了。

```js
const cubes = [
  makeInstance(geometry, 0xffeeff,  20),
  makeInstance(geometry, 0xaa44aa, -5),
  makeInstance(geometry, 0x0099ff,  0),
];
```

這邊宣告一個陣列將 cube 都存在裡面。這方法在應用上非常常見，把特定物件集中起來，方便管理操作。

```js
function render(time) {
  // Emit...

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  // Emit...
};
```

在 `render` 函式內遍歷 `cubes` 內的物件做變化。
