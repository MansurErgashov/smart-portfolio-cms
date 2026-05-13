export interface Certificate {
  id: number
  name: string
  organization: string
  issueDate: string
  file: string | null
  link: string
}

export const certificatesMock: Certificate[] = [
  {
    id: 1,
    name: 'Vue.js Advanced Certificate',
    organization: 'Vue School',
    issueDate: '2023-06-15',
    file: null,
    link: 'https://vueschool.io/certificates/abc123',
  },
  {
    id: 2,
    name: 'TypeScript Professional',
    organization: 'Udemy',
    issueDate: '2023-03-10',
    file: null,
    link: 'https://udemy.com/certificate/xyz789',
  },
  {
    id: 3,
    name: 'Nuxt.js Fundamentals',
    organization: 'Nuxt Nation',
    issueDate: '2024-01-20',
    file: null,
    link: 'https://nuxt.com/cert/def456',
  },
]
