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
          一名计算机在读学生，一个算法学习者，一个喜欢音乐的人。
        </p>
        <p>
          偶尔会随着大潮尝试各种东西，比如这个网站，感觉能写个自己的博客很cool的样子，
          所以就写了。嗯。
        </p>
      </section>

      <section>
        <h2>正在学习</h2>
        <p>目前的学习清单：</p>
        <ol>
          <li>日语</li>
          <li>算法</li>
          <li>ai应用</li>
        </ol>
      </section>

      <section>
        <h2>做过的东西</h2>
        <p>
          一些个人项目放在
          <NuxtLink to="/projects" class="text-accent hover:underline">
            项目页
          </NuxtLink>
          ，欢迎看看。
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
            <strong>Just funny</strong>
            
          </li>
        </ol>
      </section>

      <section>
        <h2>联系我</h2>
        <p>
          对文章内容有疑问或建议，欢迎发邮件到
          <a href="mailto:zengxhzz@163.com">zengxhzz@163.com</a>
          ，或者在 GitHub 上开 issue。不保证秒回，但每条都会读。
        </p>
      </section>
    </div>
  </div>
</template>
