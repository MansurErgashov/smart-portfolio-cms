<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { getPlatform } from '@/pages/social-links/mockData'
import type { SocialLink } from '@/pages/social-links/mockData'

const props = defineProps<{ link: SocialLink }>()

const emit = defineEmits<{
  (e: 'edit', link: SocialLink): void
  (e: 'delete', id: number): void
}>()

const platform = getPlatform(props.link.platform)
</script>

<template>
  <div class="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-3">
    <!-- Top -->
    <div class="flex items-start justify-between gap-2">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
        :class="platform?.color"
      >
        {{ platform?.icon }}
      </div>
      <div class="flex items-center gap-1 flex-shrink-0">
        <BaseButton type="text" size="small" @click="emit('edit', props.link)">
          <EditOutlined class="text-slate-400 hover:text-indigo-500" />
        </BaseButton>
        <Popconfirm
          title="O'chirishni tasdiqlaysizmi?"
          ok-text="Ha"
          cancel-text="Yo'q"
          @confirm="emit('delete', props.link.id)"
        >
          <BaseButton type="text" size="small">
            <DeleteOutlined class="text-slate-400 hover:text-red-500" />
          </BaseButton>
        </Popconfirm>
      </div>
    </div>

    <!-- Info -->
    <div>
      <p class="text-slate-800 font-semibold text-sm">{{ platform?.label }}</p>
      <a
        :href="props.link.url.startsWith('http') ? props.link.url : `https://${props.link.url}`"
        target="_blank"
        class="text-indigo-500 text-xs hover:underline truncate block mt-0.5"
      >
        {{ props.link.url }}
      </a>
    </div>
  </div>
</template>
