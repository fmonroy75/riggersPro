<script setup>

import { useRouter } from "vue-router"

const router = useRouter()

const calculators = [

{ name:"Sling Tension", icon:"🪝", route:"/calc/tension" },
{ name:"Angle Factor", icon:"📐", route:"/calc/angle-factor" },
{ name:"Load Weight", icon:"⚖️", route:"/calc/load-weight" },
{ name:"Center Gravity", icon:"⚙️", route:"/calc/cog" },
{ name:"Crane Moment", icon:"🏗️", route:"/calc/crane-moment" },
{ name:"Shackle Safety", icon:"🔗", route:"/calc/shackle-safety" },
{ name:"Multi Leg Sling", icon:"🪢", route:"/calc/multi-leg" },
{ name:"Load Distribution", icon:"📦", route:"/calc/distribution" },
{ name:"Wind Load", icon:"🌬️", route:"/calc/wind" },
{ name:"Hook Load", icon:"🪝", route:"/calc/hook" },
{ name:"Safety Factor", icon:"⚠️", route:"/calc/safety" },
{ name:"Lift Planning", icon:"📋", route:"/calc/lift" }

]

</script>

<template>

<div class="home">

<h1 class="title">

RIGGER <span>PRO</span>

</h1>

<div class="grid">

<div
v-for="calc in calculators"
:key="calc.name"
class="card"
@click="router.push(calc.route)"
>

<div class="icon">

{{ calc.icon }}

</div>

<div class="name">

{{ calc.name }}

</div>

</div>

</div>

<div class="sponsor">

Powered by  
<b>IngeniumBright</b>  
&  
<b>LanguageArtLife</b>

</div>

</div>

</template>

<style scoped>

.home{

padding:30px;

}

.title{

text-align:center;
margin-bottom:30px;
font-size:34px;

}

.title span{

color:#facc15;

}

.grid{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:16px;

}

.card{

background:#1e293b;

padding:18px;

border-radius:12px;

text-align:center;

cursor:pointer;

transition:0.25s;

}

.card:hover{

background:#334155;
transform:scale(1.05);

}

.icon{

font-size:30px;
margin-bottom:8px;

}

.name{

font-size:14px;

}

.sponsor{

margin-top:40px;
text-align:center;
opacity:0.6;

}

</style>