<script setup lang="ts">
const year = new Date().getFullYear()

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/yourname' },
  { label: 'Email', href: 'mailto:you@example.com' },
]
</script>

<template>
  <footer class="border-t border-border">
    <div
      class="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
    >
      <p>© {{ year }} yourname · Built with Nuxt</p>

      <div class="flex gap-4">
        <a
          v-for="link in socialLinks"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="py-1 transition-colors hover:text-foreground"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>
