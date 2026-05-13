<script setup lang="ts">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BlogTable from '@/pages/blog/components/BlogTable.vue'
import BlogCreateModal from '@/pages/blog/components/BlogCreateModal.vue'
import BlogUpdateModal from '@/pages/blog/components/BlogUpdateModal.vue'
import { blogsMock } from '@/pages/blog/mockData'
import type { Blog } from '@/pages/blog/mockData'

const blogs = ref<Blog[]>([...blogsMock])
const createOpen = ref(false)
const updateOpen = ref(false)
const selectedBlog = ref<Blog | null>(null)

function onEdit(blog: Blog) {
  selectedBlog.value = blog
  updateOpen.value = true
}

function onDelete(id: number) {
  blogs.value = blogs.value.filter((b) => b.id !== id)
}

function onCreated(data: Omit<Blog, 'id' | 'views' | 'createdAt'>) {
  const newId = Math.max(0, ...blogs.value.map((b) => b.id)) + 1
  blogs.value.unshift({
    id: newId,
    views: 0,
    createdAt: new Date().toISOString().split('T')[0] || '',
    ...data,
  })
}

function onUpdated(data: Blog) {
  const idx = blogs.value.findIndex((b) => b.id === data.id)
  if (idx !== -1) blogs.value[idx] = data
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Blog</h1>
      <BaseButton type="primary" size="middle" @click="createOpen = true">
        <PlusOutlined /> Yangi maqola
      </BaseButton>
    </div>

    <Card class="!rounded-xl !border-slate-100">
      <BlogTable :blogs="blogs" @edit="onEdit" @delete="onDelete" />
    </Card>

    <BlogCreateModal v-model:open="createOpen" @created="onCreated" />
    <BlogUpdateModal v-model:open="updateOpen" :blog="selectedBlog" @updated="onUpdated" />
  </div>
</template>
