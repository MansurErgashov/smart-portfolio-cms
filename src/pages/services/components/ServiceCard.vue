<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import type { Service } from '@/pages/services/mockData'

const props = defineProps<{ service: Service }>()

const emit = defineEmits<{
  (e: 'edit', service: Service): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-3">
    <!-- Top -->
    <div class="flex items-start justify-between gap-2">
      <div
        class="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center flex-shrink-0"
      >
        <AppstoreOutlined style="font-size: 16px; color: #6366f1" />
      </div>
      <div class="flex items-center gap-1 flex-shrink-0">
        <BaseButton type="text" size="small" @click="emit('edit', props.service)">
          <EditOutlined class="text-slate-400 hover:text-indigo-500" />
        </BaseButton>
        <Popconfirm
          title="O'chirishni tasdiqlaysizmi?"
          ok-text="Ha"
          cancel-text="Yo'q"
          @confirm="emit('delete', props.service.id)"
        >
          <BaseButton type="text" size="small">
            <DeleteOutlined class="text-slate-400 hover:text-red-500" />
          </BaseButton>
        </Popconfirm>
      </div>
    </div>

    <!-- Info -->
    <div>
      <h3 class="text-slate-800 font-semibold text-sm">{{ props.service.name }}</h3>
      <p class="text-slate-400 text-xs mt-1 leading-relaxed">{{ props.service.description }}</p>
    </div>

    <!-- Price & Time -->
    <div class="flex items-center gap-4 mt-auto pt-2 border-t border-slate-50">
      <div class="flex items-center gap-1 text-xs font-semibold text-emerald-600">
        <DollarOutlined />
        <span>{{ props.service.price }}$</span>
      </div>
      <div class="flex items-center gap-1 text-xs text-slate-400">
        <ClockCircleOutlined />
        <span>{{ props.service.deliveryTime }}</span>
      </div>
    </div>
  </div>
</template>
