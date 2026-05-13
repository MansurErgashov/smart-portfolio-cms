<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { Modal, Form, FormItem, Upload, message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import dayjs, { type Dayjs } from 'dayjs'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseDatePicker from '@/components/BaseDatePicker/BaseDatePicker.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import type { Certificate } from '@/pages/certificates/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ open: boolean; certificate: Certificate | null }>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'updated', data: Certificate): void
}>()

const formRef = ref()
const fileName = ref<string | null>(null)

const formState = reactive<Certificate>({
  id: 0,
  name: '',
  organization: '',
  issueDate: '',
  file: null,
  link: '',
})

watch(
  () => props.certificate,
  (val) => {
    if (val) Object.assign(formState, { ...val })
  },
  { immediate: true },
)

const issueDate = computed<Dayjs | undefined>({
  get: () => (formState.issueDate ? dayjs(formState.issueDate) : undefined),
  set: (val) => {
    formState.issueDate = val ? val.format('YYYY-MM-DD') : ''
  },
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Sertifikat nomini kiriting', trigger: 'blur' }],
  organization: [{ required: true, message: 'Tashkilotni kiriting', trigger: 'blur' }],
  issueDate: [{ required: true, message: 'Sanani kiriting', trigger: 'change' }],
}

function beforeFileUpload(file: File) {
  const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
  if (!allowed.includes(file.type)) {
    message.error('Faqat PDF yoki rasm yuklang!')
    return false
  }
  fileName.value = file.name
  formState.file = URL.createObjectURL(file)
  return false
}

function onSubmit() {
  formRef.value
    ?.validate()
    .then(() => {
      emit('updated', { ...formState })
      emit('update:open', false)
    })
    .catch(() => {})
}
</script>

<template>
  <Modal
    :open="props.open"
    title="Sertifikatni tahrirlash"
    :footer="null"
    width="500px"
    @cancel="emit('update:open', false)"
  >
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3">
        <FormItem name="name" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Sertifikat nomi <span class="text-red-400">*</span></label
            >
            <BaseInput
              v-model="formState.name"
              placeholder="Vue.js Advanced Certificate"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="organization" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Tashkilot <span class="text-red-400">*</span></label
            >
            <BaseInput v-model="formState.organization" placeholder="Vue School" size="middle" />
          </div>
        </FormItem>

        <FormItem name="issueDate" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Berilgan sana <span class="text-red-400">*</span></label
            >
            <BaseDatePicker v-model="issueDate" class="w-full" size="middle" />
          </div>
        </FormItem>

        <FormItem name="link" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500">Sertifikat linki</label>
            <BaseInput
              v-model="formState.link"
              placeholder="https://certificate.example.com/abc"
              size="middle"
            />
          </div>
        </FormItem>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-slate-500">Sertifikat fayli (PDF / Rasm)</label>
          <Upload :before-upload="beforeFileUpload" :show-upload-list="false" accept=".pdf,image/*">
            <BaseButton type="default" size="middle" class="w-full">
              <UploadOutlined />
              {{ fileName ?? (formState.file ? 'Fayl yuklangan' : 'Fayl yuklash') }}
            </BaseButton>
          </Upload>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <BaseButton type="default" size="middle" @click="emit('update:open', false)"
            >Bekor qilish</BaseButton
          >
          <BaseButton type="primary" size="middle" @click="onSubmit">Saqlash</BaseButton>
        </div>
      </div>
    </Form>
  </Modal>
</template>
