# 博客维护手册

技术栈:Nuxt 4 + Nuxt Content v3 + Tailwind CSS v4 + TypeScript
部署:Cloudflare Pages(纯静态 / SSG),连接 GitHub 自动构建

---

## 一、发布新文章(最高频,不碰代码)

1. 在 `content/blog/` 新建 `.md` 文件,文件名即网址(英文小写 + 连字符),例如
   `my-first-post.md` → `/blog/my-first-post`
2. 顶部填好 frontmatter:

   ```md
   ---
   title: "文章标题"
   description: "一句话摘要,会用于列表和 SEO"
   date: "2026-06-01"
   tags: ["nuxt", "笔记"]
   draft: true
   ---
   ```

3. 本地预览:`npm run dev`,浏览器打开 `localhost:3000` 边写边看
4. 写完把 `draft` 改为 `false`
5. 提交并推送:

   ```bash
   git add content/blog/my-first-post.md
   git commit -m "post: add my-first-post"
   git push
   ```

6. Cloudflare Pages 自动构建上线(通常 1–2 分钟)

**小技巧**:没写完的文章设 `draft: true`,可照常提交进 Git 做备份,但不会出现在线上。

---

## 二、小修小补(改文案 / 调样式)

1. 先开新分支:`git checkout -b fix-xxx`
2. 本地改,`npm run dev` 看效果
3. 检查类型:`npx nuxi typecheck`
4. 没问题再合并到 master 并推送

**红线自检**(改完搜一遍,出现就是错的):
- `queryContent` → 应为 `queryCollection`
- `tailwind.config` 文件 / `@tailwind` 指令 → v4 不该有
- 写死颜色 `bg-white` / `text-gray-` / `#色值` → 应只用语义 token

**Tailwind 任意值换标准类**(VS Code `suggestCanonicalClasses` 提示,不改也没事,改了更干净):
- 计算方式:Tailwind v4 `1` = `0.25rem`(4px),把任意值里的 rem × 4 就是标准类数字
- 常见替换:
  - `max-w-[46rem]` → `max-w-184`(46×4=184)
  - `absolute top-0` 组合 → `absolute inset-0` 合并
  - `-start-[calc(...)]` → 用逻辑属性前缀 `-inset-s-*`(start 是旧物理方向,inset-s 是新逻辑属性)
  - `1.5rem` = `6`, `2px` ≈ `0.5` → 合在一起 `6.5`
  - 遇到时直接按 IntelliSense 建议改即可

---

## 三、依赖升级(每 1–3 个月一次)

### 小版本(安全,常规维护)

```bash
npx nuxi upgrade     # 升级 Nuxt
npm outdated         # 查看哪些有新版
npm update           # 升级小版本
```

升级后**必须**全部跑通再推送:

```bash
npm run dev          # 页面正常
npx nuxi typecheck   # 类型无错
npm run generate     # 能构建出静态文件
```

### 大版本(如未来的 Nuxt 4 → 5,谨慎)

- **不要**直接 `npm update`
- 先开新分支,先读官方迁移指南
- 出问题带着报错来问 AI
- 注意:Nuxt 每个大版本在下一版发布后至少维护 6 个月,不必急于升级

---

## 四、向 AI 求助时的模板

每次开新对话先发这段(避免拿到过时写法):

```
我有一个个人技术博客,技术栈:Nuxt 4 + Nuxt Content v3 +
Tailwind CSS v4 + TypeScript,纯静态部署在 Cloudflare Pages。
内容用 queryCollection 查询,颜色用语义 token(不写死颜色)。
我现在遇到/想做:______
```

然后按场景补充:

| 场景 | 需要提供 |
|------|---------|
| 内容/排版问题 | 出问题的 `.md`(frontmatter + 那段内容)、期望 vs 实际、报错 |
| 加功能/改样式 | 想要的效果、相关那个文件的当前代码 |
| 报错/构建失败 | **完整**报错(别截断)、触发操作、出错文件内容 |

---

## 五、常用命令速查

```bash
npm run dev          # 本地开发(写文章、调试时开着)
npx nuxi typecheck   # 类型检查
npm run generate     # 生成静态文件(部署产物)
npx nuxi upgrade     # 升级 Nuxt
git checkout -b xxx  # 开新分支再改
```

---

## 六、可以以后再加的功能(架构已预留)

按当初设计,这些都已在结构上留好了扩展位,想做时再来一项一项加:

- 暗色模式切换(CSS 层已写好,只差一个开关 + `@nuxtjs/color-mode`)
- 阅读时间、文章目录、上一篇/下一篇
- 标签筛选页、站内搜索
- 每篇文章的动态 OG 图

**原则:一次只加一个,加完验证再加下一个。** 不要一口气堆功能。

