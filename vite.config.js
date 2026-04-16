import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(() => {
  // Repo objetivo para GitHub Pages:
  // https://fmonroy75.github.io/riggersPro/
  const base = '/riggersPro/'

  return {
    base,

plugins:[

vue(),
//modo offline
VitePWA({

registerType:'autoUpdate',

manifest:{

name:'Rigger Pro Calculators',
short_name:'RiggerCalc',

theme_color:'#121212',

icons:[

{
src:'icon-512.svg',
sizes:'192x192',
type:'image/svg+xml'
},

{
src:'icon-512.svg',
sizes:'512x512',
type:'image/svg+xml'
}

]

},

workbox:{
globPatterns:['**/*.{js,css,html,png,svg}']
}

})

],
resolve:{
  alias:{
    '@':path.resolve(__dirname,'./src')
  }
}

  }
})
