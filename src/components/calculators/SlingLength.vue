<template>
    <v-container>
    
    <h1>Sling Length</h1>
    
    <v-text-field label="Radius (Reach in m/ft)" v-model.number="radius"/>
    <v-text-field label="Angle (degrees)" v-model.number="angle"/>
    
    <v-btn color="primary" class="mt-4" @click="calculate">Calculate</v-btn>
    
    <v-alert v-if="length !== null" type="success" class="mt-4">
    Required Sling Length: {{ length.toFixed(2) }}
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
        radius: null,
        angle: null,
        length: null,
        alerts: []
        }
    },
    
    methods: {
        calculate() {
        if (!this.radius || !this.angle) return;
        
        const radians = this.angle * (Math.PI / 180);
        this.length = this.radius / Math.cos(radians);
        
        this.alerts = analyzeLift("sling-length", {
            angle: this.angle,
            length: this.length
        });
        
        // 🔴 GUARDAR EN HISTORIAL
        this.$store.commit("ADD_HISTORY", {
            type: "Sling Length",
            radius: this.radius,
            angle: this.angle,
            result: this.length.toFixed(2),
            date: new Date()
        });
        }
    }
    }
    </script>
