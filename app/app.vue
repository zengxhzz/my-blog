<template>
  <div class="flex min-h-screen flex-col bg-surface-0 text-ink font-sans">
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
