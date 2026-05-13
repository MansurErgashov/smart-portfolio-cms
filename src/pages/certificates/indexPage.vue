<script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import CertificateList from './components/CertificateList.vue'
import CertificateCreateModal from './components/CertificateCreateModal.vue'
import CertificateUpdateModal from './components/CertificateUpdateModal.vue'
import { certificatesMock } from '@/pages/certificates/mockData'
import type { Certificate } from '@/pages/certificates/mockData'

const certificates = ref<Certificate[]>([...certificatesMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedCertificate = ref<Certificate | null>(null)

function onEdit(certificate: Certificate) {
  selectedCertificate.value = certificate
  updateOpen.value = true
}

function onDelete(id: number) {
  certificates.value = certificates.value.filter((c) => c.id !== id)
}

function onCreated(data: Omit<Certificate, 'id'>) {
  const newId = Math.max(0, ...certificates.value.map((c) => c.id)) + 1
  certificates.value.push({ id: newId, ...data })
}

function onUpdated(data: Certificate) {
  const idx = certificates.value.findIndex((c) => c.id === data.id)
  if (idx !== -1) certificates.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Sertifikatlar</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi sertifikat
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <CertificateList :certificates="certificates" @edit="onEdit" @delete="onDelete" />
    </Card>

    <CertificateCreateModal v-model:open="createOpen" @created="onCreated" />
    <CertificateUpdateModal
      v-model:open="updateOpen"
      :certificate="selectedCertificate"
      @updated="onUpdated"
    />
  </div>
</template>
