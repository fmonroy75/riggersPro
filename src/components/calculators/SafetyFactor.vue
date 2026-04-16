<template>

    <v-container>
    
    <h1>Safety Factor</h1>
    
    <v-text-field label="Breaking Strength" v-model.number="strength"/>
    <v-text-field label="Working Load" v-model.number="load"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="sf" type="info">
    Safety Factor: {{ sf.toFixed(2) }}
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
    strength:null,
    load:null,
    sf:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    this.sf=this.strength/this.load
    this.alerts = analyzeLift("safety-factor",{
    sf:this.sf
    })
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