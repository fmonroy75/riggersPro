<template>

    <v-container>
    
    <h1>Lift Planning</h1>
    
    <v-text-field label="Load Weight" v-model.number="load"/>
    <v-text-field label="Safety Margin (%)" v-model.number="margin"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="total" type="info">
    Recommended Lift Capacity: {{ total.toFixed(2) }} kg
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
    margin:25,
    total:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    
    this.total=this.load*(1+(this.margin/100))
    this.alerts = analyzeLift("lift-planning",{
    margin:this.margin,
    total:this.total
    })
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Lift Planing",
    load:this.load,
    margin:this.margin,
    
    result:this.total,
    date:new Date()
    })
    //historial      
    }
    
    }
    
    }
    </script>