<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Form, FormItem, Card } from 'ant-design-vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue'
import { profileMock } from '@/pages/profile/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ triggerSave: number }>()

const emit = defineEmits<{
  (e: 'submit', data: typeof formState): void
}>()

const formRef = ref()

const formState = reactive({
  aboutShort: profileMock.aboutShort,
  aboutLong: profileMock.aboutLong,
})

const rules: Record<string, Rule[]> = {
  aboutShort: [{ required: true, message: 'Qisqa bio kiriting', trigger: 'blur' }],
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
      <p class="text-slate-700 font-semibold text-base mb-4">Bio</p>
      <div class="grid grid-cols-12 gap-x-4 gap-y-3">
        <FormItem name="aboutShort" class="col-span-12 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="aboutShort" class="text-xs font-medium text-slate-500"
              >Qisqa bio <span class="text-red-400">*</span></label
            >
            <BaseInput
              id="aboutShort"
              v-model="formState.aboutShort"
              placeholder="Qisqacha o'zingiz haqingizda..."
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="aboutLong" class="col-span-12 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="aboutLong" class="text-xs font-medium text-slate-500">To'liq bio</label>
            <BaseTextarea
              id="aboutLong"
              v-model="formState.aboutLong"
              :rows="5"
              placeholder="Batafsil o'zingiz haqingizda..."
            />
          </div>
        </FormItem>
      </div>
    </Card>
  </Form>
</template>
