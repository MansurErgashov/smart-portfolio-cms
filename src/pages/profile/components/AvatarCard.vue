<script setup lang="ts">
import { ref } from 'vue'
import { Card, Divider, Upload, message } from 'ant-design-vue'
import { PlusOutlined, EditOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  fullName: string
  profession: string
  address: string
  github: string
  linkedin: string
}>()

const emit = defineEmits<{
  (e: 'update:avatar', file: File): void
}>()

const avatarUrl = ref<string | null>(null)

function beforeAvatarUpload(file: File) {
  if (!file.type.startsWith('image/')) {
    message.error('Faqat rasm yuklang!')
    return false
  }
  avatarUrl.value = URL.createObjectURL(file)
  emit('update:avatar', file)
  return false
}
</script>

<template>
  <Card class="!rounded-xl !border-slate-100">
    <div class="flex flex-col items-center gap-4 py-2">
      <Upload :before-upload="beforeAvatarUpload" :show-upload-list="false" accept="image/*">
        <div class="relative cursor-pointer">
          <div
            class="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden"
            style="box-shadow: 0 0 0 3px #e0e7ff"
          >
            <img v-if="avatarUrl" :src="avatarUrl" class="w-full h-full object-cover" />
            <PlusOutlined v-else style="font-size: 28px; color: #818cf8" />
          </div>
          <div
            v-if="avatarUrl"
            class="absolute bottom-0 right-0 w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center"
          >
            <EditOutlined style="font-size: 13px; color: #fff" />
          </div>
        </div>
      </Upload>

      <div class="text-center">
        <p class="text-slate-800 font-semibold text-base">{{ props.fullName || 'Ism Familiya' }}</p>
        <p class="text-slate-400 text-sm mt-0.5">{{ props.profession || 'Kasb' }}</p>
        <span
          class="inline-block mt-2 text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full"
        >
          ⭐ 185 ball
        </span>
      </div>

      <Divider class="!my-1" />

      <div class="w-full space-y-2 text-sm">
        <div class="flex items-center gap-2 text-slate-500">
          <span>📍</span>
          <span>{{ props.address || '—' }}</span>
        </div>
        <div class="flex items-center gap-2 text-slate-500">
          <GithubOutlined />
          <a :href="props.github" target="_blank" class="text-indigo-500 hover:underline truncate">
            {{ props.github || '—' }}
          </a>
        </div>
        <div class="flex items-center gap-2 text-slate-500">
          <LinkedinOutlined />
          <a
            :href="props.linkedin"
            target="_blank"
            class="text-indigo-500 hover:underline truncate"
          >
            {{ props.linkedin || '—' }}
          </a>
        </div>
      </div>
    </div>
  </Card>
</template>
