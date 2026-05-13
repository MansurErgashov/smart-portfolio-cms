export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubLink: string
  demoLink: string
  image: string | null
  startDate: string
  endDate: string
  status: 'in_progress' | 'completed' | 'archived'
}

export const statusOptions = [
  { label: 'Jarayonda', value: 'in_progress' },
  { label: 'Tugallangan', value: 'completed' },
  { label: 'Arxivlangan', value: 'archived' },
]

export const statusColors: Record<string, string> = {
  in_progress: 'blue',
  completed: 'green',
  archived: 'default',
}

export const statusLabels: Record<string, string> = {
  in_progress: 'Jarayonda',
  completed: 'Tugallangan',
  archived: 'Arxivlangan',
}

export const projectsMock: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: "To'liq funksional onlayn do'kon platformasi",
    technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Supabase'],
    githubLink: 'https://github.com/mansurdev/ecommerce',
    demoLink: 'https://ecommerce.mansurdev.uz',
    image: null,
    startDate: '2024-01-01',
    endDate: '2024-06-01',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Jamoaviy vazifalarni boshqarish ilovasi',
    technologies: ['Vue.js', 'TypeScript', 'Pinia'],
    githubLink: 'https://github.com/mansurdev/task-app',
    demoLink: 'https://tasks.mansurdev.uz',
    image: null,
    startDate: '2024-03-01',
    endDate: '',
    status: 'in_progress',
  },
  {
    id: 3,
    title: 'Portfolio Platform',
    description: "Ko'p foydalanuvchili portfolio platforma",
    technologies: ['Vue.js', 'Nuxt.js', 'Supabase', 'Tailwind CSS'],
    githubLink: 'https://github.com/mansurdev/devport',
    demoLink: 'https://devport.uz',
    image: null,
    startDate: '2024-04-01',
    endDate: '',
    status: 'in_progress',
  },
]
