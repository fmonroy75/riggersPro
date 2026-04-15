<template>

    <v-container>
    
    <h1>Shackle Safety</h1>
    
    <v-text-field label="Load (kg)" v-model.number="load"/>
    <v-text-field label="Shackle WLL (kg)" v-model.number="wll"/>
    
    <v-btn color="primary" @click="calculate">Check</v-btn>
    
    <v-alert v-if="sf" type="info">
    Safety Factor: {{ sf.toFixed(2) }}
    </v-alert>
    
    </v-container>
    
    </template>
    
    <script>
    export default{
    
    data(){
    return{
    load:null,
    wll:null,
    sf:null
    }
    },
    
    methods:{
    calculate(){
    this.sf = this.wll / this.load
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Shacle Safety",
    load:this.load,
    wll:this.wll,
    result:this.sf,
    date:new Date()
    })
    //historial
    }
    }
    
    }
    </script>