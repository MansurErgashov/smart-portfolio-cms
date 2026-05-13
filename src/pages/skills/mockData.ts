export interface Skill {
  id: number
  name: string
  level: number
  category: string
}

export const categoryOptions = [
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'UI/UX', value: 'UI/UX' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Other', value: 'Other' },
]

export const skillsMock: Skill[] = [
  { id: 1, name: 'Vue.js', level: 90, category: 'Frontend' },
  { id: 2, name: 'Nuxt.js', level: 85, category: 'Frontend' },
  { id: 3, name: 'TypeScript', level: 80, category: 'Frontend' },
  { id: 4, name: 'Tailwind CSS', level: 90, category: 'Frontend' },
  { id: 5, name: 'Node.js', level: 65, category: 'Backend' },
  { id: 6, name: 'PostgreSQL', level: 60, category: 'Backend' },
  { id: 7, name: 'Figma', level: 70, category: 'UI/UX' },
  { id: 8, name: 'Docker', level: 55, category: 'DevOps' },
]
