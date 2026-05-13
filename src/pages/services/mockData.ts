export interface Service {
  id: number
  name: string
  description: string
  price: number
  deliveryTime: string
}

export const servicesMock: Service[] = [
  {
    id: 1,
    name: 'Landing Page',
    description: 'Zamonaviy va tez yuklanadigan landing page sayt yaratish',
    price: 500,
    deliveryTime: '3-5 kun',
  },
  {
    id: 2,
    name: 'Admin Panel',
    description: "Vue.js asosida to'liq funksional admin panel",
    price: 1500,
    deliveryTime: '10-15 kun',
  },
  {
    id: 3,
    name: 'Portfolio Sayt',
    description: 'Shaxsiy portfolio sayt dizayn va dasturlash',
    price: 300,
    deliveryTime: '2-3 kun',
  },
  {
    id: 4,
    name: 'API Integration',
    description: 'Mavjud saytga REST API ulash va integratsiya',
    price: 400,
    deliveryTime: '3-7 kun',
  },
]
