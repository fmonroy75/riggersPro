<template>

    <v-container>
    
    <h1>Load Weight Calculator</h1>
    
    <v-text-field label="Density (kg/m3)" v-model.number="density"/>
    <v-text-field label="Volume (m3)" v-model.number="volume"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="weight" type="info">
    Weight: {{ weight.toFixed(2) }} kg
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
    density:null,
    volume:null,
    weight:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    this.weight = this.density * this.volume
    this.alerts = analyzeLift("load-weight",{
    weight:this.weight
    })
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Load weight",
    volume:this.volume,
    density:this.density,
    result:this.weight,
    date:new Date()
    })
    //historial
    }
    }
    
    }
    </script>