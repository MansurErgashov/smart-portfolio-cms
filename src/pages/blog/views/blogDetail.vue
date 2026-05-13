<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Card } from 'ant-design-vue'
import {
  ArrowLeftOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BaseTag from '@/components/BaseTag/BaseTag.vue'
import { blogsMock } from '@/pages/blog/mockData'

const route = useRoute()
const router = useRouter()

const blog = computed(() => blogsMock.find((b) => b.id === Number(route.params.id)) ?? null)
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Back -->
    <div>
      <BaseButton type="text" size="middle" @click="router.back()">
        <ArrowLeftOutlined /> Orqaga
      </BaseButton>
    </div>

    <!-- Not found -->
    <div v-if="!blog" class="flex flex-col items-center gap-2 py-20 text-slate-400">
      <p class="text-base">Maqola topilmadi</p>
    </div>

    <!-- Content -->
    <template v-else>
      <Card class="!rounded-xl !border-slate-100">
        <div class="flex flex-col gap-4">
          <!-- Meta -->
          <div class="flex flex-wrap items-center gap-2">
            <BaseTag :color="blog.published ? 'green' : 'orange'">
              {{ blog.published ? 'Nashr' : 'Qoralama' }}
            </BaseTag>
            <BaseTag color="blue">{{ blog.category }}</BaseTag>
            <BaseTag v-for="tag in blog.tags" :key="tag" color="cyan">
              {{ tag }}
            </BaseTag>
          </div>

          <!-- Title -->
          <h1 class="text-2xl font-bold text-slate-800 leading-tight">{{ blog.title }}</h1>

          <!-- Stats -->
          <div
            class="flex items-center gap-5 text-xs text-slate-400 pb-4 border-b border-slate-100"
          >
            <span class="flex items-center gap-1"> <CalendarOutlined /> {{ blog.createdAt }} </span>
            <span class="flex items-center gap-1">
              <ClockCircleOutlined /> {{ blog.readTime }} daqiqa
            </span>
            <span class="flex items-center gap-1"> <EyeOutlined /> {{ blog.views }} ko'rish </span>
          </div>

          <!-- Cover image -->
          <img
            v-if="blog.image"
            :src="blog.image"
            class="w-full max-h-72 object-cover rounded-xl"
          />

          <!-- Content -->
          <div
            class="prose prose-slate max-w-none text-slate-600 leading-relaxed"
            v-html="blog.content"
          />
        </div>
      </Card>
    </template>
  </div>
</template>

<style scoped>
:deep(p) {
  margin-bottom: 1rem;
}
:deep(h2) {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 1.5rem 0 0.75rem;
}
:deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  color: #334155;
  margin: 1.25rem 0 0.5rem;
}
:deep(blockquote) {
  border-left: 3px solid #6366f1;
  padding-left: 1rem;
  color: #64748b;
  font-style: italic;
}
:deep(pre) {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}
:deep(a) {
  color: #6366f1;
  text-decoration: underline;
}
:deep(img) {
  max-width: 100%;
  border-radius: 12px;
}
</style>
