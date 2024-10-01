---
title: Master TypeScript Mapped Types
description: We can create our own utility types by some advanced mapped type usages.
tags: [TypeScript]
---

We can create our own utility types by some advanced mapped type usages.

## Basics

Let's see the basic example.

```typescript
type Person = {
  name: string;
  gender: string;
  age: number;
  married: boolean;
}
```

<!--truncate-->

For general uses, this data can be modified partial of it or only for display.

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

This would write lots of duplicate code.

## Reduce the duplicate code

Thus, we can use mapped types syntax to reference the original type.

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

`... in ...` syntax is similar to the JavaScript `for. . .in` statement, which is used to iterate all types in type `keyof T`
`keyof` operator is used to get all the keys of a type `T`, and its return type is a union type.
`T[K]` is similar to the syntax for attribute access, and is used to get the type of the value corresponding to an attribute of the object type.


And we can adding `+` and `-` prefixes to the modifiers `?` or `readonly` to add or removed the modifiers.

```typescript
  type NotAllowPartial<T> = {
    [K in keyof T]-?: T[K]
  }

  type AddReadonly<T> = {
    +readonly [K in keyof T]: T[K]
  }
```

If we don't add prefixes to the modifiers, the default is `+`.

## More tips to generate key types

And also, we can use `as ...` syntax to generates the corresponding type from the type `T`.

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

Because the `Capitalize` utility type requires `string` type for its parameter, and the return type by `keyof` may includes `string`, `number` and `symbol` type. we need to filter it by the `string & ...` .

## Bonus

If we return never type, it would be filter in the process of mapping keys.

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