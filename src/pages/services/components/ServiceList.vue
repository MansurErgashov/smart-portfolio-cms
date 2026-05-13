<script setup lang="ts">
import { AppstoreOutlined } from '@ant-design/icons-vue'
import ServiceCard from './ServiceCard.vue'
import type { Service } from '@/pages/services/mockData'

const props = defineProps<{ services: Service[] }>()

const emit = defineEmits<{
  (e: 'edit', service: Service): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    <ServiceCard
      v-for="service in props.services"
      :key="service.id"
      :service="service"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />

    <div
      v-if="!props.services.length"
      class="col-span-3 flex flex-col items-center gap-2 py-12 text-slate-400"
    >
      <AppstoreOutlined style="font-size: 32px" />
      <p class="text-sm">Hali xizmat qo'shilmagan</p>
    </div>
  </div>
</template>
