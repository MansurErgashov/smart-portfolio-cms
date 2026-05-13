<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import BaseTag from '@/components/BaseTag/BaseTag.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import type { Blog } from '@/pages/blog/mockData'

const props = defineProps<{ blogs: Blog[] }>()

const emit = defineEmits<{
  (e: 'edit', blog: Blog): void
  (e: 'delete', id: number): void
}>()

const router = useRouter()

const columns = [
  { title: 'Sarlavha', dataIndex: 'title', key: 'title' },
  { title: 'Kategoriya', dataIndex: 'category', key: 'category', width: 120 },
  { title: 'Teglar', key: 'tags', width: 180 },
  { title: 'Status', key: 'status', width: 110 },
  { title: "Ko'rishlar", key: 'views', width: 100 },
  { title: 'Sana', dataIndex: 'createdAt', key: 'createdAt', width: 110 },
  { title: 'Amal', key: 'action', width: 110 },
]
</script>

<template>
  <BaseTable
    :data-source="props.blogs"
    :columns="columns"
    :current-page="1"
    row-key="id"
    size="middle"
  >
    <template #bodyCell="{ column, record }">
      <!-- Title -->
      <template v-if="column.key === 'title'">
        <p class="text-slate-800 font-medium text-sm line-clamp-1">{{ (record as Blog).title }}</p>
      </template>

      <!-- Category -->
      <template v-else-if="column.key === 'category'">
        <BaseTag color="blue">{{ (record as Blog).category }}</BaseTag>
      </template>

      <!-- Tags -->
      <template v-else-if="column.key === 'tags'">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="tag in (record as Blog).tags.slice(0, 2)"
            :key="tag"
            class="bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded-full"
          >
            {{ tag }}
          </span>
          <span
            v-if="(record as Blog).tags.length > 2"
            class="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full"
          >
            +{{ (record as Blog).tags.length - 2 }}
          </span>
        </div>
      </template>

      <!-- Status -->
      <template v-else-if="column.key === 'status'">
        <BaseTag :color="(record as Blog).published ? 'green' : 'orange'">
          {{ (record as Blog).published ? 'Nashr' : 'Qoralama' }}
        </BaseTag>
      </template>

      <!-- Views -->
      <template v-else-if="column.key === 'views'">
        <span class="text-xs text-slate-500">👁 {{ (record as Blog).views }}</span>
      </template>

      <!-- Actions -->
      <template v-else-if="column.key === 'action'">
        <div class="flex items-center gap-1">
          <BaseButton type="text" size="small" @click="router.push(`/blog/${(record as Blog).id}`)">
            <EyeOutlined class="text-slate-400 hover:text-indigo-500" />
          </BaseButton>
          <BaseButton type="text" size="small" @click="emit('edit', record as Blog)">
            <EditOutlined class="text-slate-400 hover:text-indigo-500" />
          </BaseButton>
          <Popconfirm
            title="O'chirishni tasdiqlaysizmi?"
            ok-text="Ha"
            cancel-text="Yo'q"
            @confirm="emit('delete', (record as Blog).id)"
          >
            <BaseButton type="text" size="small">
              <DeleteOutlined class="text-slate-400 hover:text-red-500" />
            </BaseButton>
          </Popconfirm>
        </div>
      </template>
    </template>
  </BaseTable>
</template>
