<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Modal, Form, FormItem } from 'ant-design-vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import type { Service } from '@/pages/services/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'created', data: Omit<Service, 'id'>): void
}>()

const formRef = ref()

const formState = reactive({
  name: '',
  description: '',
  price: '',
  deliveryTime: '',
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Xizmat nomini kiriting', trigger: 'blur' }],
  price: [{ required: true, message: 'Narxni kiriting', trigger: 'blur' }],
  deliveryTime: [{ required: true, message: 'Yetkazib berish vaqtini kiriting', trigger: 'blur' }],
}

watch(
  () => props.open,
  (val) => {
    if (!val) {
      formRef.value?.resetFields()
      Object.assign(formState, { name: '', description: '', price: '', deliveryTime: '' })
    }
  },
)

function onSubmit() {
  formRef.value
    ?.validate()
    .then(() => {
      emit('created', { ...formState, price: Number(formState.price) })
      emit('update:open', false)
    })
    .catch(() => {})
}
</script>

<template>
  <Modal
    :open="props.open"
    title="Yangi xizmat"
    :footer="null"
    width="480px"
    @cancel="emit('update:open', false)"
  >
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3">
        <FormItem name="name" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Xizmat nomi <span class="text-red-400">*</span></label
            >
            <BaseInput v-model="formState.name" placeholder="Landing Page" size="middle" />
          </div>
        </FormItem>

        <FormItem name="description" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500">Tavsif</label>
            <BaseTextarea
              v-model="formState.description"
              :rows="3"
              placeholder="Xizmat haqida qisqacha..."
            />
          </div>
        </FormItem>

        <div class="grid grid-cols-2 gap-3">
          <FormItem name="price" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500"
                >Narx ($) <span class="text-red-400">*</span></label
              >
              <BaseInput v-model="formState.price" type="number" placeholder="500" size="middle" />
            </div>
          </FormItem>

          <FormItem name="deliveryTime" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500"
                >Yetkazish vaqti <span class="text-red-400">*</span></label
              >
              <BaseInput v-model="formState.deliveryTime" placeholder="3-5 kun" size="middle" />
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
