// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Questionnaires',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  modules: ['@nuxt/ui'],
  // plugins: ['~/plugins/devalue.ts'],
  // ui: {
  //   // Дополнительные настройки Nuxt UI (опционально)
  // },
  // modules: ['@nuxtjs/prisma'],
  // prisma: {
  //   client: {
  //     // Настройки клиента Prisma
  //   }
  // }
})
