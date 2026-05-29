<script setup lang="ts">
defineProps<{
  siteName?: string
}>()

const navLinks = [
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
]

const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
    <div class="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-6">
      <!-- 站名 -->
      <NuxtLink to="/" class="text-lg font-semibold tracking-tight text-foreground">
        {{ siteName ?? 'Zeng\'s Blog' }}
      </NuxtLink>

      <!-- 桌面导航 -->
      <nav class="hidden items-center gap-6 sm:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm text-muted transition-colors hover:text-foreground"
        >
          {{ link.label }}
        </NuxtLink>

        <!-- 暗色切换占位 -->
        <button
          type="button"
          class="ml-2 rounded p-1.5 text-muted hover:text-foreground"
          aria-label="Toggle dark mode"
          disabled
        >
          <span class="text-sm">🌙</span>
        </button>
      </nav>

      <!-- 移动端菜单按钮 -->
      <button
        type="button"
        class="inline-flex items-center justify-center rounded p-1.5 text-muted sm:hidden"
        aria-label="Toggle mobile menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span v-if="!mobileOpen" class="text-xl leading-none">☰</span>
        <span v-else class="text-xl leading-none">✕</span>
      </button>
    </div>

    <!-- 移动端折叠菜单 -->
    <div v-if="mobileOpen" class="border-t border-border sm:hidden">
      <nav class="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm text-muted transition-colors hover:text-foreground"
          @click="closeMobile"
        >
          {{ link.label }}
        </NuxtLink>
        <button
          type="button"
          class="self-start rounded p-1.5 text-muted hover:text-foreground"
          aria-label="Toggle dark mode"
          disabled
        >
          <span class="text-sm">🌙 Dark</span>
        </button>
      </nav>
    </div>
  </header>
</template>
