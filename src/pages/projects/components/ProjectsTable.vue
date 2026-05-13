<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, GithubOutlined, LinkOutlined } from '@ant-design/icons-vue'
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import BaseTag from '@/components/BaseTag/BaseTag.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { statusColors, statusLabels } from '@/pages/projects/mockData'
import type { Project } from '@/pages/projects/mockData'

const props = defineProps<{ projects: Project[] }>()

const emit = defineEmits<{
  (e: 'edit', project: Project): void
  (e: 'delete', id: number): void
}>()

const columns = [
  { title: 'Loyiha', dataIndex: 'title', key: 'title' },
  { title: 'Texnologiyalar', dataIndex: 'technologies', key: 'technologies' },
  { title: 'Sana', key: 'date' },
  { title: 'Status', dataIndex: 'status', key: 'status', width: 130 },
  { title: 'Links', key: 'links', width: 100 },
  { title: 'Amal', key: 'action', width: 90 },
]
</script>

<template>
  <BaseTable
    :data-source="props.projects"
    :columns="columns"
    :current-page="1"
    row-key="id"
    size="middle"
  >
    <template #bodyCell="{ column, record }">
      <!-- Title + description -->
      <template v-if="column.key === 'title'">
        <div>
          <p class="text-slate-800 font-medium text-sm">{{ (record as Project).title }}</p>
          <p class="text-slate-400 text-xs mt-0.5 line-clamp-1">
            {{ (record as Project).description }}
          </p>
        </div>
      </template>

      <!-- Technologies -->
      <template v-else-if="column.key === 'technologies'">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="tech in (record as Project).technologies.slice(0, 3)"
            :key="tech"
            class="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full"
          >
            {{ tech }}
          </span>
          <span
            v-if="(record as Project).technologies.length > 3"
            class="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full"
          >
            +{{ (record as Project).technologies.length - 3 }}
          </span>
        </div>
      </template>

      <!-- Date -->
      <template v-else-if="column.key === 'date'">
        <span class="text-xs text-slate-500">
          {{ (record as Project).startDate || '—' }}
          <template v-if="(record as Project).endDate">
            → {{ (record as Project).endDate }}</template
          >
        </span>
      </template>

      <!-- Status -->
      <template v-else-if="column.key === 'status'">
        <BaseTag :color="statusColors[(record as Project).status]">
          {{ statusLabels[(record as Project).status] }}
        </BaseTag>
      </template>

      <!-- Links -->
      <template v-else-if="column.key === 'links'">
        <div class="flex items-center gap-1">
          <a
            v-if="(record as Project).githubLink"
            :href="(record as Project).githubLink"
            target="_blank"
            class="text-slate-400 hover:text-slate-700"
          >
            <GithubOutlined style="font-size: 16px" />
          </a>
          <a
            v-if="(record as Project).demoLink"
            :href="(record as Project).demoLink"
            target="_blank"
            class="text-slate-400 hover:text-indigo-500"
          >
            <LinkOutlined style="font-size: 16px" />
          </a>
        </div>
      </template>

      <!-- Actions -->
      <template v-else-if="column.key === 'action'">
        <div class="flex items-center gap-1">
          <BaseButton type="text" size="small" @click="emit('edit', record as Project)">
            <EditOutlined class="text-slate-400 hover:text-indigo-500" />
          </BaseButton>
          <Popconfirm
            title="O'chirishni tasdiqlaysizmi?"
            ok-text="Ha"
            cancel-text="Yo'q"
            @confirm="emit('delete', (record as Project).id)"
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
