<template>
  <Pagination
    :defaultCurrent="modelValue"
    :responsive="true"
    @change="onChange"
    :default-page-size="pageSize"
    :show-size-changer="showSizeChanger"
    :page-size="pageSize"
    :total="total"
    :current="modelValue"
    :size="size"
  />
</template>
<script lang="ts" setup>
import { Pagination } from 'ant-design-vue'
import type { PropType } from 'vue'

defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 50,
  },
  showSizeChanger: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'small' | 'default'>,
    default: 'default',
  },
})

const emit = defineEmits(['update:modelValue', 'update:pageSize', 'changed'])

function onChange(page: number, pSize: number) {
  // console.log('size: ', page, pSize)
  emit('update:modelValue', page)
  // emit('changed', page)
  emit('changed', page, pSize)
}
</script>
