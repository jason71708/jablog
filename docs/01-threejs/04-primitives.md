---
title: 'Primitives'
tags:
  - threejs
keywords: [threejs]
---

> 此筆記對應[官方文件 Primitives 章節](https://threejs.org/manual/#en/primitives)。

Primitives 是用來建立 3D 的形狀，Three.js 有很多已建置好的，還有能讓開發者自行畫出形狀的 Primitives。

一些常見的形狀像是方形、圓球等等都有預設的參數，所以建立時可以不帶參數直接建立。(有用 TypeScript 的話能看到各 Primitives 定義好的規格與參數)

下列只記錄較特殊的 Primitives，簡單的形狀與需要經過複雜計算畫出形狀的暫且略過。(之後章節會提到客製形狀)

## [ExtrudeGeometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry)

使用 `THREE.Shape` 畫出 2D 形狀 (也可使用其他 2D 的 Geometry)，再定義 `extrudeSettings` 讓 2D 形狀長出厚度變成 3D 形狀與邊緣斜角。

官方範例演示了兩種繪製方式：

第一種是像指令式那樣使用 `shape.moveTo`、`shape.bezierCurveTo` 一步步繪出 2D 形狀。

第二種是定義一連串陣列並轉成 `Vector`，再帶入 `Shape`、`CurvePath`、`CubicBezierCurve3` 繪製出形狀。

## [LatheGeometry](https://threejs.org/docs/#api/en/geometries/LatheGeometry)

使用 `THREE.Vector2` 繪製出一個個點並放進陣列，這些點會依順序連線成一條線，此線段就是該 Primitive 需要的基礎形狀。

`LatheGeometry` 會將該線段沿中心繞一圈繪製成曲面。

## [ParametricGeometry](https://threejs.org/docs/?q=Para#examples/en/geometries/ParametricGeometry)

給定一個將 2D 座標點轉換成 3D 座標點的函式，`ParametricGeometry` 會依據此函式畫出形狀。

## [PolyhedronGeometry](https://threejs.org/docs/#api/en/geometries/PolyhedronGeometry)

給定一組頂點，與定義各頂點之間連結的面。`PolyhedronGeometry` 會依據參數投射頂點至圓曲面上並依前面定義的面將各頂點連結繪製成多邊形。

`DodecahedronGeometry`、`IcosahedronGeometry`、`OctahedronGeometry`、`TetrahedronGeometry` 這些正多面體都是基於 `PolyhedronGeometry` 實作的。

## [ShapeGeometry](https://threejs.org/docs/#api/en/geometries/ShapeGeometry)

在 [ExtrudeGeometry](#extrudegeometry) 提到過，用於自行定義 2D 形狀。

## [TextGeometry](https://threejs.org/docs/?q=TextGeometry#examples/en/geometries/TextGeometry)

需使用 `FontLoader` 加載字型檔案，給定要繪製字串與和 [ExtrudeGeometry](/extrudegeometry) 一樣相關的參數。

`TextGeometry` 基於用 `ExtrudeGeometry` 實作的。

## [TubeGeometry](https://threejs.org/docs/#api/en/geometries/TubeGeometry)

給定一條曲線 `THREE.Curve`，此 Primitive 會根據曲線繪製出像水管的曲面。

## [EdgesGeometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry)

將已建立好的 `Geometry` 帶進此 Primitive 中，將會繪製出只有邊緣線條的 3D 物件。

## [WireframeGeometry](https://threejs.org/docs/#api/en/geometries/WireframeGeometry)

與 [EdgesGeometry](#edgesgeometry) 作用類似，但會繪製出有結構線的 3D 物件。

## Practice

此處練習延續 [Fundamentals 章節](./02-fundamentals.md) 的範例，以下紀錄幾個較特別的。

這裡用到了 `THREE.MeshPhongMaterial`，他是一種會被光源影響顯示的材質，在等等的 [Material 章節](./06-materials.md)會提到。

```js
const material = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
});
```

`side: THREE.DoubleSide` 這段是定義我們物件的材質兩面都要渲染，像是平面的或開放未閉合的物件，只渲染外層那面的話，只要轉向該物件的背面就看不到了，對於像正方體，球體這類通常都會完整閉合的物件，就不用特別設置兩面渲染，因為內層那面就算渲染也看不到。同時，兩面渲染也會較耗運算資源。

### TextGeometry & BoundingBox

由於我們在使用 `TextGeometry` 時需要載外部的字型檔進來，所以我們會用非同步的方式等載入字型後才建立 `TextGeometry` 的物件。

```js
const mesh = new THREE.Mesh(geometry, material);
geometry.computeBoundingBox();
geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
```

`TextGeometry` 還有個要注意的地方，它預設旋轉中心點是在該物件的左上角。若要改成照該物件的中心點旋轉的話，我們可以使用 `geometry.computeBoundingBox()` 來計算該形狀的邊界，接著使用 `geometry.boundingBox.getCenter(mesh.position)` 來取得該物件的中心點在實際環境中的位置，然後使用 `multiplyScalar(-1)` 將中心位置移到左上，將該物件的中心點與旋轉的中心點對齊。

因為該範例的 `addObject` 函式會設定該物件的位置，若直接帶剛剛處理好的 `TextGeometry` 進去的話，物件中心點跟旋轉中心就不會對齊了，所以我們再建立一個 `THREE.Object3D` 物件，把 `TextGeometry` 加在它裡面，再帶入 `addObject` 讓設定物件位置時設定在 `Object3D` 上，就不會影響 `TextGeometry` 本身的中心點位置了。這方法類似於 HTML 中 `<div>` 與 內層元素的定位關係。

### LineSegments & LineBasicMaterial

```js
function addLineGeometry(x, y, geometry) {
  const material = new THREE.LineBasicMaterial({color: 0x000000});
  const mesh = new THREE.LineSegments(geometry, material);
  addObject(x, y, mesh);
}
```

`EdgesGeometry`、`WireframeGeometry` 與在建立成物件時，要用到 `LineBasicMaterial`、`LineSegments`，讓結構線能正確顯示出來。

### `PointsMaterial`

```js
const material = new THREE.PointsMaterial({
    color: 'red',
    size: 0.5,
    sizeAttenuation: false,
});
```

`THREE.PointsMaterial` 將繪製該形狀的各個點出來，`sizeAttenuation: false` 讓形狀上的點統一大小，不會因為距離相機的遠近而大小有所變化。

### Segments

在給定各 Primitives 參數時常會看到 Segments 的設定，這是定義個形狀的細節面數，比如在原球體上，面數越多，呈現上會越接近滑順的圓，反之則越粗糙。

對於 Segments 的設定需要取捨，因為面數越多，會消耗的運算資源也越多，但是呈現的效果會越好。但如果是平面圖形的話，Segments 多或少的表面呈現是一樣的，所以這情況就設最少即可。
