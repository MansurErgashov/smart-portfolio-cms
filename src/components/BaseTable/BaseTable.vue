<script setup lang="ts">
import { Table } from 'ant-design-vue'
import { type TableProps } from 'ant-design-vue/es/table'
import { computed, useSlots } from 'vue'
// interface PropsInterface extends TableProps {
//   currentPage: number
//   limit?: number
//   emptyText?: string
//   rowSelection?: TableProps['rowSelection']
//   showIndex?: boolean
// }

interface PropsInterface extends TableProps {
  currentPage: number
  limit?: number
  emptyText?: string
  rowSelection?: TableProps['rowSelection']
  showIndex?: boolean
  expandedRowKeys?: string[]
  rowExpandable?: (record: Record<string, unknown>) => boolean
}

const props = withDefaults(defineProps<PropsInterface>(), {
  showIndex: true,
})

const slots = useSlots()

const hasExpandedRow = computed(() => !!slots.expandedRowRender)
const { limit = 10, columns } = props
// const columnsC = computed(() => {
//   return [{ title: '№', key: 'numberIndex', dataIndex: 'numberIndex', width: 50 }].concat(
//     columns as []
//   )
// })
const columnsC = computed(() => {
  if (!props.showIndex || hasExpandedRow.value) return columns as []
  return [{ title: '№', key: 'numberIndex', dataIndex: 'numberIndex', width: 50 }].concat(
    columns as [],
  )
})

const dataSourceData = computed(() => {
  return props.dataSource?.map((item: unknown, index: number) => {
    if (!props.showIndex || hasExpandedRow.value) return item
    return {
      ...(item as { numberIndex: number }),
      numberIndex: +((props.currentPage - 1) * limit + index + 1),
    }
  })
})

const locale = computed(() => (props.emptyText ? { emptyText: props.emptyText } : undefined))
</script>

<template>
  <Table
    :pagination="false"
    :data-source="dataSourceData"
    :columns="columnsC"
    :bordered="true"
    :loading
    :size
    :row-key="rowKey"
    :locale="locale"
    :row-selection
    :expanded-row-keys="expandedRowKeys"
    :row-expandable="rowExpandable"
    @expand="(...args) => $emit('expand', ...args)"
  >
    <template v-if="$slots.title" #title="{ column }">
      <slot name="title" :column></slot>
    </template>
    <template #headerCell="{ column }">
      <slot name="headerCell" :column></slot>
    </template>
    <template #expandedRowRender="{ record }" v-if="$slots.expandedRowRender">
      <slot name="expandedRowRender" :record></slot>
    </template>
    <template #bodyCell="{ column, index, record, text, value }">
      <slot name="bodyCell" :column :index :record :text :value></slot>
    </template>
  </Table>
</template>

<style scoped>
:global(.ant-table-thead .ant-table-cell) {
  color: #181818 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 150% !important;
  text-overflow: ellipsis !important;
}
</style>
