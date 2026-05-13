// export interface LanguageOption {
//   label: string
//   value: string
// }

// export const profileMock = {
//   fullName: 'Mansur Ergashov',
//   username: 'mansurdev',
//   email: 'mansur@example.com',
//   phone: '+998 90 123 45 67',
//   profession: 'Frontend Developer',
//   aboutShort: "Vue.js va Nuxt.js bo'yicha 5 yillik tajribaga ega frontend developer.",
//   aboutLong:
//     'Men zamonaviy web texnologiyalar bilan ishlayman. Vue 3, Nuxt 3, TypeScript, Tailwind CSS — asosiy stegim. Freelance va full-time loyihalarda ishlaganman. Toshkent shahrida yashayman, remote ish ham qilaman.',
//   address: "Toshkent, O'zbekiston",
//   birthDate: '1998-05-15',
//   experienceYears: '5',
//   languages: ['Uzbek', 'Russian', 'English'],
//   github: 'https://github.com/mansurdev',
//   linkedin: 'https://linkedin.com/in/mansurdev',
//   telegram: '@mansurdev',
//   profileImage: null,
//   resume: null,
// }

// export const professionOptions = [
//   'Frontend Developer',
//   'Backend Developer',
//   'Fullstack Developer',
//   'UI/UX Designer',
//   'Mobile Developer',
//   'DevOps Engineer',
//   'QA Engineer',
// ]

// // export const languageOptions = ['Uzbek', 'Russian', 'English', 'German', 'French', 'Chinese']

// export const languageOptions: LanguageOption[] = [
//   { label: 'English', value: 'en' },
//   { label: 'Русский', value: 'ru' },
//   { label: 'O‘zbek', value: 'uz' },
//   { label: 'Türkçe', value: 'tr' },
//   { label: 'Қазақша', value: 'kk' },
//   { label: 'Кыргызча', value: 'ky' },
//   { label: 'Тоҷикӣ', value: 'tg' },
//   { label: 'Türkmençe', value: 'tk' },
//   { label: 'Azərbaycan dili', value: 'az' },
//   { label: 'ქართული', value: 'ka' },
//   { label: 'Հայերեն', value: 'hy' },
//   { label: 'Deutsch', value: 'de' },
//   { label: 'Français', value: 'fr' },
//   { label: 'Español', value: 'es' },
//   { label: 'Italiano', value: 'it' },
//   { label: 'Português', value: 'pt' },
//   { label: 'Nederlands', value: 'nl' },
//   { label: 'Polski', value: 'pl' },
//   { label: 'Čeština', value: 'cs' },
//   { label: 'Slovenčina', value: 'sk' },
//   { label: 'Magyar', value: 'hu' },
//   { label: 'Română', value: 'ro' },
//   { label: 'Български', value: 'bg' },
//   { label: 'Српски', value: 'sr' },
//   { label: 'Hrvatski', value: 'hr' },
//   { label: 'Slovenščina', value: 'sl' },
//   { label: 'Shqip', value: 'sq' },
//   { label: 'Ελληνικά', value: 'el' },
//   { label: 'Українська', value: 'uk' },
//   { label: 'Беларуская', value: 'be' },
//   { label: 'العربية', value: 'ar' },
//   { label: 'فارسی', value: 'fa' },
//   { label: 'עברית', value: 'he' },
//   { label: 'हिन्दी', value: 'hi' },
//   { label: 'বাংলা', value: 'bn' },
//   { label: 'اردو', value: 'ur' },
//   { label: 'தமிழ்', value: 'ta' },
//   { label: 'తెలుగు', value: 'te' },
//   { label: 'മലയാളം', value: 'ml' },
//   { label: 'ಕನ್ನಡ', value: 'kn' },
//   { label: 'मराठी', value: 'mr' },
//   { label: 'ગુજરાતી', value: 'gu' },
//   { label: 'ਪੰਜਾਬੀ', value: 'pa' },
//   { label: '中文', value: 'zh' },
//   { label: '日本語', value: 'ja' },
//   { label: '한국어', value: 'ko' },
//   { label: 'ไทย', value: 'th' },
//   { label: 'Tiếng Việt', value: 'vi' },
//   { label: 'Bahasa Indonesia', value: 'id' },
//   { label: 'Bahasa Melayu', value: 'ms' },
// ]

export interface LanguageOption {
  label: string
  value: string
}

export interface ProfileMock {
  fullName: string
  username: string
  email: string
  phone: string
  profession: string
  aboutShort: string
  aboutLong: string
  address: string
  birthDate: string
  experienceYears: string
  languages: string[]
  github: string
  linkedin: string
  telegram: string
  profileImage: File | null
  resume: File | null
}

export const profileMock: ProfileMock = {
  fullName: 'Mansur Ergashov',
  username: 'mansurdev',
  email: 'mansur@example.com',
  phone: '+998 90 123 45 67',
  profession: 'Frontend Developer',
  aboutShort: "Vue.js va Nuxt.js bo'yicha 5 yillik tajribaga ega frontend developer.",
  aboutLong:
    'Men zamonaviy web texnologiyalar bilan ishlayman. Vue 3, Nuxt 3, TypeScript, Tailwind CSS — asosiy stegim.',
  address: "Toshkent, O'zbekiston",
  birthDate: '1998-05-15',
  experienceYears: '5',
  languages: ['uz', 'ru', 'en'],
  github: 'https://github.com/mansurdev',
  linkedin: 'https://linkedin.com/in/mansurdev',
  telegram: '@mansurdev',
  profileImage: null,
  resume: null,
}

export const professionOptions = [
  { label: 'Frontend Developer', value: 'Frontend Developer' },
  { label: 'Backend Developer', value: 'Backend Developer' },
  { label: 'Fullstack Developer', value: 'Fullstack Developer' },
  { label: 'UI/UX Designer', value: 'UI/UX Designer' },
  { label: 'Mobile Developer', value: 'Mobile Developer' },
  { label: 'DevOps Engineer', value: 'DevOps Engineer' },
  { label: 'QA Engineer', value: 'QA Engineer' },
]

export const languageOptions: LanguageOption[] = [
  { label: "O'zbek", value: 'uz' },
  { label: 'Русский', value: 'ru' },
  { label: 'English', value: 'en' },
  { label: 'Türkçe', value: 'tr' },
  { label: 'Қазақша', value: 'kk' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Français', value: 'fr' },
  { label: 'Español', value: 'es' },
  { label: '中文', value: 'zh' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
  { label: 'العربية', value: 'ar' },
]
