---
title: TypeScript 進階 5 種技巧
description: 這 5 種小技巧能讓撰寫型別時更加通用與快速。
tags: [TypeScript]
# image: ./cover.jpg
---

這邊介紹 5 種進階技巧，有些也結合了 React 實務上會用到情境。

<!--truncate-->

## is

`is` 關鍵字用在函式判斷參數是哪個型別並回傳布林值時使用。

使用有 `is` 關鍵字的函式後，在該程式區塊內型別將會被過濾 (Type Guard)，就可以直接使用該特定型別內有的屬性了。

```ts
class Computer {
  constructor(
    public id: string,
    public cpu: number,
    public ram: number
  ) {}
}
class Phone {
  constructor(
    public id: number,
    public touchScreen: string,
    public speaker: string
  ) {}
}
type Devices = Computer | Phone;

export const isComputer = (
  value: Devices
): value is Computer => {
  // do something that make sure value is Computer
  return value instanceof Computer
};

const calculateSomthing = <TValue extends Devices>(value: TValue) => {
  if (isComputer(value)) {
    // value.cpu ...
    // do something with the Computer
  } else {
    // value.touchScreen ...
    // do something with the Phone
  }
};
```
