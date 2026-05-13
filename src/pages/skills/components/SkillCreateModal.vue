<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Modal, Form, FormItem, Slider } from 'ant-design-vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { categoryOptions } from '@/pages/skills/mockData'
import type { Skill } from '@/pages/skills/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'created', skill: Omit<Skill, 'id'>): void
}>()

const formRef = ref()

const formState = reactive({
  name: '',
  level: 50,
  category: '',
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Skill nomini kiriting', trigger: 'blur' }],
  category: [{ required: true, message: 'Kategoriyani tanlang', trigger: 'change' }],
}

watch(
  () => props.open,
  (val) => {
    if (!val) {
      formRef.value?.resetFields()
      formState.name = ''
      formState.level = 50
      formState.category = ''
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

function onCancel() {
  emit('update:open', false)
}
</script>

<template>
  <Modal :open="props.open" title="Yangi ko'nikma" :footer="null" width="480px" @cancel="onCancel">
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3">
        <FormItem name="name" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label for="skillName" class="text-xs font-medium text-slate-500">
              Skill nomi <span class="text-red-400">*</span>
            </label>
            <BaseInput id="skillName" v-model="formState.name" placeholder="Vue.js" size="middle" />
          </div>
        </FormItem>

        <FormItem name="category" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label for="skillCategory" class="text-xs font-medium text-slate-500">
              Kategoriya <span class="text-red-400">*</span>
            </label>
            <BaseSelect
              id="skillCategory"
              v-model="formState.category"
              :options="categoryOptions"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="level" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500">
              Daraja — <span class="text-indigo-500 font-semibold">{{ formState.level }}%</span>
            </label>
            <Slider v-model:value="formState.level" :min="0" :max="100" :step="5" />
          </div>
        </FormItem>

        <div class="flex justify-end gap-2 pt-2">
          <BaseButton type="default" size="middle" @click="onCancel">Bekor qilish</BaseButton>
          <BaseButton type="primary" size="middle" @click="onSubmit">Saqlash</BaseButton>
        </div>
      </div>
    </Form>
  </Modal>
</template>
