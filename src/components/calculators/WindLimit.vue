<template>
<v-container>
  <h1>Wind Limit (Permissible Wind)</h1>
  <v-text-field label="Load Weight (kg)" v-model.number="weight"/>
  <v-text-field label="Exposed Surface Area (m²)" v-model.number="area"/>
  <v-text-field label="Drag Coefficient (Cd, usually 1.0 - 2.0)" v-model.number="cd"/>
  
  <v-btn color="primary" class="mt-4" @click="calculate">Calculate Max Wind Speed</v-btn>
  
  <v-alert v-if="maxSpeed !== null" type="success" class="mt-4">
    Max Safe Wind Speed: {{ maxSpeed.toFixed(2) }} m/s ({{ (maxSpeed * 3.6).toFixed(2) }} km/h)
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
      weight: null,
      area: null,
      cd: 1.2,
      maxSpeed: null,
      alerts: []
    }
  },
  methods: {
    calculate() {
      if (!this.weight || !this.area || !this.cd) return;
      // Simplified heuristic for demo: Max wind force allowed is 10% of load weight
      const maxForce = this.weight * 0.1 * 9.81; // Newtons
      const rho = 1.225; // Air density
      
      // F = 0.5 * rho * Cd * A * v^2 => v = sqrt(2F / (rho * Cd * A))
      this.maxSpeed = Math.sqrt((2 * maxForce) / (rho * this.cd * this.area));
      
      this.alerts = analyzeLift("wind-limit", { speed: this.maxSpeed });
      this.$store.commit("ADD_HISTORY", {
        type: "Wind Limit",
        weight: this.weight,
        area: this.area,
        result: this.maxSpeed.toFixed(2) + " m/s",
        date: new Date()
      });
    }
  }
}
</script>
