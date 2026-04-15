<template>

    <v-container>
    
    <h1>Total Hook Load</h1>
    
    <v-text-field label="Load Weight" v-model.number="load"/>
    <v-text-field label="Rigging Gear Weight" v-model.number="gear"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="total" type="info">
    Total Hook Load: {{ total }} kg
    </v-alert>
    
    </v-container>
    
    </template>
    
    <script>
    export default{
    
    data(){
    return{
    load:null,
    gear:null,
    total:null
    }
    },
    
    methods:{
    calculate(){
    this.total=this.load+this.gear
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Hook Load",
    load:this.load,
    gear:this.gear,
    
    result:this.total,
    date:new Date()
    })
    //historial  
    }
    }
    
    }
    </script>