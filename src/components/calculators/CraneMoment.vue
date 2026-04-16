<template>

    <v-container>
    
    <h1>Crane Moment</h1>
    
    <v-text-field label="Load Weight (kg)" v-model.number="weight"/>
    <v-text-field label="Radius (m)" v-model.number="radius"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="moment" type="info">
    Moment: {{ moment.toFixed(2) }} kg·m
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
    weight:null,
    radius:null,
    moment:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    this.moment = this.weight * this.radius
    this.alerts = analyzeLift("crane-moment",{
    moment:this.moment
    })
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