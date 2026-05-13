export interface Blog {
  id: number
  title: string
  content: string
  image: string | null
  category: string
  tags: string[]
  published: boolean
  createdAt: string
  readTime: number
  views: number
}

export const categoryOptions = [
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'UI/UX', value: 'UI/UX' },
  { label: 'Career', value: 'Career' },
  { label: 'Other', value: 'Other' },
]

export const blogsMock: Blog[] = [
  {
    id: 1,
    title: 'Vue 3 da Composition API nima va qanday ishlatiladi?',
    content:
      '<p>Vue 3 ning Composition API — bu komponentlarni yanada moslashuvchan tarzda tashkil etish imkonini beruvchi yangi yondashuv...</p>',
    image: null,
    category: 'Frontend',
    tags: ['Vue.js', 'JavaScript', 'Composition API'],
    published: true,
    createdAt: '2024-05-10',
    readTime: 5,
    views: 120,
  },
  {
    id: 2,
    title: 'Nuxt.js bilan SEO ni qanday yaxshilash mumkin?',
    content:
      "<p>Nuxt.js SSR imkoniyatlari orqali saytingizning SEO ko'rsatkichlarini sezilarli darajada oshirishingiz mumkin...</p>",
    image: null,
    category: 'Frontend',
    tags: ['Nuxt.js', 'SEO'],
    published: true,
    createdAt: '2024-04-22',
    readTime: 7,
    views: 85,
  },
  {
    id: 3,
    title: 'TypeScript tips and best practices',
    content: `<p>TypeScript: Mukammal Kod Yozish Bo‘yicha Eng Yaxshi Amaliyotlar
TypeScript — bu shunchaki JavaScript-ga qo‘shilgan "tiplar" emas, balki loyihangizning barqarorligini ta’minlovchi va jamoaviy ishlashni osonlashtiruvchi kuchli vositadir. Quyida TypeScript bilan ishlashda uni yanada samaraliroq qiladigan eng foydali usullar va "good practices" jamlangan.

1. any Tipidan Butunlay Voz Keching
Dasturchilar ko‘pincha vaqtni tejash uchun yoki tipni aniqlashga eringanda any ishlatishadi, lekin bu TypeScript-ning barcha afzalliklarini yo‘qqa chiqaradi. Agar o‘zgaruvchi tipi noma’lum bo‘lsa, unknown ishlating. Bu sizni ushbu o‘zgaruvchi bilan ishlashdan oldin uning tipini tekshirishga (Type Guard) majbur qiladi va xavfsizlikni ta'minlaydi.

2. Interface va Type Alias: To'g'ri tanlov
Garchi ikkalasi o‘xshash bo‘lsa-da, ularning o'z o'rni bor. Obyektlar strukturasi va klasslar uchun interfacedan foydalangan ma'qul, chunki ularni "extends" qilish oson. Murakkab tiplar (Union, Intersection) yoki Tuple'lar uchun esa type alias qulayroq hisoblanadi.

3. Utility Types: Tayyor Yechimlardan Foydalaning
TypeScript o'zida bir qancha yordamchi tiplarni saqlaydi, masalan:

Partial<T> — barcha xususiyatlarni ixtiyoriy (optional) qiladi.

Readonly<T> — ma’lumotlarni faqat o‘qish uchun qilib qo‘yadi, bu esa kutilmagan o'zgarishlarning oldini oladi.

Pick<T, K> — mavjud tipdan faqat kerakli qismlarni ajratib olishga yordam beradi.

4. Generics: Kodni Qayta Ishlatish San’ati
Generics yordamida har qanday tip bilan ishlay oladigan funksiya yoki komponentlar yaratishingiz mumkin. Bu ayniqsa API dan keladigan ma’lumotlarni qayta ishlashda kodingizni qisqartiradi va dinamiklikni oshiradi.

5. Strict Mode — Sifat Kafolati
Loyihani boshlayotganda har doim tsconfig.json faylida strict: true rejimini yoqing. Bu sizni null va undefined bilan bog‘liq bo‘lgan, JavaScript-da eng ko‘p uchraydigan "runtime" xatolaridan himoya qiladi.

6. Optional Chaining va Nullish Coalescing
Dasturda undefined qiymatlar bilan ishlashda ?. va ?? operatorlaridan foydalaning. Bu nafaqat kodni qisqartiradi, balki "Cannot read property of undefined" kabi xunuk xatolarning oldini oladi.</p>`,
    image: null,
    category: 'Frontend',
    tags: ['TypeScript'],
    published: false,
    createdAt: '2024-03-15',
    readTime: 8,
    views: 0,
  },
]
