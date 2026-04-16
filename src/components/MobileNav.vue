<script setup>

import { useRouter } from "vue-router"

const router = useRouter()

</script>

<template>

<nav class="nav">
<div class="item" @click="router.push('/install')">
<span class="icon">📲</span>
<span>Install</span>
</div>
<div class="item" @click="router.push('/')">

<span class="icon">🏠</span>
<span>Home</span>

</div>

<div class="item" @click="router.push('/dashboard')">

<span class="icon">📊</span>
<span>Stats</span>

</div>

<div class="item premium">

<span class="icon">⭐</span>
<span>Pro</span>

</div>

</nav>

</template>

<style scoped>

.nav{

position:fixed;

bottom:0;

left:0;

right:0;

height:72px;

background:#020617;

border-top:1px solid #1e293b;

display:flex;

justify-content:space-around;

align-items:center;

z-index:100;

}

.item{

display:flex;

flex-direction:column;

align-items:center;
justify-content:center;
gap:2px;
min-width:64px;
height:100%;

font-size:12px;
line-height:1.1;
font-weight:500;

color:#94a3b8;

cursor:pointer;

}

.icon{
display:flex;
align-items:center;
justify-content:center;
font-size:20px;
line-height:1;
height:22px;
width:22px;
}

.item:hover{

color:#facc15;

}

.premium{

color:#facc15;

}

</style>