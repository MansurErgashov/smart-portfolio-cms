/
<script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import EducationList from './components/EducationList.vue'
import EducationCreateModal from './components/EducationCreateModal.vue'
import EducationUpdateModal from './components/EducationUpdateModal.vue'
import { educationMock } from '@/pages/education/mockData'
import type { Education } from '@/pages/education/mockData'

const educations = ref<Education[]>([...educationMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedEducation = ref<Education | null>(null)

function onEdit(education: Education) {
  selectedEducation.value = education
  updateOpen.value = true
}

function onDelete(id: number) {
  educations.value = educations.value.filter((e) => e.id !== id)
}

function onCreated(data: Omit<Education, 'id'>) {
  const newId = Math.max(...educations.value.map((e) => e.id)) + 1
  educations.value.push({ id: newId, ...data })
}

function onUpdated(data: Education) {
  const idx = educations.value.findIndex((e) => e.id === data.id)
  if (idx !== -1) educations.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Ta'lim</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi ta'lim
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <EducationList :educations="educations" @edit="onEdit" @delete="onDelete" />
    </Card>

    <EducationCreateModal v-model:open="createOpen" @created="onCreated" />
    <EducationUpdateModal
      v-model:open="updateOpen"
      :education="selectedEducation"
      @updated="onUpdated"
    />
  </div>
</template>
