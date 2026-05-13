<script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined, LinkOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import SocialLinkCard from './components/SocialLinkCard.vue'
import SocialLinkCreateModal from './components/SocialLinkCreateModal.vue'
import SocialLinkUpdateModal from './components/SocialLinkUpdateModal.vue'
import { socialLinksMock } from './mockData'
import type { SocialLink } from './mockData'

const links = ref<SocialLink[]>([...socialLinksMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedLink = ref<SocialLink | null>(null)

function onEdit(link: SocialLink) {
  selectedLink.value = link
  updateOpen.value = true
}

function onDelete(id: number) {
  links.value = links.value.filter((l) => l.id !== id)
}

function onCreated(data: Omit<SocialLink, 'id'>) {
  const newId = Math.max(0, ...links.value.map((l) => l.id)) + 1
  links.value.push({ id: newId, ...data })
}

function onUpdated(data: SocialLink) {
  const idx = links.value.findIndex((l) => l.id === data.id)
  if (idx !== -1) links.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Ijtimoiy tarmoqlar</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi link
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <SocialLinkCard
          v-for="link in links"
          :key="link.id"
          :link="link"
          @edit="onEdit"
          @delete="onDelete"
        />

        <div
          v-if="!links.length"
          class="col-span-3 flex flex-col items-center gap-2 py-12 text-slate-400"
        >
          <LinkOutlined style="font-size: 32px" />
          <p class="text-sm">Hali link qo'shilmagan</p>
        </div>
      </div>
    </Card>

    <SocialLinkCreateModal v-model:open="createOpen" @created="onCreated" />
    <SocialLinkUpdateModal v-model:open="updateOpen" :link="selectedLink" @updated="onUpdated" />
  </div>
</template>
