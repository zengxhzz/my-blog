<script setup lang="ts">
const open = ref(false)
const route = useRoute()

watch(
  () => route.path,
  () => {
    open.value = false
  },
)

const links = [
  { to: '/', label: '首页' },
  { to: '/blog', label: '文章' },
  { to: '/projects', label: '项目' },
  { to: '/about', label: '关于' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line/70 bg-surface-0/80 backdrop-blur">
    <nav class="mx-auto flex h-14 max-w-3xl items-center justify-between px-5" aria-label="主导航">
      <NuxtLink to="/" class="font-semibold tracking-tight text-ink">
        k1sakityan.
      </NuxtLink>

      <div class="flex items-center gap-1">
        <div class="hidden items-center gap-1 sm:flex">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-3 py-2 text-sm text-ink-2 transition hover:bg-accent-soft hover:text-ink"
            active-class="font-medium text-ink"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <ColorModeToggle />

        <button
          type="button"
          class="inline-flex size-10 items-center justify-center rounded-lg text-ink-2 transition hover:bg-accent-soft hover:text-ink sm:hidden"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="open ? '关闭菜单' : '打开菜单'"
          @click="open = !open"
        >
          <svg v-if="!open" viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <div v-show="open" id="mobile-nav" class="border-t border-line/70 px-5 py-2 sm:hidden">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block rounded-lg px-3 py-3 text-sm text-ink-2 transition hover:bg-accent-soft hover:text-ink"
        active-class="font-medium text-ink"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
  </header>
</template>
