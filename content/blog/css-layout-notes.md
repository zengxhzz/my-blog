---
title: "CSS 布局笔记：从 Flex 到 Container Query"
description: "梳理现代 CSS 布局方案的演进：流动布局、Flex、Grid、以及容器查询带来的新可能。"
date: "2026-05-10"
tags: ["css", "布局"]
draft: true
featured: false
category: "前端"
---

这篇文章是我对 CSS 布局演进的个人理解，还在整理中。先列个大纲，后面慢慢填。

## 布局方案的演进

按时间线整理，CSS 布局大致走了这条路：

1. **流动布局** — `display: inline / block`，靠文档流自然排列
2. **浮动布局** — `float: left / right`，虽已过时但理解 BFC 仍有价值
3. **弹性盒子** — `display: flex`，一维布局的终极方案
4. **网格布局** — `display: grid`，二维布局的正解
5. **容器查询** — `@container`，组件级响应式

> Flex 和 Grid 不是替代关系。**一维用 Flex，二维用 Grid。** 把这句话贴在显示器上。

## Flexbox 核心概念

Flex 的本质是「主轴 + 交叉轴」。理解这两个轴，Flex 就理解了一半。

- `justify-content` — 主轴对齐
- `align-items` — 交叉轴对齐
- `flex: 1` — `flex-grow: 1; flex-shrink: 1; flex-basis: 0` 的简写

```css
.card-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 300px;
  /* 最小 300px，空间充裕时均分 */
}
```

## Grid 什么时候用

当你的布局同时关心行和列时。比如：

- 仪表盘面板
- 图片画廊
- 页面整体骨架

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

`auto-fill` vs `auto-fit` 的差别很微妙但重要：前者会保留空轨道，后者会把空轨道折叠。大多数卡片场景用 `auto-fit` 更合适——没有足够卡片时不会留下空白列。

## 容器查询：组件级响应式

过去做响应式只能看视口（`@media`），组件在不同容器里行为一样。容器查询让组件感知自己的空间：

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

`container-type: inline-size` 会创建新的包含块，注意它会影响子元素的百分比高度计算。

## 参考资源

- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) — CSS-Tricks
- [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) — CSS-Tricks
- [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) — MDN
