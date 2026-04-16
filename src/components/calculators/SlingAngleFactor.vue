<template>

    <v-container>
    
    <h1>Sling Angle Factor</h1>
    
    <v-text-field
    label="Angle (degrees)"
    v-model.number="angle"
    type="number"
    />
    
    <v-btn @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="factor" type="info">
    
    Factor: {{ factor.toFixed(2) }}
    
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
    angle:null,
    factor:null,
    alerts:[]
    }
    
    },
    
    methods:{
    
    calculate(){
    
    const radians = this.angle * Math.PI/180
    
    this.factor = 1 / Math.sin(radians)
    this.alerts = analyzeLift("angle-factor",{
    angle:this.angle,
    factor:this.factor
    })
    
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Sling Angle Tension",
    angle:this.angle,
    result:this.factor,
    date:new Date()
    })

    }
    
    }
    
    }
    
    </script>