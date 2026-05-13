// import { createRouter, createWebHistory } from 'vue-router'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [],
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/defaultLayout/DefaultLayout.vue'
import EmptyLayout from '@/layouts/emptyLayout/EmptyLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ── Auth sahifalari (EmptyLayout) ──────────────────────
    {
      path: '/',
      component: EmptyLayout,
      children: [
        { path: '', redirect: '/login' },
        // { path: 'login', name: 'Login', component: () => import('@/pages/auth/LoginPage.vue') },
        // {
        //   path: 'register',
        //   name: 'Register',
        //   component: () => import('@/pages/auth/RegisterPage.vue'),
        // },
      ],
    },

    // ── Admin sahifalari (DefaultLayout) ───────────────────
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/pages/dashboard/indexPage.vue'),
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/pages/profile/indexPage.vue'),
        },
        {
          path: 'skills',
          name: 'Skills',
          component: () => import('@/pages/skills/indexPage.vue'),
        },
        {
          path: 'projects',
          name: 'Projects',
          component: () => import('@/pages/projects/indexPage.vue'),
        },
        {
          path: 'experience',
          name: 'Experience',
          component: () => import('@/pages/experience/indexPage.vue'),
        },
        {
          path: 'education',
          name: 'Education',
          component: () => import('@/pages/education/indexPage.vue'),
        },
        {
          path: 'certificates',
          name: 'Certificates',
          component: () => import('@/pages/certificates/indexPage.vue'),
        },
        {
          path: 'services',
          name: 'Services',
          component: () => import('@/pages/services/indexPage.vue'),
        },
        { path: 'blog', name: 'Blog', component: () => import('@/pages/blog/indexPage.vue') },
        {
          path: 'blog/:id',
          name: 'BlogDetail',
          component: () => import('@/pages/blog/views/blogDetail.vue'),
        },
        {
          path: 'social-links',
          name: 'SocialLinks',
          component: () => import('@/pages/social-links/indexPage.vue'),
        },
        // { path: 'resume', name: 'Resume', component: () => import('@/pages/resume/index.vue') },
        // {
        //   path: 'settings',
        //   name: 'Settings',
        //   component: () => import('@/pages/settings/index.vue'),
        // },
      ],
    },

    // ── 404 ────────────────────────────────────────────────
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
})

export default router
