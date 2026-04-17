import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

// Obtener el idioma del navegador por defecto (ej: 'es-ES' -> 'es')
let userLang = navigator.language || navigator.userLanguage
userLang = userLang.split('-')[0]

// Si el idioma no es español, ponemos inglés por defecto
const defaultLocale = userLang === 'es' ? 'es' : 'en'

const i18n = createI18n({
  legacy: false, // OBLIGATORIO en Vue 3 (Composition API)
  locale: defaultLocale, 
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
})

export default i18n
