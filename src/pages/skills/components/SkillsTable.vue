<!-- <script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import BaseTag from '@/components/BaseTag/BaseTag.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import type { Skill } from '@/pages/skills/mockData'

const props = defineProps<{ skills: Skill[] }>()

const emit = defineEmits<{
  (e: 'edit', skill: Skill): void
  (e: 'delete', id: number): void
}>()

const categoryColors: Record<string, string> = {
  Frontend: 'blue',
  Backend: 'green',
  'UI/UX': 'purple',
  DevOps: 'orange',
  Mobile: 'cyan',
  Other: 'default',
}

const columns = [
  { title: 'Skill', dataIndex: 'name', key: 'name' },
  { title: 'Kategoriya', dataIndex: 'category', key: 'category' },
  { title: 'Daraja', dataIndex: 'level', key: 'level' },
  { title: 'Amal', key: 'action', width: 100 },
]
</script>

<template>
  <BaseTable
    :data-source="props.skills"
    :columns="columns"
    :current-page="1"
    row-key="id"
    size="middle"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'category'">
        <BaseTag :color="categoryColors[record.category] ?? 'default'">
          {{ record.category }}
        </BaseTag>
      </template>

      <template v-else-if="column.key === 'level'">
        <div class="flex items-center gap-2">
          <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full bg-indigo-500"
              :style="{ width: `${record.level}%` }"
            ></div>
          </div>
          <span class="text-xs font-semibold text-slate-500 w-8 text-right">
            {{ record.level }}%
          </span>
        </div>
      </template>

      <template v-else-if="column.key === 'action'">
        <div class="flex items-center gap-1">
          <BaseButton type="text" size="small" @click="emit('edit', record)">
            <EditOutlined class="text-slate-400 hover:text-indigo-500" />
          </BaseButton>
          <Popconfirm
            title="O'chirishni tasdiqlaysizmi?"
            ok-text="Ha"
            cancel-text="Yo'q"
            @confirm="emit('delete', record.id)"
          >
            <BaseButton type="text" size="small">
              <DeleteOutlined class="text-slate-400 hover:text-red-500" />
            </BaseButton>
          </Popconfirm>
        </div>
      </template>
    </template>
  </BaseTable>
</template> -->

<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import BaseTag from '@/components/BaseTag/BaseTag.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import type { Skill } from '@/pages/skills/mockData'

const props = defineProps<{ skills: Skill[] }>()

const emit = defineEmits<{
  (e: 'edit', skill: Skill): void
  (e: 'delete', id: number): void
}>()

const categoryColors: Record<string, string> = {
  Frontend: 'blue',
  Backend: 'green',
  'UI/UX': 'purple',
  DevOps: 'orange',
  Mobile: 'cyan',
  Other: 'default',
}

const columns = [
  { title: 'Skill', dataIndex: 'name', key: 'name' },
  { title: 'Kategoriya', dataIndex: 'category', key: 'category' },
  { title: 'Daraja', dataIndex: 'level', key: 'level' },
  { title: 'Amal', key: 'action', width: 100 },
]
</script>

<template>
  <BaseTable
    :data-source="props.skills"
    :columns="columns"
    :current-page="1"
    row-key="id"
    size="middle"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'category'">
        <BaseTag :color="categoryColors[record.category] ?? 'default'">
          {{ record.category }}
        </BaseTag>
      </template>

      <template v-else-if="column.key === 'level'">
        <div class="flex items-center gap-2">
          <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full bg-indigo-500"
              :style="{ width: `${record.level}%` }"
            ></div>
          </div>
          <span class="text-xs font-semibold text-slate-500 w-8 text-right">
            {{ record.level }}%
          </span>
        </div>
      </template>

      <template v-else-if="column.key === 'action'">
        <div class="flex items-center gap-1">
          <BaseButton type="text" size="small" @click="emit('edit', record as Skill)">
            <EditOutlined class="text-slate-400 hover:text-indigo-500" />
          </BaseButton>
          <Popconfirm
            title="O'chirishni tasdiqlaysizmi?"
            ok-text="Ha"
            cancel-text="Yo'q"
            @confirm="emit('delete', (record as Skill).id)"
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
