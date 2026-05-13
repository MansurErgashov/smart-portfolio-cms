<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LayoutHeader, Tooltip } from 'ant-design-vue'
import { SearchOutlined, EyeOutlined } from '@ant-design/icons-vue'
// import { menuItems } from '@/layouts/defaultLayout/menus'
// import BaseBreadcrumb from '@/components/BaseBreadcrumb/BaseBreadcrumb.vue'

const router = useRouter()
// const route = useRoute()

const profileProgress = ref(85)

// const breadcrumbItems = computed(() => {
//   return [
//     {
//       key: '',
//       title: 'Справочник',
//       link: '',
//     },
//     {
//       key: '/reference/products',
//       title: 'Товары (продукты)',
//       link: '/reference/products',
//     },
//   ]
// })
</script>

<template>
  <LayoutHeader
    style="
      background: #fff;
      padding: 0 20px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f1f5f9;
      position: sticky;
      top: 0;
      z-index: 100;
      line-height: normal;
    "
  >
    <!-- <BaseBreadcrumb :items="breadcrumbItems"></BaseBreadcrumb> -->
    <div></div>

    <!-- Right -->
    <div style="display: flex; align-items: center; gap: 12px">
      <!-- Search -->
      <div
        style="
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 5px 12px;
          cursor: pointer;
          transition: border-color 0.2s;
        "
        @mouseenter="($event.currentTarget as HTMLElement).style.borderColor = '#6366f1'"
        @mouseleave="($event.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'"
      >
        <SearchOutlined style="color: #94a3b8; font-size: 14px" />
        <span style="color: #94a3b8; font-size: 13px">Qidirish...</span>
        <kbd
          style="
            color: #94a3b8;
            font-size: 11px;
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 1px 5px;
            font-family: inherit;
          "
          >Ctrl K</kbd
        >
      </div>

      <!-- Profile progress badge -->
      <Tooltip :title="`Profilingiz ${profileProgress}% to'ldirilgan`">
        <div
          style="
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 5px 12px;
            transition: border-color 0.2s;
          "
          @mouseenter="($event.currentTarget as HTMLElement).style.borderColor = '#6366f1'"
          @mouseleave="($event.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'"
          @click="router.push('/profile')"
        >
          <div
            style="
              width: 28px;
              height: 6px;
              background: #e2e8f0;
              border-radius: 10px;
              overflow: hidden;
            "
          >
            <div
              :style="`width:${profileProgress}%; height:100%; background:#6366f1; border-radius:10px;`"
            ></div>
          </div>
          <span style="font-size: 12px; font-weight: 600; color: #6366f1"
            >{{ profileProgress }}%</span
          >
        </div>
      </Tooltip>

      <!-- Preview -->
      <Tooltip title="Portfolioni ko'rish">
        <div
          style="
            display: flex;
            align-items: center;
            gap: 6px;
            background: #6366f1;
            color: #fff;
            border-radius: 8px;
            padding: 5px 14px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: background 0.2s;
          "
          @mouseenter="($event.currentTarget as HTMLElement).style.background = '#4f46e5'"
          @mouseleave="($event.currentTarget as HTMLElement).style.background = '#6366f1'"
          @click="router.push('/u/mansurdev')"
        >
          <EyeOutlined style="font-size: 14px" />
          <span>Preview</span>
        </div>
      </Tooltip>
    </div>
  </LayoutHeader>
</template>
