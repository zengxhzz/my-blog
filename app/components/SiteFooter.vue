<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line/70">
    <div
      class="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>© {{ year }} k1sakityan. 用 Nuxt 搭建。</p>
      <div class="flex items-center gap-5">
        <a
          href="https://github.com/zengxhzz"
          target="_blank"
          rel="noopener noreferrer"
          class="transition hover:text-accent-strong"
        >
          GitHub
        </a>
        <a href="/rss.xml" class="transition hover:text-accent-strong">RSS</a>
      </div>
    </div>
  </footer>
</template>
