<template>

    <v-container>
    
    <h1>Crane Moment</h1>
    
    <v-text-field label="Load Weight (kg)" v-model.number="weight"/>
    <v-text-field label="Radius (m)" v-model.number="radius"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="moment" type="info">
    Moment: {{ moment.toFixed(2) }} kg·m
    </v-alert>
    
    </v-container>
    
    </template>
    
    <script>
    export default{
    
    data(){
    return{
    weight:null,
    radius:null,
    moment:null
    }
    },
    
    methods:{
    calculate(){
    this.moment = this.weight * this.radius
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Crane Moment",
    weight:this.weight,
    radius:this.radius,
    
    result:this.moment,
    date:new Date()
    })
    //historial     
    }
    }
    
    }
    </script>