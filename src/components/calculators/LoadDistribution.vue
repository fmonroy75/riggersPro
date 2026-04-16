<template>

    <v-container>
    
    <h1>Load Distribution</h1>
    
    <v-text-field label="Total Load (kg)" v-model.number="load"/>
    <v-text-field label="Distance 1" v-model.number="d1"/>
    <v-text-field label="Distance 2" v-model.number="d2"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="r1" type="info">
    Load on Point 1: {{ r1.toFixed(2) }} kg
    </v-alert>
    <RiggingAlerts :alerts="alerts" />
    
    </v-container>
    
    </template>
    
    <script>
    import { analyzeLift } from "@/services/alertEngine"
    import RiggingAlerts from "@/components/RiggingAlerts.vue"
    export default{
    components:{
    RiggingAlerts
    },
    
    data(){
    return{
    load:null,
    d1:null,
    d2:null,
    r1:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    
    this.r1=(this.load*this.d2)/(this.d1+this.d2)
    this.alerts = analyzeLift("distribution",{
    r1:this.r1
    })
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Load Distribution",
    load:this.load,
    d1:this.d1,
    d2:this.d2,
    result:this.r1,
    date:new Date()
    })
    //historial    
    }
    
    }
    
    }
    </script>