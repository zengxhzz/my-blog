<script setup lang="ts">
const { data: rawProjects } = await useAsyncData('projects-list', () =>
  queryCollection('projects').all()
)

// featured 置顶，同年份按 name 排序
const projects = computed(() => {
  const list = rawProjects.value ?? []
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return (b.year ?? 0) - (a.year ?? 0)
  })
})

const statusLabel: Record<string, string> = {
  active: '活跃',
  archived: '已归档',
  wip: '开发中',
}

useSeoMeta({
  title: '项目',
  description: '我做过的个人项目与开源作品。',
})
</script>

<template>
  <div class="space-y-10">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold tracking-tight">项目</h1>
      <p class="text-muted">
        个人项目与开源作品。大部分是解决自己遇到的问题，顺便开源出来。
      </p>
    </header>

    <!-- 项目列表 -->
    <section v-if="projects.length">
      <div class="grid gap-4 sm:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.name"
          class="rounded-lg border border-border bg-card p-5"
        >
          <!-- 名称 + featured 标记 -->
          <div class="flex items-center gap-2">
            <h2 class="font-medium">
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors hover:text-accent"
              >
                {{ project.name }}
              </a>
              <span v-else>{{ project.name }}</span>
            </h2>

            <span
              v-if="project.featured"
              class="rounded border border-border px-1.5 py-px font-mono text-xs text-accent"
            >
              featured
            </span>
          </div>

          <!-- 描述 -->
          <p class="mt-2 text-sm leading-relaxed text-muted">
            {{ project.description }}
          </p>

          <!-- 技术标签 -->
          <ul v-if="project.tech?.length" class="mt-3 flex flex-wrap gap-1.5">
            <li
              v-for="t in project.tech"
              :key="t"
              class="rounded border border-border px-1.5 py-px font-mono text-xs text-muted"
            >
              {{ t }}
            </li>
          </ul>

          <!-- 底部元信息 -->
          <div
            class="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted"
          >
            <span v-if="project.year">{{ project.year }}</span>

            <span
              v-if="project.status"
              class="rounded border border-border px-1.5 py-px"
            >
              {{ statusLabel[project.status] ?? project.status }}
            </span>

            <a
              v-if="project.repo"
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-accent"
            >
              GitHub →
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- 空状态 -->
    <section v-else class="py-20 text-center">
      <p class="text-muted">还没有项目，敬请期待。</p>
    </section>
  </div>
</template>
