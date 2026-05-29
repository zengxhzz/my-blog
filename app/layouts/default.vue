<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <LayoutAppHeader />

    <main class="mx-auto w-full max-w-3xl flex-1 px-5 py-12 sm:px-6">
      <slot />
    </main>

    <LayoutAppFooter />
  </div>
</template>
