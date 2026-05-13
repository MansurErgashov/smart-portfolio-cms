export interface Education {
  id: number
  university: string
  faculty: string
  degree: string
  startYear: string
  endYear: string
}

export const degreeOptions = [
  { label: 'Bakalavr', value: 'bachelor' },
  { label: 'Magistr', value: 'master' },
  { label: 'PhD', value: 'phd' },
  { label: "O'rta maxsus", value: 'college' },
  { label: 'Kurs / Bootcamp', value: 'course' },
]

export const educationMock: Education[] = [
  {
    id: 1,
    university: 'Toshkent Axborot Texnologiyalari Universiteti',
    faculty: 'Dasturiy injiniring',
    degree: 'bachelor',
    startYear: '2018',
    endYear: '2022',
  },
  {
    id: 2,
    university: "Najot Ta'lim",
    faculty: 'Frontend Development',
    degree: 'course',
    startYear: '2021',
    endYear: '2022',
  },
]
