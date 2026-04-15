<template>

    <v-container>
    
    <h1>Sling Angle Factor</h1>
    
    <v-text-field
    label="Angle (degrees)"
    v-model.number="angle"
    type="number"
    />
    
    <v-btn @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="factor" type="info">
    
    Factor: {{ factor.toFixed(2) }}
    
    </v-alert>
    
    </v-container>
    
    </template>
    
    <script>
    
    export default{
    
    data(){
    
    return{
    angle:null,
    factor:null
    }
    
    },
    
    methods:{
    
    calculate(){
    
    const radians = this.angle * Math.PI/180
    
    this.factor = 1 / Math.sin(radians)
    
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Sling Angle Tension",
    angle:this.angle,
    result:this.factor,
    date:new Date()
    })

    }
    
    }
    
    }
    
    </script>