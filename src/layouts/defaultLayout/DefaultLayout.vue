<!-- <template>
  <Layout class="default-layout">
    <TheSidebar :collapsed="collapsed" />

    <Layout class="main-wrapper">
      <div class="fixed w-full z-1">
        <TheHeader style="min-height: 60px" />
      </div>

      <div>
        <LayoutContent
          class="main-content"
          style="
            margin-top: 60px;
            min-height: calc(100vh - 60px);
            overflow-y: auto;
            overflow-x: hidden;
          "
        >
          <RouterView v-slot="{ Component, route }">
            <Transition name="matrix" mode="out-in">
              <component :is="Component" :key="route.path" />
            </Transition>
          </RouterView>
        </LayoutContent>
      </div>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Layout, LayoutContent } from 'ant-design-vue'
import TheSidebar from '@/layouts/defaultLayout/components/TheSidebar.vue'
import TheHeader from '@/layouts/defaultLayout/components/TheHeader.vue'

const collapsed = ref(false)
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  background: #f8fafc;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.matrix-enter-active,
.matrix-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.3s ease;
}
.matrix-enter-from,
.matrix-leave-to {
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -10, 0, 0, 1);
  opacity: 0;
}
.matrix-leave-active {
  position: absolute;
  z-index: -1;
}
</style> -->

<script setup lang="ts">
import { Layout, LayoutContent } from 'ant-design-vue'
import TheSidebar from '@/layouts/defaultLayout/components/TheSidebar.vue'
import TheHeader from '@/layouts/defaultLayout/components/TheHeader.vue'
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<template>
  <Layout style="height: 100vh; overflow: hidden">
    <!-- Sidebar -->
    <TheSidebar :collapsed="collapsed" />

    <!-- Right: header + content -->
    <Layout style="display: flex; flex-direction: column; height: 100vh; overflow: hidden">
      <!-- Header: scroll qilmaydi -->
      <TheHeader style="flex-shrink: 0" />

      <!-- Content: faqat shu scroll bo'ladi -->
      <LayoutContent
        style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 20px; background: #f8fafc"
      >
        <RouterView v-slot="{ Component, route }">
          <Transition name="matrix" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<style scoped>
.matrix-enter-active,
.matrix-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.3s ease;
}
.matrix-enter-from,
.matrix-leave-to {
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -10, 0, 0, 1);
  opacity: 0;
}
.matrix-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
