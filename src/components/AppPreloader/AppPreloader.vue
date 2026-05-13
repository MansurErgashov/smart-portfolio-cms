<template>
  <div
    v-if="spinnning"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white"
  >
    <div class="flex flex-col items-center gap-4">
      <Spin></Spin>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Spin } from 'ant-design-vue'
defineProps({
  spinnning: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped></style>
