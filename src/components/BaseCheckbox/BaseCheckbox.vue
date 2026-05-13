<script lang="ts" setup>
import { Checkbox, type CheckboxProps } from 'ant-design-vue'

interface Props extends CheckboxProps {
  size?: 'small' | 'middle' | 'large'
  isBordered?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'middle',
  isBordered: false,
})

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
  <Checkbox
    v-model:checked="modelValue"
    :disabled="disabled"
    :indeterminate="indeterminate"
    :class="isBordered ? 'border border-[#E3E4E7] border-solid h-[40px]' : ''"
    class="bg-white rounded-lg !px-1 flex !items-center"
  >
    <slot></slot>
  </Checkbox>
</template>
