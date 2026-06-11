---
title: "我的 Git 工作流"
description: "记录日常开发中使用的 Git 分支策略与提交规范：主干开发、Conventional Commits、rebase 优先。"
date: "2026-04-28"
tags: ["git", "工具"]
draft: true
featured: false
category: "工程"
---

用了几年 Git，沉淀出一套适合自己的工作流。不是银弹，但在个人项目和中小团队里运转良好。

## 核心原则

三条原则驱动所有操作：

1. **主干始终可部署** — `master` / `main` 分支永远处于可发布状态
2. **提交即文档** — 每个 commit message 都是 changelog 的一行
3. **历史干净** — rebase 优先于 merge，线性历史更易回溯

> 有人觉得 rebase 改写历史是「撒谎」。我的看法：push 之前的本地提交是草稿，整理草稿不是撒谎，是编辑。

## 分支策略

```
master        ← 始终可部署
  ├── feat/xxx   ← 新功能
  ├── fix/xxx    ← 修 bug
  └── chore/xxx  ← 工程杂务
```

分支生命周期很短，通常一天内合并回 `master`。长分支是痛苦之源。

### 创建功能分支

```bash
git checkout -b feat/add-dark-mode
```

### 保持与 master 同步

```bash
git fetch origin
git rebase origin/master
```

遇到冲突在 rebase 过程中解决，而不是最后 merge 时一次性处理——分而治之痛苦小得多。

## Conventional Commits

提交信息格式固定：

```
<type>(<scope>): <description>

[optional body]
```

常用 type：

- `feat` — 新功能
- `fix` — 修 bug
- `refactor` — 重构（不改变行为）
- `docs` — 文档
- `chore` — 工程杂务（依赖升级、配置调整）
- `style` — 纯格式（空格、分号，不影响逻辑）

### 示例

```
feat(blog): add article detail page with ContentRenderer

fix(header): close mobile menu on route change

chore(deps): bump nuxt to 4.5.0
```

## 常用别名

在 `.gitconfig` 里设几个别名能省不少时间：

```ini
[alias]
  s   = status -sb
  lg  = log --oneline --graph --all -20
  co  = checkout
  br  = branch
  st  = stash
  aa  = add -A
  cm  = commit -m
  rbm = rebase origin/master
  rbi = rebase -i
```

## 小结

这套流程的核心思想很简单：**小步提交、频繁 rebase、提交信息可读。** 不用工具（GitFlow、GitHub Flow 之类的命名），就几个分支 + 一套命名约定，已经覆盖了我 95% 的场景。
