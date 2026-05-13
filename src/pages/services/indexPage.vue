<script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import ServiceList from '@/pages/services/components/ServiceList.vue'
import ServiceCreateModal from './components/ServiceCreateModal.vue'
import ServiceUpdateModal from './components/ServiceUpdateModal.vue'
import { servicesMock } from '@/pages/services/mockData'
import type { Service } from '@/pages/services/mockData'

const services = ref<Service[]>([...servicesMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedService = ref<Service | null>(null)

function onEdit(service: Service) {
  selectedService.value = service
  updateOpen.value = true
}

function onDelete(id: number) {
  services.value = services.value.filter((s) => s.id !== id)
}

function onCreated(data: Omit<Service, 'id'>) {
  const newId = Math.max(0, ...services.value.map((s) => s.id)) + 1
  services.value.push({ id: newId, ...data })
}

function onUpdated(data: Service) {
  const idx = services.value.findIndex((s) => s.id === data.id)
  if (idx !== -1) services.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Xizmatlar</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi xizmat
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <ServiceList :services="services" @edit="onEdit" @delete="onDelete" />
    </Card>

    <ServiceCreateModal v-model:open="createOpen" @created="onCreated" />
    <ServiceUpdateModal v-model:open="updateOpen" :service="selectedService" @updated="onUpdated" />
  </div>
</template>
