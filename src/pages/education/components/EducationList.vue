<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, ReadOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BaseTag from '@/components/BaseTag/BaseTag.vue'
import { degreeOptions } from '@/pages/education/mockData'
import type { Education } from '@/pages/education/mockData'

const props = defineProps<{ educations: Education[] }>()

const emit = defineEmits<{
  (e: 'edit', education: Education): void
  (e: 'delete', id: number): void
}>()

const degreeLabels = Object.fromEntries(degreeOptions.map((d) => [d.value, d.label]))
const degreeColors: Record<string, string> = {
  bachelor: 'blue',
  master: 'purple',
  phd: 'red',
  college: 'orange',
  course: 'cyan',
}
</script>

<template>
  <div class="relative">
    <div class="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

    <div class="flex flex-col gap-6">
      <div v-for="edu in props.educations" :key="edu.id" class="relative flex gap-4">
        <!-- Circle -->
        <div class="relative z-10 flex-shrink-0">
          <div
            class="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center"
          >
            <ReadOutlined style="font-size: 15px; color: #6366f1" />
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-slate-800 font-semibold text-sm">{{ edu.university }}</h3>
                <BaseTag :color="degreeColors[edu.degree] ?? 'default'">
                  {{ degreeLabels[edu.degree] ?? edu.degree }}
                </BaseTag>
              </div>
              <p v-if="edu.faculty" class="text-indigo-500 text-sm font-medium mt-0.5">
                {{ edu.faculty }}
              </p>
              <p class="text-slate-400 text-xs mt-1">
                {{ edu.startYear }} → {{ edu.endYear || 'Hozir' }}
              </p>
            </div>

            <div class="flex items-center gap-1 flex-shrink-0">
              <BaseButton type="text" size="small" @click="emit('edit', edu)">
                <EditOutlined class="text-slate-400 hover:text-indigo-500" />
              </BaseButton>
              <Popconfirm
                title="O'chirishni tasdiqlaysizmi?"
                ok-text="Ha"
                cancel-text="Yo'q"
                @confirm="emit('delete', edu.id)"
              >
                <BaseButton type="text" size="small">
                  <DeleteOutlined class="text-slate-400 hover:text-red-500" />
                </BaseButton>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>

      <!-- Bo'sh holat -->
      <div
        v-if="!props.educations.length"
        class="flex flex-col items-center gap-2 py-12 text-slate-400"
      >
        <ReadOutlined style="font-size: 32px" />
        <p class="text-sm">Hali ta'lim ma'lumoti qo'shilmagan</p>
      </div>
    </div>
  </div>
</template>
