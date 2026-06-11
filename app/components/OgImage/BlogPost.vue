<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'k1sakityan.',
    description: '',
  },
)
</script>

<template>
  <div
    style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding: 64px; background: linear-gradient(135deg, #E6F7FF 0%, #CFEBFF 100%); font-family: 'Noto Sans SC';"
  >
    <div style="display: flex; align-items: center;">
      <div style="display: flex; width: 20px; height: 20px; border-radius: 9999px; background-color: #89C2FF;" />
      <div style="display: flex; margin-left: 14px; font-size: 28px; font-weight: 700; color: #1C3A52;">
        k1sakityan.
      </div>
    </div>

    <div style="display: flex; flex-direction: column;">
      <div
        style="display: flex; max-width: 1000px; font-size: 58px; font-weight: 700; line-height: 1.3; color: #16324A;"
      >
        {{ title }}
      </div>
      <div
        v-if="description"
        style="display: flex; max-width: 920px; margin-top: 22px; font-size: 26px; line-height: 1.5; color: #44617B;"
      >
        {{ description }}
      </div>
    </div>

    <div style="display: flex; width: 220px; height: 10px; border-radius: 9999px; background-color: #89C2FF;" />
  </div>
</template>
