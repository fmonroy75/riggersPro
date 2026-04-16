<template>

  <div class="app">
  
  <router-view v-slot="{ Component }">
  
  <transition name="fade" mode="out-in">
  
  <component :is="Component"/>
  
  </transition>
  
  </router-view>
  
  <MobileNav/>
  
  </div>
  
  </template>
  
  <style>
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