<script setup lang="ts">
import { Button } from 'ant-design-vue'
import type { ButtonProps } from 'ant-design-vue/es/button'

interface PropsInterface extends ButtonProps {
  bgColor?: string
  borderColor?: string
  form?: string
}
const { size = 'large', type = 'primary', loading = false } = defineProps<PropsInterface>()
</script>

<template>
  <Button
    v-bind="$attrs"
    @click="$emit('click')"
    :block
    :danger
    :disabled
    :ghost
    :href
    :htmlType
    :icon
    :loading
    :shape
    :size
    :target
    :type
    :form
  >
    <template #icon>
      <slot name="icon"></slot>
    </template>
    <slot></slot>
  </Button>
</template>
