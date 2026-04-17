<template>

    <v-container>
    
    <h1>CG Offset Tension</h1>
    
    <v-text-field label="Total Load (kg / ton)" v-model.number="load"/>
    <v-text-field label="Distance Left (D1)" v-model.number="d1"/>
    <v-text-field label="Distance Right (D2)" v-model.number="d2"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="t1 !== null" type="info" class="mt-4">
    Tension Left Sling: {{ t1.toFixed(2) }}
    <br/>
    Tension Right Sling: {{ t2.toFixed(2) }}
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
    t1:null,
    t2:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    if (!this.load || !this.d1 || !this.d2) return;
    const totalDist = this.d1 + this.d2;
    this.t1 = (this.load * this.d2) / totalDist;
    this.t2 = (this.load * this.d1) / totalDist;
    
    this.alerts = analyzeLift("distribution",{
    r1:this.t1,
    r2:this.t2
    })
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"CG Offset Tension",
    load:this.load,
    d1:this.d1,
    d2:this.d2,
    result:`Left: ${this.t1.toFixed(2)} | Right: ${this.t2.toFixed(2)}`,
    date:new Date()
    })
    //historial    
    }
    
    }
    
    }
    </script>