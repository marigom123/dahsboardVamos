// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    SOCKET: process.env.SOCKET,
    public: {
        SOCKET: process.env.SOCKET,
    }
  },
  modules: ['@pinia/nuxt', 'nuxt-icon'],
  pinia: {
    autoImports: [
        'defineStore', 
    ],
  },
  css: ["bootstrap/dist/css/bootstrap.min.css", "primevue/resources/themes/lara-light-teal/theme.css"],
  build: {
    transpile: ['primevue']
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'initial-scale=1',
      title: 'Dasboard',
      meta: [
        { name: 'description', content: 'Dasboard vamos palante.'}
      ],
    script: [
      {
        // src: "https://kit.fontawesome.com/a076d05399.js",
        src:"https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
      },
      {
        // src: "https://kit.fontawesome.com/a076d05399.js",
        src:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
      }
    ],
    link:[
        // {
        //     rel: "stylesheet",
        //     href:
        //         "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
        // },
      ]
    },
  },
})
