<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error?: NuxtError }>()

const isNotFound = computed(() => props.error?.statusCode === 404)

useHead({ title: isNotFound.value ? '页面未找到' : '出错了' })

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface-0 font-sans text-ink">
    <header class="border-b border-line/70">
      <div class="mx-auto flex h-14 max-w-3xl items-center px-5">
        <NuxtLink to="/" class="font-semibold tracking-tight">k1sakityan.</NuxtLink>
      </div>
    </header>

    <main class="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center">
      <p class="font-mono text-7xl font-bold text-accent" aria-hidden="true">
        {{ error?.statusCode ?? 404 }}
      </p>
      <h1 class="mt-5 text-xl font-semibold">
        {{ isNotFound ? '这一页好像不存在' : '出了点问题' }}
      </h1>
      <p class="mt-2 max-w-md leading-relaxed text-ink-2">
        {{ isNotFound ? '它可能被移动、改名,或者从未出现过。' : (error?.statusMessage || '请稍后再试。') }}
      </p>
      <button
        type="button"
        class="mt-8 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-contrast shadow-card transition hover:shadow-card-hover"
        @click="goHome"
      >
        返回首页
      </button>
    </main>
  </div>
</template>
