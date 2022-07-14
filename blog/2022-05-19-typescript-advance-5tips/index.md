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

## Discriminated unions

假設 `Computer` 只是一個 `interface` 或 `type` ，並不是 Class 而沒辦法使用 `instanceof` 的情況，我們可以增加一個屬性並寫定字串。

```ts

export interface Computer {
  __typename: 'computer'
  id: string
  cpu: string
  ram: number
}

// ...

export const computer: Computer[] = [
  {
    __typename: "computer", // 
    id: "123-abc-456",
    cpu: 4,
    ram: 16
  },
  // ...
];

export type Devices = Computer | Phone | Mic;

const getInfo = (value: Devices | string) => {
  if (typeof value === "string") return value;
  if (value.__typename === "computer") return `CPU: ${value.cpu}, RAM: ${value.ram}`;
  if (value.__typename === "phone") return `Touch Screen: ${value.touchScreen}, Speaker: ${value.speaker}`;
  // ...

  return "";
};
```

實際在編輯器撰寫時可以看到在 if else 區塊內 `value.` 出現的提示就是對應 `__typename` 的型別物件屬性。

定義型別時直接指定常數可以用在非常多地方，例如進行非同步行為時的狀態：

```ts
type PendingState = {
  status: 'pending';
};

type LoadingState = {
  status: 'loading';
};

type SuccessState = {
  status: 'success';
  data: Book[];
};

type ErrorState = {
  status: 'error';
  error: any;
};

type State = PendingState | LoadingState | SuccessState | ErrorState;
```

還有 React Component ：

```ts
interface SingleSelectProps<TValue extends Devices> {
  isMulti: false;
  onChange: (value: TValue) => void;
}

interface MultiSelectProps<TValue extends Devices> {
  isMulti: true;
  onChange: (value: TValue[]) => void;
}

export const GenericSelect = <TValue extends Devices>(
 props: SingleSelectProps<TValue> | MultiSelectProps<TValue>
) => {
  // ...
}
```

## Polymorphic Component in React and TypeScript

之前可能有使用某個三方元件，給定 `as="div"` 或 `as="span"` 就可以渲染出不同的元素。

其實就是用 `React.ElementType` 與給定預設值的方式：

```tsx
type TitleOwnProps<E extends React.ElementType = React.ElementType> = {
  children: string
  as?: E
}

type TitleProps<E extends React.ElementType> = TitleOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TitleOwnProps>

const __DEFAULT_ELEMENT__ = 'h2'

function Title<E extends React.ElementType = typeof __DEFAULT_ELEMENT__>({
  children,
  as,
  ...props
}: TitleProps<E>) {
  const Component = as || __DEFAULT_ELEMENT__
  
  return <Component {...props} aria-labelledby='title'>{children}</Component>
}

function Application() {
  return (
    <Title as='a' href='/'>
      Application component rendering Title
    </Title>
  )
}
```
