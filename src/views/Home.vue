<template>

    <v-container>
    
    <h1 class="mb-6">Rigger Calculators</h1>
    
    <v-row>
    
    <v-col
    v-for="calc in calculators"
    :key="calc.name"
    cols="12"
    md="4"
    >
    
    <v-card
    class="pa-4"
    @click="$router.push(calc.route)"
    >
    
    <v-card-title>
    {{ calc.name }}
    </v-card-title>
    
    <v-card-text>
    {{ calc.description }}
    </v-card-text>
    
    </v-card>
    
    </v-col>
    
    </v-row>
    
    </v-container>
    
    </template>
    
    <script>
    
    export default{
    
    data(){
    
    return{
    
    calculators:[
    {
name:"Dashboard",
route:"/dashboard",
description:"Rigging analytics"
},
    { name:"Sling Tension", route:"/calc/tension", description:"Tension on sling legs" },
    
    { name:"Sling Angle Factor", route:"/calc/angle-factor", description:"Angle multiplier" },
    
    { name:"Load Weight", route:"/calc/load-weight", description:"Weight from density and volume" },
    
    { name:"Center of Gravity", route:"/calc/cog", description:"Calculate load balance" },
    
    { name:"Crane Moment", route:"/calc/crane-moment", description:"Load moment for crane" },
    
    { name:"Shackle Safety", route:"/calc/shackle-safety", description:"Check shackle safety factor" },
    
    { name:"Multi-leg Sling", route:"/calc/multi-leg", description:"Tension on multiple sling legs" },
    
    { name:"Load Distribution", route:"/calc/distribution", description:"Load distribution points" },
    
    { name:"Wind Load", route:"/calc/wind", description:"Wind force on load" },
    
    { name:"Safety Factor", route:"/calc/safety", description:"General safety factor" },
    
    { name:"Hook Load", route:"/calc/hook", description:"Total hook load" },
    
    { name:"Lift Planning", route:"/calc/lift", description:"Lift planning with margin" }
    
    ]
    
    }
    
    }
    
    }
    
    </script>