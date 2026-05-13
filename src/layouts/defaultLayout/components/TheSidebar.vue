<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LayoutSider, Menu, MenuItem, Avatar } from 'ant-design-vue'
import { UserOutlined, StarFilled, LogoutOutlined } from '@ant-design/icons-vue'
import { menuItems } from '@/layouts/defaultLayout/menus'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'

// const props = defineProps<{ collapsed: boolean }>()

const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>([])

watch(
  () => route.path,
  (path) => {
    console.log('path: ', route)
    selectedKeys.value = [path]
  },
  { immediate: true },
)

const onMenuClick = ({ key }: MenuInfo) => {
  console.log('key: ', key)
  router.push(String(key))
}
</script>

<template>
  <LayoutSider
    :width="220"
    :collapsed-width="64"
    :trigger="null"
    style="
      background: #fff;
      border-right: 1px solid #e2e8f0;
      height: 100vh;
      position: sticky;
      top: 0;
      overflow: hidden;
    "
  >
    <div style="display: flex; flex-direction: column; height: 100%; overflow: hidden">
      <!-- Logo -->
      <div
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          border-bottom: 1px solid #f1f5f9;
          padding: 14px 16px;
          min-height: 60px;
        "
      >
        <span style="color: #6366f1; font-size: 20px; flex-shrink: 0">⚡</span>
        <span style="color: #1e293b; font-weight: 700; font-size: 14px; white-space: nowrap">
          Smart Portfolio
        </span>
      </div>

      <!-- User card -->
      <div
        style="
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          border-bottom: 1px solid #f1f5f9;
          padding: 12px 16px;
        "
      >
        <Avatar :size="40" style="background: #e0e7ff; flex-shrink: 0">
          <template #icon>
            <UserOutlined style="color: #6366f1" />
          </template>
        </Avatar>
        <div style="overflow: hidden">
          <p
            style="
              color: #1e293b;
              font-size: 14px;
              font-weight: 600;
              white-space: nowrap;
              line-height: 1.3;
              margin: 0;
            "
          >
            Mansurdev
          </p>
          <p style="color: #94a3b8; font-size: 11px; margin: 2px 0 0">Frontend Developer</p>
          <span
            style="
              display: inline-flex;
              align-items: center;
              gap: 3px;
              margin-top: 4px;
              font-size: 11px;
              font-weight: 700;
              color: #334155;
            "
          >
            <StarFilled style="color: #facc15; font-size: 10px" /> 185 ball
          </span>
        </div>
      </div>

      <!-- Menu scroll -->
      <div style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 6px 0">
        <Menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          class="sidebar-menu"
          style="background: transparent; border: none"
          @click="onMenuClick"
        >
          <MenuItem v-for="item in menuItems" :key="item.path" :title="item.label">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <span>{{ item.label }}</span>
          </MenuItem>
        </Menu>
      </div>

      <!-- Logout -->
      <div
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          border-top: 1px solid #f1f5f9;
          padding: 14px 16px;
          cursor: pointer;
          transition: background 0.2s;
        "
        @mouseenter="($event.currentTarget as HTMLElement).style.background = '#fef2f2'"
        @mouseleave="($event.currentTarget as HTMLElement).style.background = 'transparent'"
        @click="$router.push('/login')"
      >
        <LogoutOutlined style="color: #f87171; font-size: 15px; flex-shrink: 0" />
        <span style="color: #f87171; font-size: 14px; font-weight: 500; white-space: nowrap">
          Logout
        </span>
      </div>
    </div>
  </LayoutSider>
</template>

<style scoped>
:deep(.ant-menu-item) {
  display: flex !important;
  align-items: center !important;
  margin: 1px 8px !important;
  width: calc(100% - 16px) !important;
  border-radius: 8px !important;
  color: #374151 !important;
  background: transparent !important;
  height: 40px !important;
  line-height: 40px !important;
}
:deep(.ant-menu-item .anticon) {
  font-size: 15px !important;
  color: #9ca3af !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
:deep(.ant-menu-item:hover) {
  color: #4f46e5 !important;
  background: #eef2ff !important;
}
:deep(.ant-menu-item:hover .anticon) {
  color: #4f46e5 !important;
}
:deep(.ant-menu-item-selected) {
  color: #ffffff !important;
  background: #6366f1 !important;
}
:deep(.ant-menu-item-selected .anticon) {
  color: #ffffff !important;
}
:deep(.ant-menu-inline-collapsed .ant-menu-item) {
  padding-inline: 0 !important;
  justify-content: center !important;
  width: 44px !important;
  margin-inline: auto !important;
}
:deep(.ant-menu-item-selected::after) {
  display: none !important;
}
</style>
