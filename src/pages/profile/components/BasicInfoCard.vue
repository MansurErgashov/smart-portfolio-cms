<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import { Form, FormItem, Card } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue'
import BaseDatePicker from '@/components/BaseDatePicker/BaseDatePicker.vue'
import { profileMock, professionOptions, languageOptions } from '@/pages/profile/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ triggerSave: number }>()

const emit = defineEmits<{
  (e: 'submit', data: typeof formState): void
}>()

const formRef = ref()

const formState = reactive({
  fullName: profileMock.fullName,
  username: profileMock.username,
  email: profileMock.email,
  phone: profileMock.phone,
  address: profileMock.address,
  birthDate: profileMock.birthDate,
  experienceYears: profileMock.experienceYears,
  profession: profileMock.profession,
  languages: profileMock.languages,
})

const birthDate = computed<Dayjs | undefined>({
  get: () => (formState.birthDate ? dayjs(formState.birthDate) : undefined),
  set: (val) => {
    formState.birthDate = val ? val.format('YYYY-MM-DD') : ''
  },
})

const rules: Record<string, Rule[]> = {
  fullName: [{ required: true, message: 'Ism Familiya kiriting', trigger: 'blur' }],
  username: [{ required: true, message: 'Username kiriting', trigger: 'blur' }],
  email: [
    { required: true, message: 'Email kiriting', trigger: 'blur' },
    { type: 'email', message: "Email noto'g'ri", trigger: 'blur' },
  ],
  phone: [{ required: true, message: 'Telefon kiriting', trigger: 'blur' }],
  profession: [{ required: true, message: 'Kasbni tanlang', trigger: 'change' }],
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
      <p class="text-slate-700 font-semibold text-base mb-4">Asosiy ma'lumotlar</p>
      <div class="grid grid-cols-12 gap-x-4 gap-y-3">
        <FormItem name="fullName" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="fullName" class="text-xs font-medium text-slate-500"
              >Full Name <span class="text-red-400">*</span></label
            >
            <BaseInput
              id="fullName"
              v-model="formState.fullName"
              placeholder="Ism Familiya"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="username" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="username" class="text-xs font-medium text-slate-500"
              >Username <span class="text-red-400">*</span></label
            >
            <BaseInput
              id="username"
              v-model="formState.username"
              placeholder="mansurdev"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="email" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="email" class="text-xs font-medium text-slate-500"
              >Email <span class="text-red-400">*</span></label
            >
            <BaseInput
              id="email"
              v-model="formState.email"
              type="email"
              placeholder="email@example.com"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="phone" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="phone" class="text-xs font-medium text-slate-500"
              >Telefon <span class="text-red-400">*</span></label
            >
            <BaseInput
              id="phone"
              v-model="formState.phone"
              placeholder="+998 90 000 00 00"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="address" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="address" class="text-xs font-medium text-slate-500">Manzil</label>
            <BaseInput
              id="address"
              v-model="formState.address"
              placeholder="Toshkent, O'zbekiston"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="birthDate" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="birthDate" class="text-xs font-medium text-slate-500">Tug'ilgan sana</label>
            <BaseDatePicker id="birthDate" v-model="birthDate" class="w-full" size="middle" />
          </div>
        </FormItem>

        <FormItem name="experienceYears" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="experienceYears" class="text-xs font-medium text-slate-500"
              >Tajriba (yil)</label
            >
            <BaseInput
              id="experienceYears"
              v-model="formState.experienceYears"
              type="number"
              placeholder="5"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="profession" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="profession" class="text-xs font-medium text-slate-500"
              >Kasb <span class="text-red-400">*</span></label
            >
            <BaseSelect
              id="profession"
              v-model="formState.profession"
              :options="professionOptions"
              size="middle"
            />
          </div>
        </FormItem>

        <FormItem name="languages" class="col-span-4 !mb-0">
          <div class="flex flex-col gap-1">
            <label for="languages" class="text-xs font-medium text-slate-500">Tillar</label>
            <BaseSelect
              id="languages"
              v-model="formState.languages"
              :options="languageOptions"
              mode="multiple"
              size="middle"
            />
          </div>
        </FormItem>
      </div>
    </Card>
  </Form>
</template>
