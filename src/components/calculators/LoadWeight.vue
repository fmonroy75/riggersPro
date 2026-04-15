<template>

    <v-container>
    
    <h1>Load Weight Calculator</h1>
    
    <v-text-field label="Density (kg/m3)" v-model.number="density"/>
    <v-text-field label="Volume (m3)" v-model.number="volume"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="weight" type="info">
    Weight: {{ weight.toFixed(2) }} kg
    </v-alert>
    
    </v-container>
    
    </template>
    
    <script>
    export default{
    
    data(){
    return{
    density:null,
    volume:null,
    weight:null
    }
    },
    
    methods:{
    calculate(){
    this.weight = this.density * this.volume
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Load weight",
    volume:this.volume,
    density:this.density,
    result:this.weight,
    date:new Date()
    })
    //historial
    }
    }
    
    }
    </script>