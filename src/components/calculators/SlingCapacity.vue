<template>
    <v-container>
    
    <h1>Sling Angle Capacity</h1>
    
    <v-text-field label="Axial Capacity (per sling in kg/ton)" v-model.number="axialCapacity"/>
    <v-text-field label="Number of Slings" v-model.number="numSlings"/>
    <v-text-field label="Angle (degrees)" v-model.number="angle"/>
    
    <v-btn color="primary" class="mt-4" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="realCapacity !== null" type="success" class="mt-4">
    Real Capacity: {{ realCapacity.toFixed(2) }}
    </v-alert>
    <RiggingAlerts :alerts="alerts" />
    
    </v-container>
    </template>
    
    <script>
    import { analyzeLift } from "@/services/alertEngine"
    import RiggingAlerts from "@/components/RiggingAlerts.vue"
    
    export default {
    components: {
        RiggingAlerts
    },
    
    data() {
        return {
        axialCapacity: null,
        numSlings: 2,
        angle: null,
        realCapacity: null,
        alerts: []
        }
    },
    
    methods: {
        calculate() {
        if (!this.axialCapacity || !this.numSlings || !this.angle) return;
        
        const radians = this.angle * (Math.PI / 180);
        this.realCapacity = this.axialCapacity * this.numSlings * Math.sin(radians);
        
        this.alerts = analyzeLift("angle-capacity", {
            angle: this.angle,
            capacity: this.realCapacity
        });
        
        // 🔴 GUARDAR EN HISTORIAL
        this.$store.commit("ADD_HISTORY", {
            type: "Sling Angle Capacity",
            axialCapacity: this.axialCapacity,
            numSlings: this.numSlings,
            angle: this.angle,
            result: this.realCapacity.toFixed(2),
            date: new Date()
        });
        }
    }
    }
    </script>
