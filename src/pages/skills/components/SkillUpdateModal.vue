<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Modal, Form, FormItem, Slider } from 'ant-design-vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { categoryOptions } from '@/pages/skills/mockData'
import type { Skill } from '@/pages/skills/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{
  open: boolean
  skill: Skill | null
}>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'updated', skill: Skill): void
}>()

const formRef = ref()

const formState = reactive<Skill>({
  id: 0,
  name: '',
  level: 50,
  category: '',
})

watch(
  () => props.skill,
  (val) => {
    if (val) {
      formState.id = val.id
      formState.name = val.name
      formState.level = val.level
      formState.category = val.category
    }
  },
  { immediate: true },
)

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Skill nomini kiriting', trigger: 'blur' }],
  category: [{ required: true, message: 'Kategoriyani tanlang', trigger: 'change' }],
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

function onCancel() {
  emit('update:open', false)
}
</script>

<template>
  <Modal
    :open="props.open"
    title="Ko'nikmani tahrirlash"
    :footer="null"
    width="480px"
    @cancel="onCancel"
  >
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3">
        <FormItem name="name" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label for="editSkillName" class="text-xs font-medium text-slate-500">
              Skill nomi <span class="text-red-400">*</span>
            </label>
            <BaseInput
              id="editSkillName"
              v-model="formState.name"
              placeholder="Vue.js"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="category" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label for="editSkillCategory" class="text-xs font-medium text-slate-500">
              Kategoriya <span class="text-red-400">*</span>
            </label>
            <BaseSelect
              id="editSkillCategory"
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
