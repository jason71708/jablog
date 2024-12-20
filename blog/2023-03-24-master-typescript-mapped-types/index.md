---
title: 掌握 TypeScript 映射型別
description: 透過這些映射型別技巧來建立工具型別。
tags: [TypeScript]
image: ./cover.png
---

![cover](./cover.png)

透過這些映射型別技巧來建立工具型別。

## 基礎部分

首先來個最基本的範例：

```typescript
type Person = {
  name: string;
  gender: string;
  age: number;
  married: boolean;
}
```

<!--truncate-->

一般使用上，如果要改動型別的前綴屬性，可以用 `?` 或 `readonly`。

```typescript
type PersonPartial = {
  name?: string;
  gender?: string;
  age?: number;
  married?: boolean;
}

type ReadonlyPerson = {
  readonly name: string;
  readonly gender: string;
  readonly age: number;
  readonly married: boolean;
}
```

但這樣會寫很多重複的程式碼。

## 減少多餘的程式碼

我們可以使用映射型別來根據原本的型別來產出新的型別。

```typescript
type UsePartial<T> = {
  [K in keyof T]?: T[K]
}

type UseReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

type PersonPartial = UsePartial<Person>
// { name?: string, ... , married?: boolean  }
type ReadonlyPerson = UseReadonly<Person>
// { readonly name: string, ... , readonly married: boolean  }
```
`... in ...` 語法和 JavaScript `for. . .in` 用法類似，用來迭代 `keyof T` 所有可能的型別，而 `keyof` 是用來取得該型別 `T` 的所有屬性名，很像 JavaScript 的 `Object.keys()`。`T[K]` 應該也很熟悉，就是取型別 `T` 的屬性 `K` 的型別。

也能透過添加 `+` 和 `-` 前綴來增加或減少型別屬性 `?` 和 `readonly`。

```typescript
  type NotAllowPartial<T> = {
    [K in keyof T]-?: T[K]
  }

  type AddReadonly<T> = {
    +readonly [K in keyof T]: T[K]
  }
```

如果不加任何前綴，則預設是 `+`。

## 更多映射技巧

透過 `as ...` 語法根據原本的型別來生成新的型別。

```typescript
  type UseGetter<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
  };

  type GetPerson = Getters<Person>
  // {
  //   getName: () => string;
  //   getGender: () => string;
  //   getAge: () => number;
  //   getMarried: () => boolean;
  // }
```

用 `keyof` 取得型別的屬性名，屬性名的型別可能是 `string` 或 `number` 或 `symbol`，而 `Capitalize` 只能接受 `string` 參數，所以需要用 `string & ...` 的方法來過濾掉其他可能的型別。

## 加碼

如果使用映射技巧時，聯集型別中有 `never` 的話，映射時會自動過濾掉。

```typescript
type Status = 'excellent' | 'great' | 'bad'

// type Exclude<T, U> = T extends U ? never : T

type InfoGetterWithFilter<T, U> = {
    [K in T as Exclude<T & string, U>]: string
}

type GetGoodStatusInfo = InfoGetterWithFilter<Status, 'bad'>
// {
//     excellent: string;
//     great: string;
// }
```

## Resources:

- https://javascript.plainenglish.io/using-typescript-mapped-types-like-a-pro-be10aef5511a