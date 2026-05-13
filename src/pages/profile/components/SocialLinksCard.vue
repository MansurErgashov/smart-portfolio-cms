<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Form, FormItem, Card, Upload, message } from 'ant-design-vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { profileMock } from '@/pages/profile/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ triggerSave: number }>()

const emit = defineEmits<{
  (e: 'submit', data: typeof formState): void
}>()

const formRef = ref()
const resumeName = ref<string | null>(null)

const formState = reactive({
  github: profileMock.github,
  linkedin: profileMock.linkedin,
  telegram: profileMock.telegram,
  resume: null as File | null,
})

const rules: Record<string, Rule[]> = {
  github: [{ type: 'url', message: "URL noto'g'ri", trigger: 'blur' }],
  linkedin: [{ type: 'url', message: "URL noto'g'ri", trigger: 'blur' }],
}

function beforeResumeUpload(file: File) {
  if (file.type !== 'application/pdf') {
    message.error('Faqat PDF yuklang!')
    return false
  }
  formState.resume = file
  resumeName.value = file.name
  return false
}

watch(
  () => props.triggerSave,
  (val) => {
    if (!val) return
    formRef.value
      ?.validate()
      .then(() => {
        emit('submit', { ...formState })
      })
      .catch(() => {})
  },
)
</script>

<template>
  <Form ref="formRef" :model="formState" :rules="rules" layout="vertical">
    <Card class="!rounded-xl !border-slate-100">
      <p class="text-slate-700 font-semibold text-base mb-4">Ijtimoiy tarmoqlar</p>
      <div class="grid grid-cols-12 gap-x-4 gap-y-3">
        <FormItem name="github" class="col-span-6 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="github" class="text-xs font-medium text-slate-500">GitHub</label>
            <BaseInput
              id="github"
              v-model="formState.github"
              placeholder="https://github.com/username"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="linkedin" class="col-span-6 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="linkedin" class="text-xs font-medium text-slate-500">LinkedIn</label>
            <BaseInput
              id="linkedin"
              v-model="formState.linkedin"
              placeholder="https://linkedin.com/in/username"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="telegram" class="col-span-6 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="telegram" class="text-xs font-medium text-slate-500">Telegram</label>
            <BaseInput
              id="telegram"
              v-model="formState.telegram"
              placeholder="@username"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="resume" class="col-span-6 !mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500">CV (PDF)</label>
            <div class="flex items-center gap-2">
              <Upload :before-upload="beforeResumeUpload" :show-upload-list="false" accept=".pdf">
                <BaseButton type="default" size="middle">CV yuklash</BaseButton>
              </Upload>
              <span v-if="resumeName" class="text-xs text-slate-400 truncate max-w-[120px]">{{
                resumeName
              }}</span>
            </div>
          </div>
        </FormItem>
      </div>
    </Card>
  </Form>
</template>
