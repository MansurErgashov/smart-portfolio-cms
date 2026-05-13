<script setup lang="ts">
import { Tag } from 'ant-design-vue'

defineProps<{
  color?: string
  closable?: boolean
  bordered?: boolean
}>()
</script>

<template>
  <Tag v-bind="$attrs" :bordered :closable :color>
    <slot></slot>
  </Tag>
</template>
