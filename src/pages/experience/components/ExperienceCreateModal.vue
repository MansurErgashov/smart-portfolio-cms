<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { Modal, Form, FormItem, Checkbox } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue'
import BaseDatePicker from '@/components/BaseDatePicker/BaseDatePicker.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import type { Experience } from '@/pages/experience/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'created', data: Omit<Experience, 'id'>): void
}>()

const formRef = ref()

const formState = reactive({
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
})

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

const rules: Record<string, Rule[]> = {
  company: [{ required: true, message: 'Kompaniya nomini kiriting', trigger: 'blur' }],
  position: [{ required: true, message: 'Lavozimni kiriting', trigger: 'blur' }],
  startDate: [{ required: true, message: 'Boshlanish sanasini kiriting', trigger: 'change' }],
}

watch(
  () => props.open,
  (val) => {
    if (!val) {
      formRef.value?.resetFields()
      Object.assign(formState, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
      })
    }
  },
)

function onSubmit() {
  formRef.value
    ?.validate()
    .then(() => {
      emit('created', { ...formState })
      emit('update:open', false)
    })
    .catch(() => {})
}
</script>

<template>
  <Modal
    :open="props.open"
    title="Yangi ish tajribasi"
    :footer="null"
    width="520px"
    @cancel="emit('update:open', false)"
  >
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3">
        <FormItem name="company" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Kompaniya <span class="text-red-400">*</span></label
            >
            <BaseInput v-model="formState.company" placeholder="Najot Ta'lim" size="middle" />
          </div>
        </FormItem>

        <FormItem name="position" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Lavozim <span class="text-red-400">*</span></label
            >
            <BaseInput
              v-model="formState.position"
              placeholder="Frontend Developer"
              size="middle"
            />
          </div>
        </FormItem>

        <div class="grid grid-cols-2 gap-3">
          <FormItem name="startDate" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500"
                >Boshlanish <span class="text-red-400">*</span></label
              >
              <BaseDatePicker v-model="startDate" class="w-full" size="middle" />
            </div>
          </FormItem>

          <FormItem name="endDate" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500">Tugash</label>
              <BaseDatePicker
                v-model="endDate"
                class="w-full"
                size="middle"
                :disabled="formState.isCurrent"
              />
            </div>
          </FormItem>
        </div>

        <Checkbox
          v-model:checked="formState.isCurrent"
          @change="
            () => {
              if (formState.isCurrent) formState.endDate = ''
            }
          "
        >
          <span class="text-sm text-slate-600">Hozirgi ish joyim</span>
        </Checkbox>

        <FormItem name="description" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500">Tavsif</label>
            <BaseTextarea
              v-model="formState.description"
              :rows="3"
              placeholder="Vazifalar va yutuqlar haqida..."
            />
          </div>
        </FormItem>

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
