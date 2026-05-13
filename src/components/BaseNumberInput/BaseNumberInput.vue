<template>
  <Input
    v-bind="attrs"
    v-model:value="model"
    :type="'text'"
    inputmode="numeric"
    :addonAfter
    :addonBefore
    :allowClear
    :bordered="true"
    :clearIcon
    :defaultValue
    :disabled
    :id
    :prefix
    :showCount
    :status
    :size="size"
    :suffix
    :readonly
    :placeholder
    @change="(e: Event) => emit('change', e)"
    @input="handleInput"
  >
    <template #addonAfter v-if="slots['addonAfter']"><slot name="addonAfter"></slot></template>
    <template #prefix v-if="slots['prefix']"><slot name="prefix"></slot></template>
    <template #suffix v-if="slots['suffix']"><slot name="suffix"></slot></template>
  </Input>
</template>

<script setup lang="ts">
import { Input } from 'ant-design-vue'
import type { InputProps } from 'ant-design-vue/es/vc-input/inputProps'
import { useAttrs, useSlots } from 'vue'

const slots = useSlots() as Record<string, unknown>

interface Props extends InputProps {
  maxlength?: number
  readonly?: boolean
}

const { size = 'large', maxlength } = defineProps<Props>()
const model = defineModel<number | string>()
const attrs = useAttrs()
const emit = defineEmits(['change', 'input'])

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  let value = target.value.replace(/[^0-9]/g, '')

  if (maxlength && value.length > maxlength) {
    value = value.slice(0, maxlength)
  }

  target.value = value
  model.value = value
  emit('input', value)
}
</script>
