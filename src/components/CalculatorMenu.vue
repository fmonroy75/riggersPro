<script setup>

const calculators = [

{ name:"Sling Tension", route:"/calc/tension" },
{ name:"Angle Factor", route:"/calc/angle-factor" },
{ name:"Load Weight", route:"/calc/load-weight" },
{ name:"Center Gravity", route:"/calc/cog" },
{ name:"Crane Moment", route:"/calc/crane-moment" },
{ name:"Shackle Safety", route:"/calc/shackle-safety" },
{ name:"Multi Leg Sling", route:"/calc/multi-leg" },
{ name:"Load Distribution", route:"/calc/distribution" },
{ name:"Wind Load", route:"/calc/wind" },
{ name:"Hook Load", route:"/calc/hook" },
{ name:"Safety Factor", route:"/calc/safety" },
{ name:"Lift Planning", route:"/calc/lift" }

]

</script>

<template>

<div class="grid">

<div
v-for="calc in calculators"
:key="calc.name"
class="card"
>

<router-link :to="calc.route">

<div class="icon">
{{ calc.icon }}
</div>

<div class="title">
{{ calc.name }}
</div>

</router-link>

</div>

</div>

</template>

<style scoped>

.grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:12px;
padding:20px;
}

.card{
background:#1e293b;
border-radius:12px;
padding:18px;
text-align:center;
color:white;
transition:0.3s;
}

.card:hover{
background:#334155;
}

.icon{
font-size:28px;
margin-bottom:10px;
}

.title{
font-size:14px;
}

</style>