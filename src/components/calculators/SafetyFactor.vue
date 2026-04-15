<template>

    <v-container>
    
    <h1>Safety Factor</h1>
    
    <v-text-field label="Breaking Strength" v-model.number="strength"/>
    <v-text-field label="Working Load" v-model.number="load"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="sf" type="info">
    Safety Factor: {{ sf.toFixed(2) }}
    </v-alert>
    
    </v-container>
    
    </template>
    
    <script>
    export default{
    
    data(){
    return{
    strength:null,
    load:null,
    sf:null
    }
    },
    
    methods:{
    calculate(){
    this.sf=this.strength/this.load
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Safety Factor",
    load:this.load,
    strength:this.strength,
    result:this.sf,
    date:new Date()
    })
    //historial

    }
    }
    
    }
    </script>