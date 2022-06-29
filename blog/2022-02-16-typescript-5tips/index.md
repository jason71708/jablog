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

## keyof

```ts
interface Computer {
  id: number;
  cpu: number;
  ram: number;
  keyboard: string;
  devices: string[]
}

type ComputerKeys = keyof Computer; // id | cpu | ram | keyboard | devices
```

非常實用，型別版本的 `Object.keys()` 。

## as const

```ts
const products = ['Computer', 'Phone', 'Laptops'];
type Products = typeof products; // string[]

const products2 = ['Computer', 'Phone', 'Laptops'] as const;
type Products2 = typeof products2; // ['Computer', 'Phone', 'Laptops'];
```

`as const` 關鍵字相當於型別版本的 `const` ，能用前面的值定義為唯獨 (readonly) 的常數型別，上面 `Products2` 如果給
成其他字串陣列的值，非原本定義的那樣則會報錯。

## index access

```ts
const products = ['Computer', 'Phone', 'Laptops'] as const;
type Products = typeof products; // ['Computer', 'Phone', 'Laptops'];

type Product = Products[number]; // 'Computer' | 'Phone' | 'Laptops'

interface Computer {
  id: number;
  cpu: number;
  ram: number;
  keyboard: string;
  devices: string[]
}
type ComputerId = Computer['id']; // number
type ComputerKeysType = Computer[keyof Computer] // string | number | string[]
```

跟 JavaScript 本身使用 `array[0]` 與 `someObject['key']` 的方式一樣，只是變成型別版本。

## 泛型函式限縮參數

沿用上面的 `Computer` ：

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

const laptop: Computer = {
  id: 123999,
  cpu: 2.5,
  ram: 16,
  keyboard: 'keyboard A',
  devices: ['speaker', 'audio']
};

getProperty(laptop, 'id'); // 123999
getProperty(laptop, 'touchableScreen'); // type error
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
