# 项目维护规则（Claude Code 请严格遵守）

> 本仓库部署在 **Cloudflare Workers**，构建时使用 `npm ci`（即 `npm clean-install`）。
> 历史上出现过因依赖与锁文件不同步导致部署失败的事故，因此以下规则**必须**遵守。

---

## 核心规则：`package.json` 与 `package-lock.json` 必须始终同步

`npm ci` 要求 `package.json` 与 `package-lock.json` **完全一致**。
只要有任意一个依赖（**包括间接依赖**）对不上，Cloudflare 构建就会直接失败，报错形如：

```
npm error `npm ci` can only install packages when your package.json and
package-lock.json are in sync. Please update your lock file with `npm install`.
npm error Missing: <some-package>@<version> from lock file
```

---

## 必须遵守的操作规范

1. **禁止手动编辑 `package.json` 里的 `dependencies` / `devDependencies`。**
   一律用命令增删改，让 npm 自动同步两个文件：
   - 添加依赖：`npm install <包名>`
   - 添加开发依赖：`npm install -D <包名>`
   - 删除依赖：`npm uninstall <包名>`
   - 升级依赖：`npm install <包名>@<版本>`

2. **任何改动依赖后，`package.json` 和 `package-lock.json` 必须放进同一个 commit 一起提交。**
   绝不允许只提交其中一个。

3. **`package-lock.json` 永远不能加入 `.gitignore`**，它必须进入版本库。

4. **推送前本地自检**：先在本地跑一遍 `npm ci`（或彻底版 `rm -rf node_modules && npm ci`）。
   只有它能成功，才说明锁文件是同步的，然后再 `git push`。
   这样能在本地提前暴露问题，而不是等 Cloudflare 报错。

5. **使用仓库固定的 Node 版本**：根目录有 `.nvmrc`。操作前先 `nvm use`，
   或确保本地 Node / npm 版本与 `.nvmrc` 一致，避免不同版本解析出不同依赖树。

---

## 当已经出现 “out of sync / Missing X from lock file” 时的修复流程

在项目根目录依次执行：

```bash
# 第一步：让锁文件重新对齐 package.json
npm install

# 若第一步未解决，则彻底重建：
rm -rf node_modules package-lock.json
npm install
```

确认本地 `npm ci` 能通过后，提交并推送：

```bash
git add package.json package-lock.json
git commit -m "fix: sync package-lock.json"
git push
```

---

## 一句话总结

> **动了依赖 → 跑 `npm install` → `package.json` 和 `package-lock.json` 一起 commit → 本地 `npm ci` 验证通过 → 再 push。**

