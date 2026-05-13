<script setup lang="ts">
import { DatePicker, type DatePickerProps } from 'ant-design-vue'
import { type Dayjs } from 'dayjs'
// import  "dayjs/locale/uz"
import { useAttrs } from 'vue'
const model = defineModel<Dayjs | undefined>()
const attrs = useAttrs()
const emit = defineEmits(['change'])
const {
  allowClear = true,
  bordered = true,
  size = 'middle',
  open = undefined,
  mode = 'date',
  placeholder = 'Sana tanlang',
} = defineProps<DatePickerProps>()
</script>

<template>
  <DatePicker
    v-bind="attrs"
    @change="emit('change', $event)"
    :allowClear
    :autofocus
    :bordered
    :dateRender
    :disabled
    :disabledDate
    :format
    :inputReadOnly
    :mode
    :open
    :picker
    :placeholder
    :popupStyle
    :presets
    :size
    :valueFormat
    v-model:value="model"
    :showTime
  ></DatePicker>
</template>

<style scoped></style>
