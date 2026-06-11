<script setup lang="ts">
interface PostLike {
  path: string
  title: string
  description?: string
  date?: string
  tags?: string[]
  body?: unknown
}

const props = defineProps<{ post: PostLike }>()

const minutes = computed(() => readingTime(props.post.body))
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="group block rounded-card border border-line bg-surface-1 p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover motion-reduce:hover:translate-y-0"
  >
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-3">
      <time v-if="post.date" :datetime="post.date">{{ formatDate(post.date) }}</time>
      <span aria-hidden="true">·</span>
      <span>约 {{ minutes }} 分钟</span>
    </div>

    <h3 class="mt-2 text-lg font-semibold leading-snug text-ink transition group-hover:text-accent-strong">
      {{ post.title }}
    </h3>

    <p v-if="post.description" class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-2">
      {{ post.description }}
    </p>

    <ul v-if="post.tags?.length" class="mt-3 flex flex-wrap gap-2">
      <li
        v-for="tag in post.tags"
        :key="tag"
        class="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-ink-2"
      >
        #{{ tag }}
      </li>
    </ul>
  </NuxtLink>
</template>
