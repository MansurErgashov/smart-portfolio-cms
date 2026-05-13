<script setup lang="ts">
import { useSlots } from 'vue'
import { Input } from 'ant-design-vue'
import type { InputProps } from 'ant-design-vue/es/input'

const slots = useSlots() as Record<string, unknown>

interface Props extends InputProps {
  readonly?: boolean
}

const { size = 'large' } = defineProps<Props>()

const modelValue = defineModel<string>()
const emit = defineEmits(['change', 'input'])
</script>
<template>
  <Input
    v-bind="$attrs"
    v-model:value="modelValue"
    :addonAfter
    :addonBefore
    :allowClear
    :bordered="true"
    :clearIcon
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
    @change="($event: any) => emit('change', $event)"
    @input="($event: any) => emit('input', $event)"
    :readonly
  >
    <template #addonAfter v-if="slots['addonAfter']"><slot name="addonAfter"></slot></template>
    <template #prefix v-if="slots['prefix']"><slot name="prefix"></slot></template>
    <template #suffix v-if="slots['suffix']"><slot name="suffix"></slot></template>
    <template #clearIcon v-if="slots['clearIcon']"><slot name="clearIcon"></slot></template>
  </Input>
</template>
