<template>
<v-container>
  <h1>Lift Angle (cos⁻¹)</h1>
  <v-text-field label="Radius (Reach)" v-model.number="radius"/>
  <v-text-field label="Sling Length" v-model.number="length"/>
  
  <v-btn color="primary" class="mt-4" @click="calculate">Calculate Angle</v-btn>
  
  <v-alert v-if="angle !== null" type="success" class="mt-4">
    Sling Angle to Horizontal: {{ angle.toFixed(2) }}°
  </v-alert>
  <RiggingAlerts :alerts="alerts" />
</v-container>
</template>

<script>
import { analyzeLift } from "@/services/alertEngine"
import RiggingAlerts from "@/components/RiggingAlerts.vue"

export default {
  components: { RiggingAlerts },
  data() {
    return {
      radius: null,
      length: null,
      angle: null,
      alerts: []
    }
  },
  methods: {
    calculate() {
      if (!this.radius || !this.length || this.radius > this.length) {
         this.angle = null;
         return;
      }
      
      const radians = Math.acos(this.radius / this.length);
      this.angle = radians * (180 / Math.PI);
      
      this.alerts = analyzeLift("lift-angle", { angle: this.angle });
      this.$store.commit("ADD_HISTORY", {
        type: "Lift Angle",
        radius: this.radius,
        length: this.length,
        result: this.angle.toFixed(2) + "°",
        date: new Date()
      });
    }
  }
}
</script>
