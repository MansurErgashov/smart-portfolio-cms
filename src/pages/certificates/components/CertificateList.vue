<script setup lang="ts">
import { SafetyCertificateOutlined } from '@ant-design/icons-vue'
import CertificateCard from './CertificateCard.vue'
import type { Certificate } from '@/pages/certificates/mockData'

const props = defineProps<{ certificates: Certificate[] }>()

const emit = defineEmits<{
  (e: 'edit', certificate: Certificate): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    <CertificateCard
      v-for="cert in props.certificates"
      :key="cert.id"
      :certificate="cert"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />

    <!-- Bo'sh holat -->
    <div
      v-if="!props.certificates.length"
      class="col-span-3 flex flex-col items-center gap-2 py-12 text-slate-400"
    >
      <SafetyCertificateOutlined style="font-size: 32px" />
      <p class="text-sm">Hali sertifikat qo'shilmagan</p>
    </div>
  </div>
</template>
