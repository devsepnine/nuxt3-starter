import {defineNuxtConfig} from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'Nuxt3 Starter',
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=0',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'keywords',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'description',
      },
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
    script: [],
  },

  css: ['@/assets/style/css/normalize.css', '@/assets/style/scss/app.scss'],

  // https://github.com/intlify/nuxt3
  buildModules: ['@intlify/nuxt3'],

  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        // https://github.com/nuxt-community/style-resources-module/issues/190
        scss: {
          additionalData: '@import "@/assets/style/scss/global.scss";',
        },
      },
    },
  },
  router: {},
  build: {},
});
