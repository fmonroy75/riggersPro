<script setup>
import MobileNav from '@/components/MobileNav.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'es' : 'en'
}
</script>

<template>
  <div class="app">
    <div class="global-navbar">
      <button v-if="$route.path.startsWith('/calc')" class="back-nav-btn" @click="$router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="back-icon"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l169.4-169.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
        {{ $t('app.back_to_menu') }}
      </button>

      <div class="lang-switch-container">
        <button class="lang-btn" :class="{active: locale === 'en'}" @click="locale = 'en'">EN</button>
        <div class="lang-divider">|</div>
        <button class="lang-btn" :class="{active: locale === 'es'}" @click="locale = 'es'">ES</button>
      </div>
    </div>
  
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  
    <MobileNav/>
  </div>
</template>

<style>
.global-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}
.lang-switch-container {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1e293b;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #334155;
  margin-left: auto;
}
.lang-divider {
  color: #475569;
  font-size: 14px;
}
.lang-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}
.lang-btn:hover {
  color: #facc15;
}
.lang-btn.active {
  color: #facc15;
  text-shadow: 0 0 8px rgba(250, 204, 21, 0.4);
}
.back-nav-btn{
    display:flex;
    align-items:center;
    gap:8px;
    background:none;
    border:none;
    color:#94a3b8;
    font-size:16px;
    font-weight:600;
    cursor:pointer;
    padding:16px 20px;
    transition:color 0.2s ease;
  }
  .back-nav-btn:hover{
    color:#facc15;
  }
  .back-icon{
    width:16px;
    height:16px;
  }
  .app{
  min-height:100vh;
  padding-bottom:72px;
  box-sizing:border-box;
  }
  
  .fade-enter-active,
  .fade-leave-active{
  transition:0.3s;
  }
  
  .fade-enter-from,
  .fade-leave-to{
  opacity:0;
  transform:translateY(10px);
  }
  
  </style>