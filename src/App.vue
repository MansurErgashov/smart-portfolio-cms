<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

const themeConfig: ThemeConfig = {
  token: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    borderRadius: 8,
    colorPrimary: '#6366f1',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f1f5f9',
  },
}
</script>

<template>
  <ConfigProvider :theme="themeConfig">
    <RouterView />
  </ConfigProvider>
</template>

<style>
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} */

body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
}
</style>
