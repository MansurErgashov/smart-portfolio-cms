export interface SocialLink {
  id: number
  platform: string
  url: string
}

export const platformOptions = [
  { label: 'GitHub', value: 'github', icon: '🐙', color: 'bg-slate-800' },
  { label: 'LinkedIn', value: 'linkedin', icon: '💼', color: 'bg-blue-600' },
  { label: 'Telegram', value: 'telegram', icon: '✈️', color: 'bg-sky-500' },
  { label: 'Instagram', value: 'instagram', icon: '📸', color: 'bg-pink-500' },
  { label: 'YouTube', value: 'youtube', icon: '▶️', color: 'bg-red-500' },
  { label: 'Twitter / X', value: 'twitter', icon: '🐦', color: 'bg-slate-900' },
  { label: 'Portfolio Website', value: 'website', icon: '🌐', color: 'bg-indigo-500' },
  { label: 'Other', value: 'other', icon: '🔗', color: 'bg-slate-400' },
]

export const getPlatform = (value: string) =>
  platformOptions.find((p) => p.value === value) ?? platformOptions[platformOptions.length - 1]

export const socialLinksMock: SocialLink[] = [
  { id: 1, platform: 'github', url: 'https://github.com/mansurdev' },
  { id: 2, platform: 'linkedin', url: 'https://linkedin.com/in/mansurdev' },
  { id: 3, platform: 'telegram', url: '@mansurdev' },
  { id: 4, platform: 'website', url: 'https://mansurdev.uz' },
]
