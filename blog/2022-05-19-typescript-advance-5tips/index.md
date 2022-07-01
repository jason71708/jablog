---
title: TypeScript 進階 5 種技巧
description: 這邊介紹 5 種 TypeScript 的進階技巧，有些也結合了 React 實務上會用到情境。
tags: [TypeScript]
# image: ./cover.jpg
---

這邊介紹 5 種 TypeScript 的進階技巧，有些也結合了 React 實務上會用到情境。

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

## [Exhaustiveness checking](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking)

當用 if else 或 switch 做判斷，將聯集型別一一過濾，若連最後一種可能都濾掉的話，最後型別會是 `never` ，簡單講 `never` 跟 `any` 剛好相反， `never` 型別只包含自己但是 `any` 可以代表任意型別。

`never` 的出現提醒我們輸入的參數有誤或是條件判斷可能有缺漏，以下沿用之前舉例：

```ts
class Mic {
  constructor(
    public id: string,
    public volume: number,
    public size: string
  ) {}
}

type Devices = Computer | Phone | Mic;

const getSelect = (device: Devices) => {
  if (device instanceof Computer) {
    // do something with Computer
  } else if (device instanceof Phone) {
    // do something with Phones
  } else {
    const errorState: never = device; // Type 'Mic' is not assignable to type 'never'.
    throw new Error(`Reaching an impossible state because of ${errorState}`);
  }
};
```

上述 `Devices` 還有 `Mic` 這個可能，但是我們的判斷缺少了，這時型別是 `never` 的 `errorState` 會報錯，提醒還有 `Mic` 這個可能。在非常多 if else 或用 switch 時，最後加入 `never` 型別可以幫助我們有效排查疏失。
