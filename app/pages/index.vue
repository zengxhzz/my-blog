<script setup lang="ts">
// 最近文章：过滤草稿、按日期倒序、取前 4 篇
const { data: posts } = await useAsyncData('home-recent-posts', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .limit(4)
    .all()
)

// 精选项目：只取 featured 为 true 的
const { data: projects } = await useAsyncData('home-featured-projects', () =>
  queryCollection('projects')
    .where('featured', '=', true)
    .all()
)

// 首页基础 SEO（完整 SEO 在任务 13 统一做，这里先给个标题）
useSeoMeta({
  title: '首页',
  description: '一个关于技术、学习与思考的个人博客。',
})
</script>

<template>
  <div class="space-y-12 sm:space-y-20">
    <!-- ============ Hero ============ -->
    <section class="space-y-4">
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
        你好，我是 yourname<span class="text-accent">.</span>
      </h1>
      <p class="max-w-prose text-lg leading-relaxed text-muted">
        一名热爱构建的开发者。这里记录我在技术、学习和思考路上的痕迹——
        写给未来的自己，也写给路过的你。
      </p>
    </section>

    <!-- ============ 最近文章 ============ -->
    <section class="space-y-6">
      <div class="flex items-baseline justify-between">
        <h2 class="text-sm font-semibold uppercase tracking-wider text-muted">
          最近文章
        </h2>
        <NuxtLink
          to="/blog"
          class="text-sm text-muted transition-colors hover:text-accent"
        >
          查看全部 →
        </NuxtLink>
      </div>

      <ul v-if="posts?.length" class="divide-y divide-border">
        <li v-for="post in posts" :key="post.path" class="py-4 first:pt-0">
          <NuxtLink :to="post.path" class="group block">
            <div
              class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <h3
                class="font-medium transition-colors group-hover:text-accent"
              >
                {{ post.title }}
              </h3>
              <time
                :datetime="post.date"
                class="shrink-0 text-sm text-muted"
              >
                {{ formatDate(post.date) }}
              </time>
            </div>
            <p class="mt-1 text-sm text-muted">
              {{ post.description }}
            </p>
          </NuxtLink>
        </li>
      </ul>

      <p v-else class="text-sm text-muted">还没有文章，敬请期待。</p>
    </section>

    <!-- ============ 精选项目 ============ -->
    <section v-if="projects?.length" class="space-y-6">
      <div class="flex items-baseline justify-between">
        <h2 class="text-sm font-semibold uppercase tracking-wider text-muted">
          精选项目
        </h2>
        <NuxtLink
          to="/projects"
          class="text-sm text-muted transition-colors hover:text-accent"
        >
          查看全部 →
        </NuxtLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.name"
          class="rounded-lg border border-border bg-card p-5"
        >
          <h3 class="font-medium">
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-accent"
            >
              {{ project.name }}
            </a>
            <span v-else>{{ project.name }}</span>
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">
            {{ project.description }}
          </p>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li
              v-for="t in project.tech"
              :key="t"
              class="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted"
            >
              {{ t }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <!-- ============ 关于入口 ============ -->
    <section class="border-t border-border pt-12">
      <p class="text-muted">
        想了解更多关于我的内容，可以看看
        <NuxtLink to="/about" class="text-accent hover:underline">
          关于我
        </NuxtLink>
        。
      </p>
    </section>
  </div>
</template>
