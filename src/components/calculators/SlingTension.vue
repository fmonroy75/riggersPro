<template>

    <v-container>
    
    <h1 class="mb-6">Sling Tension Calculator</h1>
    
    <v-card class="pa-6">
    
    <v-select
    :items="units"
    label="Units"
    v-model="unit"
    />
    
    <v-text-field
    label="Load Weight"
    v-model.number="weight"
    type="number"
    />
    
    <v-text-field
    label="Sling Angle (degrees)"
    v-model.number="angle"
    type="number"
    />
    
    <v-btn
    color="primary"
    class="mt-4"
    @click="calculate"
    >
    Calculate
    </v-btn>
    
    <v-divider class="my-4"></v-divider>
    
    <div v-if="tension">
    
    <h2>Tension per Sling</h2>
    
    <v-alert type="info">
    
    {{ tension.toFixed(2) }} {{ unit }}
    
    </v-alert>
    
    </div>
    
    <v-alert
    v-if="angleWarning"
    type="warning"
    class="mt-4"
    >
    
    Danger: Sling angle below 30° greatly increases tension.
    
    </v-alert>
    
    </v-card>
    
    </v-container>
    
    </template>
    
    <script>
    
    export default {
    
    data(){
    
    return{
    
    weight:null,
    angle:null,
    tension:null,
    unit:"kg",
    
    units:["kg","ton","lb"],
    
    angleWarning:false
    
    }
    
    },
    
    methods:{
    
    convertWeight(){
    
    if(this.unit==="ton") return this.weight*1000
    if(this.unit==="lb") return this.weight*0.453592
    
    return this.weight
    
    },
    
    calculate(){

const weightKg = this.convertWeight()

        const radians = this.angle * Math.PI / 180

        this.tension = weightKg / (2 * Math.sin(radians))

        this.angleWarning = this.angle < 30

        this.$store.commit("ADD_HISTORY",{

        type:"Sling Tension",

        weight:this.weight,

        angle:this.angle,

        result:this.tension,

        date:new Date()

        })

    }
    }
    
    }
    
    </script>