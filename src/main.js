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

//animaciones suaves
import { MotionPlugin } from '@vueuse/motion'


/** */

import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import i18n from './i18n'

let app

onAuthStateChanged(auth, (user) => {
  store.commit('SET_USER', user)
  if (user) {
    store.dispatch('fetchUserProfile', user.uid)
  }
  store.commit('SET_AUTH_IS_READY', true)

  if (!app) {
    app = createApp(App)
      .use(router)
      .use(store)
      .use(vuetify)
      .use(MotionPlugin)
      .use(i18n)
      .mount('#app')
  }
})
  