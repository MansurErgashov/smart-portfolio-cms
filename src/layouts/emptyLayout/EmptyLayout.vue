<template>
  <a-layout class="empty-layout">
    <a-layout-content class="empty-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
// Login, Register va boshqa auth sahifalari uchun layout
// Sidebar va Header yo'q
</script>

<style scoped>
.empty-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
}

.empty-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
}
</style>
