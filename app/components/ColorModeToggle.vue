<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="inline-flex size-10 items-center justify-center rounded-lg text-ink-2 transition hover:bg-accent-soft hover:text-ink"
      :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
      @click="toggle"
    >
      <!-- 暗色时显示太阳 -->
      <svg v-if="isDark" viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <!-- 亮色时显示月亮 -->
      <svg v-else viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
    <template #fallback>
      <span class="inline-block size-10" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>
