export interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
}

export const experienceMock: Experience[] = [
  {
    id: 1,
    company: "Najot Ta'lim",
    position: 'Frontend Developer',
    startDate: '2022-03-01',
    endDate: '',
    isCurrent: true,
    description: 'Vue.js va Nuxt.js asosida korporativ loyihalar ustida ishlash.',
  },
  {
    id: 2,
    company: 'IT Park Uzbekistan',
    position: 'Junior Frontend Developer',
    startDate: '2021-01-01',
    endDate: '2022-02-01',
    isCurrent: false,
    description: 'React va TypeScript bilan SPA ilovalar yaratish.',
  },
  {
    id: 3,
    company: 'Freelance',
    position: 'Web Developer',
    startDate: '2020-06-01',
    endDate: '2021-01-01',
    isCurrent: false,
    description: 'Turli mijozlar uchun landing page va portfolio saytlar.',
  },
]
