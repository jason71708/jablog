---
title: 5 種 TypeScript 小技巧
description: 這 5 種小技巧能讓撰寫型別時更加通用與快速。
tags: [TypeScript]
# image: ./cover.jpg
---

寫 TypeScript 也有一年多的時間，整理了一些實用的寫法讓撰寫型別能更加彈性與順暢。

以下介紹 10 種技巧：
<!--truncate-->

## 條件式型別限制

如同 JavaScript 有 `?` 可寫[三元判斷式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)之外， TypeScript 也能用 `?` 來判斷型別。

```ts
interface Computer = {
  id: number;
  cpu: number;
  ram: number;
  keyboard: string;
  // ...
}
interface Phone = {
  id: string;
  cpu: number;
  ram: number;
  size: string;
  // ...
}

type ComputerPreviewInfo = Pick<Computer, "id" | "keyboard">;
type PhonePreviewInfo = Pick<Phone, "id" | "size">;

type GetDevicePreviewInfo<T extends Computer | Phone> = T extends Computer
  ? ComputerPreviewInfo
  : PhonePreviewInfo;
```

以上運用 Gernic 與 `extends` 的方式撰寫根據輸入的型別輸出對應的型別。

實務上一定有需要取部分資料的情況，拿來做預覽之類的畫面顯示，這時可以用定義一個通用函式取得各種資料的型別：

```ts
function getDevicePreviewInfo<T extends Computer | Phone>(computerOrPhone: T): GetDevicePreviewInfo<T> {
  // do something
}

const laptop = new Computer()
const laptopPreviewInfo = getDevicePreviewInfo(laptop)
// laptopPreviewInfo: ComputerPreviewInfo

const iPhone200ProMax = new Phone()
const iPhonePreviewInfo = getDevicePreviewInfo(iPhone200ProMax)
// iPhonePreviewInfo: PhonePreviewInfo
```

## 同場加映： Function Overload (函式多載)

```ts
function squreOrTriangleArea(n: number): number;
function squreOrTriangleArea(width: number, height): number;
function squreOrTriangleArea(nOrWidth: number, height): number {
  if (height !== undefined) {
    return (nOrWidth * height) / 2
  } else {
    return nOrWidth * nOrWidth
  }
}
squreOrTriangleArea(5); // 25
squreOrTriangleArea(5, 4); // 10
```

允許同個函式有多個輸入與輸出的型別組合。
用以上例子來看：前兩個函式為*定義用*的，第三個*實作函式*內的輸入與輸出的參數型別必須要是以上定義用的函式參數型別的*聯集*。

> 關於多載函式寫法，官方建議：Always prefer parameters with union types instead of overloads when possible
