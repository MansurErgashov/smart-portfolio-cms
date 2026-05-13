<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BaseTag from '@/components/BaseTag/BaseTag.vue'
import type { Experience } from '@/pages/experience/mockData'

const props = defineProps<{ experiences: Experience[] }>()

const emit = defineEmits<{
  (e: 'edit', experience: Experience): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="relative">
    <!-- Vertikal chiziq -->
    <div class="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100" />

    <div class="flex flex-col gap-6">
      <div v-for="exp in props.experiences" :key="exp.id" class="relative flex gap-4">
        <!-- Circle -->
        <div class="relative z-10 flex-shrink-0">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold"
            :class="
              exp.isCurrent
                ? 'bg-indigo-50 border-indigo-400 text-indigo-500'
                : 'bg-white border-slate-200 text-slate-400'
            "
          >
            {{ exp.company.charAt(0).toUpperCase() }}
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
          <div class="flex items-start justify-between gap-2 p-2">
            <!-- Left info -->
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-slate-800 font-semibold text-sm">{{ exp.company }}</h3>
                <BaseTag :color="exp.isCurrent ? 'green' : 'default'">
                  {{ exp.isCurrent ? 'Hozirgi' : 'Tugallangan' }}
                </BaseTag>
              </div>
              <p class="text-indigo-500 text-sm font-medium mt-0.5">{{ exp.position }}</p>
              <p class="text-slate-400 text-xs mt-1">
                {{ exp.startDate }}
                →
                {{ exp.isCurrent ? 'Hozir' : exp.endDate || '—' }}
              </p>
              <p v-if="exp.description" class="text-slate-500 text-sm mt-2 leading-relaxed">
                {{ exp.description }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-1 flex-shrink-0">
              <BaseButton type="text" size="small" @click="emit('edit', exp)">
                <EditOutlined class="text-slate-400 hover:text-indigo-500" />
              </BaseButton>
              <Popconfirm
                title="O'chirishni tasdiqlaysizmi?"
                ok-text="Ha"
                cancel-text="Yo'q"
                @confirm="emit('delete', exp.id)"
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
        v-if="!props.experiences.length"
        class="flex flex-col items-center gap-2 py-12 text-slate-400"
      >
        <EnvironmentOutlined style="font-size: 32px" />
        <p class="text-sm">Hali ish tajribasi qo'shilmagan</p>
      </div>
    </div>
  </div>
</template>
