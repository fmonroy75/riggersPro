<template>

    <v-container>
    
    <h1>Wind Load</h1>
    
    <v-text-field label="Air Density (kg/m3)" v-model.number="rho"/>
    <v-text-field label="Drag Coefficient" v-model.number="cd"/>
    <v-text-field label="Area (m2)" v-model.number="area"/>
    <v-text-field label="Wind Speed (m/s)" v-model.number="speed"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="force" type="info">
    Wind Force: {{ force.toFixed(2) }} N
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
    rho:1.225,
    cd:null,
    area:null,
    speed:null,
    force:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    
    this.force=0.5*this.rho*this.cd*this.area*(this.speed*this.speed)
    this.alerts = analyzeLift("wind",{
    wind:this.speed
    })

    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Wind Load",
    cd:this.cd,
    area:this.area,
    speed:this.speed,
    rho:this.rho,
    result:this.force,
    date:new Date()
    })    
    }
    
    }
    
    }
    </script>