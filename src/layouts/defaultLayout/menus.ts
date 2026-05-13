import {
  DashboardOutlined,
  UserOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  HistoryOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  EditOutlined,
  LinkOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import type { Component } from 'vue'

export interface SidebarMenuItem {
  key: string
  label: string
  icon: Component
  path: string
}

export const menuItems: SidebarMenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: DashboardOutlined, path: '/dashboard' },
  { key: 'profile', label: 'Profile', icon: UserOutlined, path: '/profile' },
  { key: 'skills', label: 'Skills', icon: ThunderboltOutlined, path: '/skills' },
  { key: 'projects', label: 'Projects', icon: RocketOutlined, path: '/projects' },
  { key: 'experience', label: 'Experience', icon: HistoryOutlined, path: '/experience' },
  { key: 'education', label: 'Education', icon: ReadOutlined, path: '/education' },
  {
    key: 'certificates',
    label: 'Certificates',
    icon: SafetyCertificateOutlined,
    path: '/certificates',
  },
  { key: 'services', label: 'Services', icon: AppstoreOutlined, path: '/services' },
  { key: 'blog', label: 'Blog', icon: EditOutlined, path: '/blog' },
  { key: 'social-links', label: 'Social Links', icon: LinkOutlined, path: '/social-links' },
  { key: 'resume', label: 'Resume', icon: FileTextOutlined, path: '/resume' },
  { key: 'settings', label: 'Settings', icon: SettingOutlined, path: '/settings' },
]
