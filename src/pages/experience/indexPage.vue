<!-- <script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import ExperienceTable from './components/ExperienceTable.vue'
import ExperienceCreateModal from './components/ExperienceCreateModal.vue'
import ExperienceUpdateModal from './components/ExperienceUpdateModal.vue'
import { experienceMock } from '@/pages/experience/mockData'
import type { Experience } from '@/pages/experience/mockData'

const experiences = ref<Experience[]>([...experienceMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedExperience = ref<Experience | null>(null)

function onEdit(experience: Experience) {
  selectedExperience.value = experience
  updateOpen.value = true
}

function onDelete(id: number) {
  experiences.value = experiences.value.filter((e) => e.id !== id)
}

function onCreated(data: Omit<Experience, 'id'>) {
  const newId = Math.max(...experiences.value.map((e) => e.id)) + 1
  experiences.value.push({ id: newId, ...data })
}

function onUpdated(data: Experience) {
  const idx = experiences.value.findIndex((e) => e.id === data.id)
  if (idx !== -1) experiences.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Ish tajribasi</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi tajriba
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <ExperienceTable :experiences="experiences" @edit="onEdit" @delete="onDelete" />
    </Card>

    <ExperienceCreateModal v-model:open="createOpen" @created="onCreated" />
    <ExperienceUpdateModal
      v-model:open="updateOpen"
      :experience="selectedExperience"
      @updated="onUpdated"
    />
  </div>
</template> -->

<script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import ExperienceList from '@/pages/experience/components/ExperienceList.vue'
import ExperienceCreateModal from './components/ExperienceCreateModal.vue'
import ExperienceUpdateModal from './components/ExperienceUpdateModal.vue'
import { experienceMock } from '@/pages/experience/mockData'
import type { Experience } from '@/pages/experience/mockData'

const experiences = ref<Experience[]>([...experienceMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedExperience = ref<Experience | null>(null)

function onEdit(experience: Experience) {
  selectedExperience.value = experience
  updateOpen.value = true
}

function onDelete(id: number) {
  experiences.value = experiences.value.filter((e) => e.id !== id)
}

function onCreated(data: Omit<Experience, 'id'>) {
  const newId = Math.max(0, ...experiences.value.map((e) => e.id)) + 1
  experiences.value.unshift({ id: newId, ...data })
}

function onUpdated(data: Experience) {
  const idx = experiences.value.findIndex((e) => e.id === data.id)
  if (idx !== -1) experiences.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Ish tajribasi</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi tajriba
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <ExperienceList :experiences="experiences" @edit="onEdit" @delete="onDelete" />
    </Card>

    <ExperienceCreateModal v-model:open="createOpen" @created="onCreated" />
    <ExperienceUpdateModal
      v-model:open="updateOpen"
      :experience="selectedExperience"
      @updated="onUpdated"
    />
  </div>
</template>
