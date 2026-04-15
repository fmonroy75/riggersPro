<script setup>

import { ref } from "vue"

const totalLifts = ref(3)
const avgLoad = ref(1800)
const avgAngle = ref(45)

</script>

<template>

<div class="dashboard">

<h2>

Rigging Analytics

</h2>

<div class="stats">

<div class="card">

Total Lifts

<h3>{{ totalLifts }}</h3>

</div>

<div class="card">

Average Load

<h3>{{ avgLoad }} kg</h3>

</div>

<div class="card">

Average Angle

<h3>{{ avgAngle }}°</h3>

</div>

</div>

<div class="upgrade">

Upgrade to Premium  
to unlock full analytics

</div>

</div>

</template>

<style scoped>

.dashboard{
padding:20px;
}

.stats{
display:flex;
gap:10px;
}

.card{
background:#1e293b;
padding:20px;
flex:1;
border-radius:10px;
}

.upgrade{
margin-top:30px;
text-align:center;
opacity:0.7;
}

</style>