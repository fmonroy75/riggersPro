<template>
<v-container>
  <h1>Tension Factor (Linear)</h1>
  <v-text-field label="Load Weight (kg/ton)" v-model.number="weight"/>
  <v-text-field label="Sling Length (L)" v-model.number="length"/>
  <v-text-field label="Height to Hook (H)" v-model.number="height"/>
  
  <v-btn color="primary" class="mt-4" @click="calculate">Calculate Tension</v-btn>
  
  <v-alert v-if="tension !== null" type="success" class="mt-4">
    Tension Factor: {{ factor.toFixed(2) }}<br/>
    Tension per Sling (2-leg): {{ tension.toFixed(2) }}
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
      length: null,
      height: null,
      factor: null,
      tension: null,
      alerts: []
    }
  },
  methods: {
    calculate() {
      if (!this.weight || !this.length || !this.height) return;
      this.factor = this.length / this.height;
      this.tension = (this.weight / 2) * this.factor;
      
      this.alerts = analyzeLift("tension-factor", { factor: this.factor });
      this.$store.commit("ADD_HISTORY", {
        type: "Tension Factor",
        weight: this.weight,
        result: this.tension.toFixed(2),
        date: new Date()
      });
    }
  }
}
</script>
