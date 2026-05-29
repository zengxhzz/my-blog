<script setup lang="ts">
useSeoMeta({
  title: '关于',
  description: '关于我——一名热爱构建的开发者。',
})
</script>

<template>
  <div class="space-y-10">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold tracking-tight">关于</h1>
      <p class="text-muted">
        简单介绍一下自己。
      </p>
    </header>

    <!--
      ⚠️ 以下文案为占位内容，请替换为你自己的真实信息。
    -->

    <div class="prose max-w-none space-y-6">
      <section>
        <h2>我是谁</h2>
        <p>
          一名前端工程师，目前在写 Vue 和 TypeScript。
          大学时学的是计算机科学，毕业后一直在做 Web 开发，从 jQuery 时代写到现在的 React / Vue / Serverless，
          但真正让我觉得踏实的还是把一件事做到位——代码干净、交互流畅、性能可靠。
        </p>
        <p>
          工作之外会写一点开源工具，偶尔在
          <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">GitHub</a>
          上冒泡。喜欢把重复的事情自动化，所以花了不少时间折腾编辑器配置和命令行工具。
        </p>
      </section>

      <section>
        <h2>技术兴趣</h2>
        <p>最近几年主要在这些方向上投入时间：</p>
        <ul>
          <li>
            <strong>前端工程化</strong> — 构建工具、类型系统、代码生成。
            相信好的工具链比好的人工规范更可靠。
          </li>
          <li>
            <strong>内容驱动网站</strong> — 静态生成、Markdown 写作流、排版细节。
            这个博客本身就是实验场。
          </li>
          <li>
            <strong>开发者体验</strong> — CLI 设计、错误信息可读性、配置优于约定。
            好的 DX 让人愿意多用你的工具。
          </li>
        </ul>
      </section>

      <section>
        <h2>正在学习</h2>
        <p>目前的学习清单：</p>
        <ol>
          <li>Rust 基础——想用它重写几个性能敏感的 Node.js 工具</li>
          <li>设计系统与排版——不只是能用，还要看着舒服</li>
          <li>SQLite 与边缘计算——轻量、便携、适合个人项目</li>
        </ol>
        <p>这份清单每个季度会更新一次。学得慢没关系，持续就行。</p>
      </section>

      <section>
        <h2>做过的东西</h2>
        <p>
          一些个人项目放在
          <NuxtLink to="/projects" class="text-accent hover:underline">
            项目页
          </NuxtLink>
          ，欢迎看看。大部分是解决自己遇到的问题，顺便开源出来。
        </p>
      </section>

      <section>
        <h2>为什么写博客</h2>
        <p>三个理由：</p>
        <ol>
          <li>
            <strong>写给未来的自己。</strong>
            现在搞明白的东西，半年后大概率会忘。写下来是最可靠的备份。
          </li>
          <li>
            <strong>降低复述成本。</strong>
            遇到同样问题的人可以搜到，不用我再解释一遍。
          </li>
          <li>
            <strong>倒逼深度思考。</strong>
            写清楚比想清楚更难。把一个概念写成一篇文章的过程，
            会暴露很多你以为懂了但其实没懂的地方。
          </li>
        </ol>
        <p>
          不追求频率，不赶热点。每篇文章写到自己在半年后还能看懂为止。
        </p>
      </section>

      <section>
        <h2>联系我</h2>
        <p>
          对文章内容有疑问或建议，欢迎发邮件到
          <a href="mailto:you@example.com">you@example.com</a>
          ，或者在 GitHub 上开 issue。不保证秒回，但每条都会读。
        </p>
      </section>
    </div>

    <!-- ⚠️ 请替换为你自己的内容 ↑ -->
    <p class="rounded border border-border bg-card px-4 py-3 text-sm text-muted">
      ⚠️ 提示：以上为占位文案，请替换为你自己的真实信息。
    </p>
  </div>
</template>
