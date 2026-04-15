import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({

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
src:'/icon-192.png',
sizes:'192x192',
type:'image/png'
},

{
src:'/icon-512.png',
sizes:'512x512',
type:'image/png'
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

})
