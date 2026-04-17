<template>
<v-container>
  <h1>Tailing Tension (2 Cranes)</h1>
  <v-text-field label="Total Load Weight (kg/ton)" v-model.number="weight"/>
  <v-text-field label="Distance to Main Crane (D1)" v-model.number="d1"/>
  <v-text-field label="Distance to Tailing Crane (D2)" v-model.number="d2"/>
  
  <v-btn color="primary" class="mt-4" @click="calculate">Calculate Tensions</v-btn>
  
  <v-alert v-if="t1 !== null" type="success" class="mt-4">
    Main Crane Load: {{ t1.toFixed(2) }}<br/>
    Tailing Crane Load: {{ t2.toFixed(2) }}
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
      d1: null,
      d2: null,
      t1: null,
      t2: null,
      alerts: []
    }
  },
  methods: {
    calculate() {
      if (!this.weight || !this.d1 || !this.d2) return;
      const totalDist = this.d1 + this.d2;
      this.t1 = (this.weight * this.d2) / totalDist;
      this.t2 = (this.weight * this.d1) / totalDist;
      
      this.alerts = analyzeLift("tailing-tension", { main: this.t1, tailing: this.t2 });
      this.$store.commit("ADD_HISTORY", {
        type: "Tailing Tension",
        weight: this.weight,
        result: `Main: ${this.t1.toFixed(2)} | Tailing: ${this.t2.toFixed(2)}`,
        date: new Date()
      });
    }
  }
}
</script>
