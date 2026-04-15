<template>

    <v-container>
    
    <h1>Center of Gravity</h1>
    
    <v-text-field label="Weight 1" v-model.number="w1"/>
    <v-text-field label="Distance 1" v-model.number="d1"/>
    
    <v-text-field label="Weight 2" v-model.number="w2"/>
    <v-text-field label="Distance 2" v-model.number="d2"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="cg" type="info">
    Center of Gravity: {{ cg.toFixed(2) }}
    </v-alert>
    
    </v-container>
    
    </template>
    
    <script>
    export default{
    
    data(){
    return{
    w1:null,
    d1:null,
    w2:null,
    d2:null,
    cg:null
    }
    },
    
    methods:{
    calculate(){
    
    this.cg = ((this.w1*this.d1)+(this.w2*this.d2))/(this.w1+this.w2)
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Center Gravity",
    w1:this.w1,
    d1:this.d1,
    w2:this.w2,
    d2:this.d2,   
    result:this.cg,
    date:new Date()
    })
    //historial  
    }
    }
    
    }
    </script>