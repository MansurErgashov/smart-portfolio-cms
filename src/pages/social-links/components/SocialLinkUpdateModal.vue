<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Modal, Form, FormItem } from 'ant-design-vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { platformOptions } from '@/pages/social-links/mockData'
import type { SocialLink } from '@/pages/social-links/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ open: boolean; link: SocialLink | null }>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'updated', data: SocialLink): void
}>()

const formRef = ref()

const formState = reactive<SocialLink>({
  id: 0,
  platform: '',
  url: '',
})

const selectOptions = platformOptions.map((p) => ({ label: p.label, value: p.value }))

watch(
  () => props.link,
  (val) => {
    if (val) Object.assign(formState, { ...val })
  },
  { immediate: true },
)

const rules: Record<string, Rule[]> = {
  platform: [{ required: true, message: 'Platformani tanlang', trigger: 'change' }],
  url: [{ required: true, message: 'URL yoki username kiriting', trigger: 'blur' }],
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
    title="Linkni tahrirlash"
    :footer="null"
    width="440px"
    @cancel="emit('update:open', false)"
  >
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3">
        <FormItem name="platform" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Platforma <span class="text-red-400">*</span></label
            >
            <BaseSelect v-model="formState.platform" :options="selectOptions" size="middle" />
          </div>
        </FormItem>

        <FormItem name="url" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >URL yoki Username <span class="text-red-400">*</span></label
            >
            <BaseInput
              v-model="formState.url"
              placeholder="https://... yoki @username"
              size="middle"
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
