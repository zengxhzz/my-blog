<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    code?: string
    language?: string | null
    filename?: string | null
    highlights?: number[]
    meta?: string | null
    class?: string | null
  }>(),
  {
    code: '',
    language: null,
    filename: null,
    highlights: () => [],
    meta: null,
    class: null,
  },
)

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 2000)
  }
  catch {
    /* 剪贴板不可用时静默失败 */
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <figure class="code-block not-prose my-7 overflow-hidden rounded-card border border-line bg-code-bg shadow-card">
    <figcaption class="flex items-center justify-between gap-3 border-b border-line/70 px-4 py-2">
      <span class="truncate font-mono text-xs text-ink-3">
        {{ filename || language || 'code' }}
      </span>
      <button
        type="button"
        class="inline-flex h-7 shrink-0 items-center rounded-md px-2.5 font-mono text-xs text-ink-3 transition hover:bg-accent-soft hover:text-ink"
        :aria-label="copied ? '已复制到剪贴板' : '复制代码'"
        @click="copy"
      >
        {{ copied ? '✓ 已复制' : '复制' }}
      </button>
    </figcaption>
    <pre :class="props.class"><slot /></pre>
  </figure>
</template>
