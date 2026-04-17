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
    
    <v-text-field
    label="Sling WLL"
    v-model.number="wll"
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
    <RiggingAlerts :alerts="alerts" />
    </v-card>
    
    </v-container>
    
    </template>
    
    <script>
    import { analyzeLift } from "@/services/alertEngine"
    import RiggingAlerts from "@/components/RiggingAlerts.vue"
    export default {
    components:{
    RiggingAlerts
    },
    
    data(){
    
    return{
    
    weight:null,
    angle:null,
    tension:null,
    unit:"kg",
    wll:null,
    
    units:["kg","ton","lb"],
    
    angleWarning:false,
    alerts:[]
    
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

        this.alerts = analyzeLift("tension",{

        angle:this.angle,
        tension:this.tension,
        wll:this.wll

        })

        let safetyScore = 100;
        if (this.angle < 60) safetyScore -= 20;
        if (this.angle < 45) safetyScore -= 30;
        if (this.angle < 30) safetyScore -= 30;
        if (this.alerts.length > 0) safetyScore -= (this.alerts.length * 10);
        if (safetyScore < 0) safetyScore = 0;

        this.$store.dispatch("saveLiftCalculation", {
            type: "Sling Tension",
            inputs: { load: weightKg, angle: this.angle },
            result: { tension: this.tension },
            alerts: this.alerts.map(a => a.message),
            safetyScore: safetyScore
        });
    }
    }
    
    }
    
    </script>