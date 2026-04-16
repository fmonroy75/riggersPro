<template>

    <v-container>
    
    <h1>Multi Leg Sling</h1>
    
    <v-text-field label="Load Weight (kg)" v-model.number="weight"/>
    <v-text-field label="Number of Legs" v-model.number="legs"/>
    <v-text-field label="Angle (degrees)" v-model.number="angle"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="tension" type="info">
    Tension per leg: {{ tension.toFixed(2) }} kg
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
    legs:null,
    angle:null,
    tension:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    
    const rad=this.angle*Math.PI/180
    
    this.tension=this.weight/(this.legs*Math.sin(rad))
    this.alerts = analyzeLift("multi-leg",{
    legs:this.legs,
    angle:this.angle,
    tension:this.tension
    })
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Multi leg Sling",
    legs:this.legs,
    weight:this.weight,
    result:this.tension,
    date:new Date()
    })
    //historial
    }
    
    }
    
    }
    </script>