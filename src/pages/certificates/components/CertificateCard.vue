<script setup lang="ts">
import { Popconfirm, Tooltip } from 'ant-design-vue'
import {
  EditOutlined,
  DeleteOutlined,
  SafetyCertificateOutlined,
  LinkOutlined,
  FileOutlined,
} from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import type { Certificate } from '@/pages/certificates/mockData'

const props = defineProps<{ certificate: Certificate }>()

const emit = defineEmits<{
  (e: 'edit', certificate: Certificate): void
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
        <SafetyCertificateOutlined style="font-size: 16px; color: #6366f1" />
      </div>
      <div class="flex items-center gap-1 flex-shrink-0">
        <BaseButton type="text" size="small" @click="emit('edit', props.certificate)">
          <EditOutlined class="text-slate-400 hover:text-indigo-500" />
        </BaseButton>
        <Popconfirm
          title="O'chirishni tasdiqlaysizmi?"
          ok-text="Ha"
          cancel-text="Yo'q"
          @confirm="emit('delete', props.certificate.id)"
        >
          <BaseButton type="text" size="small">
            <DeleteOutlined class="text-slate-400 hover:text-red-500" />
          </BaseButton>
        </Popconfirm>
      </div>
    </div>

    <!-- Info -->
    <div>
      <h3 class="text-slate-800 font-semibold text-sm leading-tight">
        {{ props.certificate.name }}
      </h3>
      <p class="text-indigo-500 text-xs font-medium mt-0.5">{{ props.certificate.organization }}</p>
      <p class="text-slate-400 text-xs mt-1">{{ props.certificate.issueDate }}</p>
    </div>

    <!-- Links -->
    <div class="flex items-center gap-3 mt-auto pt-2 border-t border-slate-50">
      <Tooltip v-if="props.certificate.link" title="Sertifikatni ko'rish">
        <a
          :href="props.certificate.link"
          target="_blank"
          class="inline-flex items-center gap-1 text-xs text-indigo-500 hover:underline"
        >
          <LinkOutlined /> Link
        </a>
      </Tooltip>
      <Tooltip v-if="props.certificate.file" title="Faylni ko'rish">
        <a
          :href="props.certificate.file"
          target="_blank"
          class="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-500"
        >
          <FileOutlined /> Fayl
        </a>
      </Tooltip>
      <span v-if="!props.certificate.link && !props.certificate.file" class="text-xs text-slate-300"
        >—</span
      >
    </div>
  </div>
</template>
