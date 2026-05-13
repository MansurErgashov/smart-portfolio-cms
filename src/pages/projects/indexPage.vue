<script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import ProjectsTable from './components/ProjectsTable.vue'
import ProjectCreateModal from './components/ProjectCreateModal.vue'
import ProjectUpdateModal from './components/ProjectUpdateModal.vue'
import { projectsMock } from '@/pages/projects/mockData'
import type { Project } from '@/pages/projects/mockData'

const projects = ref<Project[]>([...projectsMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedProject = ref<Project | null>(null)

function onEdit(project: Project) {
  selectedProject.value = project
  updateOpen.value = true
}

function onDelete(id: number) {
  projects.value = projects.value.filter((p) => p.id !== id)
}

function onCreated(data: Omit<Project, 'id'>) {
  const newId = Math.max(...projects.value.map((p) => p.id)) + 1
  projects.value.push({ id: newId, ...data })
}

function onUpdated(data: Project) {
  const idx = projects.value.findIndex((p) => p.id === data.id)
  if (idx !== -1) projects.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Loyihalar</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi loyiha
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <ProjectsTable :projects="projects" @edit="onEdit" @delete="onDelete" />
    </Card>

    <ProjectCreateModal v-model:open="createOpen" @created="onCreated" />
    <ProjectUpdateModal v-model:open="updateOpen" :project="selectedProject" @updated="onUpdated" />
  </div>
</template>
