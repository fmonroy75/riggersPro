<template>

    <v-container>
    
    <h1>Total Hook Load</h1>
    
    <v-text-field label="Load Weight" v-model.number="load"/>
    <v-text-field label="Rigging Gear Weight" v-model.number="gear"/>
    <v-text-field label="Hook WLL" v-model.number="hookWLL"/>
    
    <v-btn color="primary" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="total" type="info">
    Total Hook Load: {{ total }} kg
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
    gear:null,
    hookWLL:null,
    total:null,
    alerts:[]
    }
    },
    
    methods:{
    calculate(){
    this.total=this.load+this.gear
    this.alerts = analyzeLift("hook",{
    total:this.total,
    hookWLL:this.hookWLL
    })
    // 🔴 GUARDAR EN HISTORIAL (para analytics)
    this.$store.commit("ADD_HISTORY",{
    type:"Hook Load",
    load:this.load,
    gear:this.gear,
    
    result:this.total,
    date:new Date()
    })
    //historial  
    }
    }
    
    }
    </script>