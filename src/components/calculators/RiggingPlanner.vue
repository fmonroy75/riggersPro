<template>
<v-container>
  <h1>Master Rigging Planner</h1>
  <p class="text-subtitle-2 text-grey">Plan your lift with consolidated safety metrics.</p>

  <v-form class="mt-4">
    <v-text-field label="Load Weight (kg/ton)" v-model.number="weight" required/>
    <v-text-field label="Load Width (Reach distance) (m/ft)" v-model.number="width" required/>
    <v-text-field label="Sling Length (m/ft)" v-model.number="slingLength" required/>
    <v-text-field label="Number of Slings" v-model.number="slings" required/>
  </v-form>
  
  <v-btn color="primary" size="large" class="mt-4 mb-6" @click="planLift" block>Generate Lift Plan</v-btn>
  
  <div v-if="plan">
    <v-card class="pa-4 mb-4" color="#1e293b">
      <h3 class="text-warning mb-2">Metrics</h3>
      <p><strong>Expected Angle:</strong> {{ plan.angle.toFixed(2) }}°</p>
      <p><strong>Tension Factor:</strong> {{ plan.factor.toFixed(2) }}</p>
      <p><strong>Tension Per Sling:</strong> {{ plan.tension.toFixed(2) }}</p>
      <p><strong>Required Combined Capacity:</strong> {{ (plan.tension * slings * 1.5).toFixed(2) }} (includes 50% safety margin)</p>
    </v-card>
  </div>
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
      width: null,
      slingLength: null,
      slings: null,
      plan: null,
      alerts: []
    }
  },
  methods: {
    planLift() {
      if (!this.weight || !this.width || !this.slingLength || !this.slings) return;
      
      const radius = this.width / 2;
      if (radius > this.slingLength) {
         alert("Sling length must be greater than load radius.");
         return;
      }
      
      const angleRad = Math.acos(radius / this.slingLength);
      const angleDeg = angleRad * (180 / Math.PI);
      const height = Math.sqrt(Math.pow(this.slingLength, 2) - Math.pow(radius, 2));
      const factor = this.slingLength / height;
      const tension = (this.weight / this.slings) * factor;

      this.plan = { angle: angleDeg, factor, tension };
      
      this.alerts = analyzeLift("rigging-planner", { angle: angleDeg, factor, tension });
      
      this.$store.commit("ADD_HISTORY", {
        type: "Rigging Planner",
        weight: this.weight,
        result: `Tension: ${tension.toFixed(2)}`,
        date: new Date()
      });
    }
  }
}
</script>
