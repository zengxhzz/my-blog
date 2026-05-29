<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all()
)
</script>

<template>
  <div class="p-10">
    <h1 class="text-3xl font-bold underline">检查清单</h1>
    <p class="mt-4 text-accent font-mono">Tailwind token 生效</p>
    <ul class="mt-6 list-disc pl-6">
      <li v-for="post in posts" :key="post.path">
        {{ post.title }} —— {{ post.date }}
      </li>
    </ul>
  </div>
</template>
