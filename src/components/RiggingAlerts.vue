<template>

    <div v-if="alerts.length" class="alerts">
    
    <div
    v-for="(a,index) in alerts"
    :key="index"
    :class="['alert',a.level]"
    >
    
    ⚠️ {{ a.message }}
    
    </div>
    
    </div>
    
    </template>
    
    <script setup>
    
    defineProps({
    alerts:{
    type:Array,
    default:()=>[]
    }
    })
    
    </script>
    
    <style scoped>
    
    .alerts{
    margin-top:20px
    }
    
    .alert{
    padding:12px;
    border-radius:8px;
    margin-bottom:8px;
    font-weight:500
    }
    
    .warning{
    background:#fff3cd;
    color:#856404
    }
    
    .danger{
    background:#f8d7da;
    color:#721c24
    }
    
    </style>