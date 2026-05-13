<script setup lang="ts">
import { useSlots } from 'vue'
import { InputPassword } from 'ant-design-vue'
import type { InputProps } from 'ant-design-vue/es/input'

const slots = useSlots() as Record<string, unknown>

interface Props extends InputProps {
  readonly?: boolean
  visibilityToggle?: boolean
}

const { size = 'large', visibilityToggle = true } = defineProps<Props>()

const modelValue = defineModel<string | undefined>()
const emit = defineEmits(['change', 'input'])
</script>

<template>
  <InputPassword
    v-bind="$attrs"
    v-model:value="modelValue"
    :addonAfter
    :addonBefore
    :allowClear
    :bordered="true"
    :defaultValue
    :disabled
    :id
    :maxlength
    :prefix
    :showCount
    :status
    :size
    :suffix
    :type
    :placeholder
    :readonly
    :visibilityToggle
    autocomplete="new-password"
    @change="($event: any) => emit('change', $event)"
    @input="($event: any) => emit('input', $event)"
  >
    <template #addonAfter v-if="slots['addonAfter']"><slot name="addonAfter" /></template>
    <template #prefix v-if="slots['prefix']"><slot name="prefix" /></template>
    <template #suffix v-if="slots['suffix']"><slot name="suffix" /></template>
    <template #iconRender v-if="slots['iconRender']"><slot name="iconRender" /></template>
  </InputPassword>
</template>
