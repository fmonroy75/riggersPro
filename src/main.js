import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@mdi/font/css/materialdesignicons.css'
//modo offline
import { registerSW } from 'virtual:pwa-register'

registerSW()
//*** */
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
  