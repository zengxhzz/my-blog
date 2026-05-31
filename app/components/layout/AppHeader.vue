<script setup lang="ts">
const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur"
  >
    <div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
      <!-- 站名（文字 logo） -->
      <NuxtLink
        to="/"
        class="font-mono text-base font-semibold tracking-tight transition-colors hover:text-accent"
        @click="isMenuOpen = false"
      >
        k1sakityan<span class="text-accent">.</span>
      </NuxtLink>

      <!-- 桌面端导航 -->
      <nav class="hidden items-center gap-6 sm:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm text-muted transition-colors hover:text-foreground"
          active-class="text-foreground"
        >
          {{ link.label }}
        </NuxtLink>

        <!-- 暗色切换按钮：占位，暂不实现逻辑 -->
        <button
          type="button"
          aria-label="切换暗色模式（暂未实现）"
          class="rounded-md border border-border p-1.5 text-muted transition-colors hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>
      </nav>

      <!-- 移动端汉堡按钮 -->
      <button
        type="button"
        class="p-2 -mr-2 text-muted transition-colors hover:text-foreground sm:hidden"
        :aria-expanded="isMenuOpen"
        aria-label="打开导航菜单"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-if="!isMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </div>

    <!-- 移动端展开菜单 -->
    <nav
      v-if="isMenuOpen"
      class="border-t border-border px-6 py-4 sm:hidden"
    >
      <div class="flex flex-col">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="py-2 text-sm text-muted transition-colors hover:text-foreground"
          active-class="text-foreground"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
