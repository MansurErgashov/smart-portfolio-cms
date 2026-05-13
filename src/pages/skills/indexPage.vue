<script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import SkillsTable from './components/SkillsTable.vue'
import SkillCreateModal from './components/SkillCreateModal.vue'
import SkillUpdateModal from './components/SkillUpdateModal.vue'
import { skillsMock } from '@/pages/skills/mockData'
import type { Skill } from '@/pages/skills/mockData'

const skills = ref<Skill[]>([...skillsMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedSkill = ref<Skill | null>(null)

function onEdit(skill: Skill) {
  selectedSkill.value = skill
  updateOpen.value = true
}

function onDelete(id: number) {
  skills.value = skills.value.filter((s) => s.id !== id)
}

function onCreated(data: Omit<Skill, 'id'>) {
  const newId = Math.max(...skills.value.map((s) => s.id)) + 1
  skills.value.push({ id: newId, ...data })
}

function onUpdated(data: Skill) {
  const idx = skills.value.findIndex((s) => s.id === data.id)
  if (idx !== -1) skills.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Ko'nikmalar</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi ko'nikma
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <SkillsTable :skills="skills" @edit="onEdit" @delete="onDelete" />
    </Card>

    <SkillCreateModal v-model:open="createOpen" @created="onCreated" />

    <SkillUpdateModal v-model:open="updateOpen" :skill="selectedSkill" @updated="onUpdated" />
  </div>
</template>
