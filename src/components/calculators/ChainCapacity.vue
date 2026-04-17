<template>
<v-container>
  <h1>Chain Capacity</h1>
  <v-text-field label="Chain Diameter (mm)" v-model.number="diameter"/>
  <v-select label="Chain Grade" :items="[8, 10]" v-model="grade"></v-select>
  
  <v-btn color="primary" class="mt-4" @click="calculate">Calculate Capacity</v-btn>
  
  <v-alert v-if="capacity !== null" type="success" class="mt-4">
    Axial Capacity: {{ capacity.toFixed(2) }} kg
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
      diameter: null,
      grade: 8,
      capacity: null,
      alerts: []
    }
  },
  methods: {
    calculate() {
      if (!this.diameter || !this.grade) return;
      const constant = this.grade === 8 ? 21700 : 27060;
      this.capacity = Math.pow(this.diameter / 26, 2) * constant;
      
      this.alerts = analyzeLift("chain-capacity", { capacity: this.capacity });
      this.$store.commit("ADD_HISTORY", {
        type: "Chain Capacity",
        diameter: this.diameter,
        grade: this.grade,
        result: this.capacity.toFixed(2),
        date: new Date()
      });
    }
  }
}
</script>
