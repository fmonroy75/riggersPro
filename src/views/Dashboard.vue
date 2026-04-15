<template>

    <v-container>
    
    <h1>Rigging Analytics</h1>
    
    <v-row>
    
    <v-col cols="12" md="4">
    
    <v-card class="pa-4">
    
    <h3>Total Lifts</h3>
    
    <h1>{{ totalLifts }}</h1>
    
    </v-card>
    
    </v-col>
    
    <v-col cols="12" md="4">
    
    <v-card class="pa-4">
    
    <h3>Average Load</h3>
    
    <h1>{{ avgLoad }} kg</h1>
    
    </v-card>
    
    </v-col>
    
    <v-col cols="12" md="4">
    
    <v-card class="pa-4">
    
    <h3>Average Angle</h3>
    
    <h1>{{ avgAngle }} °</h1>
    
    </v-card>
    
    </v-col>
    
    </v-row>
    
    </v-container>
    
    </template>
    
    <script>
    
    export default{
    
    computed:{
    
    history(){
    return this.$store.state.history
    },
    
    totalLifts(){
    return this.history.length
    },
    
    avgLoad(){
    
    if(!this.history.length) return 0
    
    let sum=0
    
    this.history.forEach(h=>{
    
    sum+=Number(h.load||0)
    
    })
    
    return (sum/this.history.length).toFixed(1)
    
    },
    
    avgAngle(){
    
    let angles=this.history
    .filter(h=>h.angle)
    .map(h=>h.angle)
    
    if(!angles.length) return 0
    
    let sum=angles.reduce((a,b)=>a+b,0)
    
    return (sum/angles.length).toFixed(1)
    
    }
    
    }
    
    }
    
    </script>