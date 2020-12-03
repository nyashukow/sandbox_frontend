export default {
  server: {
    host: '0.0.0.0',
    port: 8081
  },
  ssr: false,
  target: 'static',
  head: {
    titleTemplate: '%s',
    title: 'sandbox_frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
    '~/plugins/composition-api',
    '~/plugins/graphql'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: 'http://localhost:8080'
  },
  // publicRuntimeConfig: {
  //   axios: {
      
  //   }
  // },
  vuetify: {},
  build: {
  },
  watchers: {
    webpack: {
      aggregateTimeout:300,
      poll: 1000
    }
  }
}
