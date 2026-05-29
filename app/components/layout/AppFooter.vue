<script setup lang="ts">
defineProps<{
  githubUrl?: string
  email?: string
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border">
    <div class="mx-auto flex max-w-3xl items-center justify-between px-5 py-6 text-sm text-muted sm:px-6">
      <span>&copy; {{ currentYear }} Zeng&rsquo;s Blog</span>
      <span class="flex items-center gap-4">
        <a
          :href="githubUrl ?? 'https://github.com'"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-foreground"
        >
          GitHub
        </a>
        <a
          :href="email ? `mailto:${email}` : 'mailto:hello@example.com'"
          class="transition-colors hover:text-foreground"
        >
          Email
        </a>
      </span>
    </div>
  </footer>
</template>
