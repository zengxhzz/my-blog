<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
)

useSeoMeta({
  title: '博客',
  description: '技术文章与学习笔记。',
})
</script>

<template>
  <div class="space-y-10">
    <!-- 页头 -->
    <header class="space-y-2">
      <h1 class="text-2xl font-bold tracking-tight">博客</h1>
      <p class="text-muted">
        技术文章与学习笔记，按时间倒序排列。
      </p>
    </header>

    <!-- ============================================================ -->
    <!-- 预留：标签筛选 / 搜索 / 分页                                   -->
    <!-- 第一版不实现，仅保留结构占位                                    -->
    <!-- ============================================================ -->

    <!-- 文章列表 -->
    <section v-if="posts?.length">
      <div class="divide-y divide-border">
        <BlogPostCard
          v-for="post in posts"
          :key="post.path"
          :title="post.title"
          :description="post.description"
          :date="post.date"
          :tags="post.tags"
          :path="post.path"
          class="py-6 first:pt-0 last:pb-0"
        />
      </div>
    </section>

    <!-- 空状态 -->
    <section v-else class="py-20 text-center">
      <p class="text-muted">还没有文章，敬请期待。</p>
    </section>
  </div>
</template>
