---
title: "TypeScript 实用模式笔记"
description: "记录日常开发中最常用的几个 TypeScript 类型体操模式：模板字面量、条件类型、品牌类型与类型守卫。"
date: "2026-05-20"
tags: ["typescript", "patterns"]
draft: false
featured: false
category: "前端"
---

日常写 TypeScript 时，有几个模式反复出现。这篇文章把它们整理下来，方便以后查阅。

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型可以构造出非常精确的字符串约束：

```ts
type EventName = `on${Capitalize<string>}`

function listen(event: EventName, handler: () => void) {
  // ...
}

listen('onClick', () => {})   // ✅
listen('onChange', () => {})  // ✅
listen('click', () => {})     // ❌ 类型报错
```

结合内置的 `Capitalize`、`Uncapitalize`、`Uppercase`、`Lowercase` 可以覆盖大部分场景。

## 条件类型与 infer

条件类型配合 `infer` 是提取类型信息的利器：

```ts
type ArrayItem<T> = T extends (infer U)[] ? U : T

type A = ArrayItem<string[]>   // string
type B = ArrayItem<number>     // number
```

更有价值的用法是从函数签名中提取参数和返回值：

```ts
type FirstArg<T> =
  T extends (first: infer F, ...rest: any[]) => any ? F : never

type Fn = (x: number, y: string) => boolean
type X = FirstArg<Fn> // number
```

## 品牌类型（Branded Types）

防止将原始类型混用的经典模式：

```ts
type Brand<T, B> = T & { __brand: B }

type UserId = Brand<string, 'UserId'>
type PostId = Brand<string, 'PostId'>

function getUser(id: UserId) { /* ... */ }

const userId = 'abc' as UserId
const postId = 'abc' as PostId

getUser(userId)  // ✅
getUser(postId)  // ❌ 类型不兼容
```

## 类型守卫

用户自定义的类型守卫让 `if` / `switch` 块内类型自动收窄：

```ts
interface Cat {
  meow(): void
}
interface Dog {
  bark(): void
}

function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal
}

const pet: Cat | Dog = getPet()

if (isCat(pet)) {
  pet.meow() // 这里 pet 是 Cat
} else {
  pet.bark() // 这里 pet 是 Dog
}
```

> 类型守卫的返回值是 `x is T`，不是 `boolean`。编译器会信任这个断言——所以实现逻辑必须正确，否则运行时类型对不上。

## 小结

- **模板字面量类型**：精确字符串约束
- **条件类型 + infer**：提取类型片段
- **品牌类型**：名义类型区分
- **类型守卫**：运行时收窄类型

这些模式不是什么高深技巧，但组合起来能解决绝大多数日常类型问题。
