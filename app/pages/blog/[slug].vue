<script setup lang="ts">
const route = useRoute()

const { data: doc } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blog')
    .path(route.path)
    .first()
)

// 文章不存在 → 404
if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: '文章未找到' })
}

const post = doc.value

// SEO：取 frontmatter 的 title 和 description
useSeoMeta({
  title: post.title,
  description: post.description,
})
</script>

<template>
  <article class="space-y-8">
    <!-- ============================================================ -->
    <!-- 预留：上一篇 / 下一篇 导航                                      -->
    <!-- ============================================================ -->

    <!-- 文章头 -->
    <header class="space-y-3">
      <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
        {{ post.title }}
      </h1>

      <p v-if="post.description" class="text-lg leading-relaxed text-muted">
        {{ post.description }}
      </p>

      <BlogPostMeta :date="post.date" :tags="post.tags" />
    </header>

    <!-- ============================================================ -->
    <!-- 预留：目录（Table of Contents）                                  -->
    <!-- ============================================================ -->

    <!-- ============================================================ -->
    <!-- 预留：阅读时间估算                                               -->
    <!-- ============================================================ -->

    <!-- 正文 -->
    <div class="prose max-w-none">
      <ContentRenderer :value="post" />
    </div>

    <!-- 文章尾 -->
    <footer class="border-t border-border pt-8">
      <NuxtLink
        to="/blog"
        class="inline-flex text-sm text-muted transition-colors hover:text-accent"
      >
        ← 返回博客
      </NuxtLink>
    </footer>
  </article>
</template>
