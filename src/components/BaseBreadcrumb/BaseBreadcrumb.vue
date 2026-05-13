<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue'

interface BreadcrumbItemType {
  key: string | number
  title: string
  link?: string
}

withDefaults(
  defineProps<{
    items?: BreadcrumbItemType[]
    separator?: string
  }>(),
  {
    items: () => [],
    separator: '>',
  },
)
</script>

<template>
  <Breadcrumb :separator="separator">
    <BreadcrumbItem v-for="item in items" :key="item.key">
      <router-link v-if="item.link" :to="item.link">
        {{ item.title }}
      </router-link>
      <span v-else>{{ item.title }}</span>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<style>
.ant-breadcrumb a,
.ant-breadcrumb span {
  color: #374151 !important;
  transition: none !important;
  font-weight: 500 !important;
  font-size: 14px;
}

.ant-breadcrumb a:hover {
  color: #374151 !important;
  background: none !important;
}
</style>
