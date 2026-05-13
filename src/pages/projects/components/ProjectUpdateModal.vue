<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { Modal, Form, FormItem, Upload, message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import dayjs, { type Dayjs } from 'dayjs'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue'
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue'
import BaseDatePicker from '@/components/BaseDatePicker/BaseDatePicker.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { statusOptions } from '@/pages/projects/mockData'
import type { Project } from '@/pages/projects/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ open: boolean; project: Project | null }>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'updated', project: Project): void
}>()

const formRef = ref()
const imageUrl = ref<string | null>(null)
const techInput = ref('')

const formState = reactive<Project>({
  id: 0,
  title: '',
  description: '',
  technologies: [],
  githubLink: '',
  demoLink: '',
  image: null,
  startDate: '',
  endDate: '',
  status: 'in_progress',
})

watch(
  () => props.project,
  (val) => {
    if (val) Object.assign(formState, { ...val, technologies: [...val.technologies] })
  },
  { immediate: true },
)

const startDate = computed<Dayjs | undefined>({
  get: () => (formState.startDate ? dayjs(formState.startDate) : undefined),
  set: (val) => {
    formState.startDate = val ? val.format('YYYY-MM-DD') : ''
  },
})

const endDate = computed<Dayjs | undefined>({
  get: () => (formState.endDate ? dayjs(formState.endDate) : undefined),
  set: (val) => {
    formState.endDate = val ? val.format('YYYY-MM-DD') : ''
  },
})

function addTech() {
  const val = techInput.value.trim()
  if (val && !formState.technologies.includes(val)) formState.technologies.push(val)
  techInput.value = ''
}
function removeTech(tech: string) {
  formState.technologies = formState.technologies.filter((t) => t !== tech)
}

const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: 'Loyiha nomini kiriting', trigger: 'blur' }],
  status: [{ required: true, message: 'Statusni tanlang', trigger: 'change' }],
}

function beforeImageUpload(file: File) {
  if (!file.type.startsWith('image/')) {
    message.error('Faqat rasm yuklang!')
    return false
  }
  imageUrl.value = URL.createObjectURL(file)
  formState.image = imageUrl.value
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
    title="Loyihani tahrirlash"
    :footer="null"
    width="600px"
    @cancel="emit('update:open', false)"
  >
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3 max-h-[65vh] overflow-y-auto pr-1">
        <FormItem name="title" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Loyiha nomi <span class="text-red-400">*</span></label
            >
            <BaseInput v-model="formState.title" placeholder="E-commerce Platform" size="middle" />
          </div>
        </FormItem>

        <FormItem name="description" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500">Tavsif</label>
            <BaseTextarea
              v-model="formState.description"
              :rows="3"
              placeholder="Loyiha haqida qisqacha..."
            />
          </div>
        </FormItem>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-slate-500">Texnologiyalar</label>
          <div class="flex gap-2">
            <BaseInput
              v-model="techInput"
              placeholder="Vue.js"
              size="middle"
              class="flex-1"
              @keydown.enter.prevent="addTech"
            />
            <BaseButton type="default" size="middle" @click="addTech">Qo'shish</BaseButton>
          </div>
          <div v-if="formState.technologies.length" class="flex flex-wrap gap-1.5 mt-1">
            <span
              v-for="tech in formState.technologies"
              :key="tech"
              class="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {{ tech }}
              <button class="hover:text-red-400 leading-none" @click="removeTech(tech)">×</button>
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <FormItem name="githubLink" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500">GitHub link</label>
              <BaseInput
                v-model="formState.githubLink"
                placeholder="https://github.com/..."
                size="middle"
              />
            </div>
          </FormItem>

          <FormItem name="demoLink" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500">Demo link</label>
              <BaseInput v-model="formState.demoLink" placeholder="https://demo.uz" size="middle" />
            </div>
          </FormItem>

          <FormItem name="startDate" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500">Boshlanish sanasi</label>
              <BaseDatePicker v-model="startDate" class="w-full" size="middle" />
            </div>
          </FormItem>

          <FormItem name="endDate" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500">Tugash sanasi</label>
              <BaseDatePicker v-model="endDate" class="w-full" size="middle" />
            </div>
          </FormItem>

          <FormItem name="status" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500"
                >Status <span class="text-red-400">*</span></label
              >
              <BaseSelect v-model="formState.status" :options="statusOptions" size="middle" />
            </div>
          </FormItem>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500">Loyiha rasmi</label>
            <Upload :before-upload="beforeImageUpload" :show-upload-list="false" accept="image/*">
              <div
                class="w-full h-9 border border-dashed border-slate-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:border-indigo-400 transition-colors text-slate-400 text-sm"
              >
                <PlusOutlined />
                <span>{{ formState.image || imageUrl ? 'Rasm yuklandi' : 'Rasm yuklash' }}</span>
              </div>
            </Upload>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-4">
        <BaseButton type="default" size="middle" @click="emit('update:open', false)"
          >Bekor qilish</BaseButton
        >
        <BaseButton type="primary" size="middle" @click="onSubmit">Saqlash</BaseButton>
      </div>
    </Form>
  </Modal>
</template>
