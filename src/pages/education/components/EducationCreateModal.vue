<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Modal, Form, FormItem } from 'ant-design-vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { degreeOptions } from '@/pages/education/mockData'
import type { Education } from '@/pages/education/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'created', data: Omit<Education, 'id'>): void
}>()

const formRef = ref()

const formState = reactive({
  university: '',
  faculty: '',
  degree: '',
  startYear: '',
  endYear: '',
})

const rules: Record<string, Rule[]> = {
  university: [{ required: true, message: 'Universitetni kiriting', trigger: 'blur' }],
  degree: [{ required: true, message: 'Darajani tanlang', trigger: 'change' }],
  startYear: [{ required: true, message: 'Boshlanish yilini kiriting', trigger: 'blur' }],
}

watch(
  () => props.open,
  (val) => {
    if (!val) {
      formRef.value?.resetFields()
      Object.assign(formState, {
        university: '',
        faculty: '',
        degree: '',
        startYear: '',
        endYear: '',
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
    title="Yangi ta'lim"
    :footer="null"
    width="500px"
    @cancel="emit('update:open', false)"
  >
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3">
        <FormItem name="university" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Universitet <span class="text-red-400">*</span></label
            >
            <BaseInput
              v-model="formState.university"
              placeholder="Toshkent Axborot Texnologiyalari Universiteti"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="faculty" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500">Fakultet</label>
            <BaseInput
              v-model="formState.faculty"
              placeholder="Dasturiy injiniring"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="degree" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Daraja <span class="text-red-400">*</span></label
            >
            <BaseSelect v-model="formState.degree" :options="degreeOptions" size="middle" />
          </div>
        </FormItem>

        <div class="grid grid-cols-2 gap-3">
          <FormItem name="startYear" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500"
                >Boshlanish yili <span class="text-red-400">*</span></label
              >
              <BaseInput v-model="formState.startYear" placeholder="2018" size="middle" />
            </div>
          </FormItem>

          <FormItem name="endYear" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500">Tugash yili</label>
              <BaseInput v-model="formState.endYear" placeholder="2022" size="middle" />
            </div>
          </FormItem>
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
