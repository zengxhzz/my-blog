<script setup lang="ts">
const progress = ref(0)
let raf = 0

function update() {
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  progress.value = max > 0 ? Math.min(el.scrollTop / max, 1) : 0
}

function schedule() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5" aria-hidden="true">
    <div
      class="h-full origin-left bg-accent-strong transition-transform duration-75 ease-out motion-reduce:transition-none"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>
