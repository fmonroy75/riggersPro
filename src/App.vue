<template>

  <div class="app">
  
  <button v-if="$route.path.startsWith('/calc')" class="back-nav-btn" @click="$router.push('/')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="back-icon"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l169.4-169.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
    Volver al menú principal
  </button>
  
  <router-view v-slot="{ Component }">
  
  <transition name="fade" mode="out-in">
  
  <component :is="Component"/>
  
  </transition>
  
  </router-view>
  
  <MobileNav/>
  
  </div>
  
  </template>
  
  <style>
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