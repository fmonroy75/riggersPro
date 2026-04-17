<template>
<v-container>
  <h1>Choker Hitch Capacity</h1>
  <v-text-field label="Axial sling capacity (kg)" v-model.number="capacity"/>
  <v-text-field label="Sling angle (degrees, optional)" v-model.number="angle"/>
  
  <v-btn color="primary" class="mt-4" @click="calculate">Calculate</v-btn>
  
  <v-alert v-if="result !== null" type="success" class="mt-4">
    Choker Capacity: {{ result.toFixed(2) }} kg
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
      capacity: null,
      angle: 90,
      result: null,
      alerts: []
    }
  },
  methods: {
    calculate() {
      if (!this.capacity) return;
      let effectiveCapacity = this.capacity;
      if (this.angle && this.angle < 90) {
         const radians = this.angle * (Math.PI / 180);
         effectiveCapacity = effectiveCapacity * Math.sin(radians);
      }
      this.result = effectiveCapacity * 0.75;
      
      this.alerts = analyzeLift("choker-capacity", { capacity: this.result });
      this.$store.commit("ADD_HISTORY", {
        type: "Choker Capacity",
        capacity: this.capacity,
        angle: this.angle,
        result: this.result.toFixed(2),
        date: new Date()
      });
    }
  }
}
</script>
