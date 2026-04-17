<template>
<v-container class="dashboard">
  <div class="d-flex align-center justify-space-between mb-6">
    <h2>Intelligence Dashboard</h2>
    <v-chip color="primary" variant="outlined">{{ userList.length }} Lifts Analyzed</v-chip>
  </div>

  <v-row v-if="loading">
    <v-col class="text-center" cols="12">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-2 text-grey">Analyzing rigging data...</p>
    </v-col>
  </v-row>

  <template v-else-if="userList.length === 0">
    <v-alert type="info" class="mt-4" icon="mdi-information">
      No lift data available. Go to the Standard or PRO tools to perform some calculations. Your rigging intelligence insights will appear here.
    </v-alert>
  </template>

  <template v-else>
    <!-- TOP KPIs: Risk Monitor & Safety Score -->
    <v-row>
      <!-- Safety Score -->
      <v-col cols="12" md="3">
        <v-card color="#1e293b" class="fill-height pb-4 px-4 pt-6 text-center score-card">
          <v-card-subtitle class="text-white text-uppercase" style="letter-spacing: 1px;">Avg Safety Score</v-card-subtitle>
          <div class="score-circle mt-4" :class="scoreColor">
            {{ avgSafetyScore }}
          </div>
          <p class="mt-3 text-caption text-grey">Scale 0-100</p>
        </v-card>
      </v-col>

      <!-- Load Intelligence -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12" sm="4">
            <v-card color="#1e293b" class="pa-4 text-center fill-height kpi-card">
              <v-icon size="36" color="info" class="mb-2">mdi-weight</v-icon>
              <h3 class="text-h4 font-weight-bold">{{ avgLoadWeight }}</h3>
              <p class="text-caption text-grey mt-1">Avg Load Weight (kg)</p>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card color="#1e293b" class="pa-4 text-center fill-height kpi-card">
              <v-icon size="36" color="warning" class="mb-2">mdi-angle-acute</v-icon>
              <h3 class="text-h4 font-weight-bold">{{ avgSlingAngle }}°</h3>
              <p class="text-caption text-grey mt-1">Avg Sling Angle</p>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card color="#1e293b" class="pa-4 text-center fill-height kpi-card">
              <v-icon size="36" color="error" class="mb-2">mdi-alert-octagon</v-icon>
              <h3 class="text-h4 font-weight-bold text-error">{{ totalAlerts }}</h3>
              <p class="text-caption text-error mt-1">Total Risk Alerts</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- CHARTS ROW -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card color="#1e293b" class="pa-4 flex-column align-center">
          <h3 class="mb-4 text-center">Sling Angle Usage</h3>
          <div class="chart-container align-self-center mx-auto" style="position: relative; height:250px; width:250px;">
            <canvas ref="angleChartCanvas"></canvas>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card color="#1e293b" class="pa-4">
          <h3 class="mb-4 text-center">Load Weight Distribution (kg)</h3>
          <div class="chart-container" style="position: relative; height:250px;">
            <canvas ref="loadChartCanvas"></canvas>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Rigging Efficiency INSIGHTS -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card color="#1e293b" class="pa-5">
          <h3 class="mb-3 d-flex align-center"><v-icon color="warning" class="mr-2">mdi-lightbulb-on</v-icon> Rigging Efficiency Insights</h3>
          <div class="insight-box mt-3 pa-4 rounded bg-blue-grey-darken-4">
            <template v-if="poorAngles > 0">
              <p class="text-warning mb-2"><strong>⚠️ Warning:</strong> {{ ((poorAngles / userList.length)*100).toFixed(0) }}% of your lifts used unsafe sling angles (&lt; 45°).</p>
              <p class="text-white">Your lifts could significantly reduce hook and sling tension by using wider sling angles (60° recommended). Longer slings or lifting beams may be required.</p>
            </template>
            <template v-else>
              <p class="text-success mb-2"><strong>✅ Excellent Practice:</strong> You consistently maintain safe sling angles (&ge; 45°).</p>
              <p class="text-white">This minimizes tension multipliers on your slinging gear.</p>
            </template>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- LIFT HISTORY TABLE -->
    <h3 class="mt-8 mb-4">Lift History Intelligence</h3>
    <v-table theme="dark" class="bg-blue-grey-darken-4 rounded-lg">
      <thead>
        <tr>
          <th>Date</th>
          <th>Calculator Type</th>
          <th>Inputs (Load / Angle)</th>
          <th>Safety Score</th>
          <th>Risk Alerts</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lift in userList" :key="lift.id">
          <td>{{ new Date(lift.timestamp || lift.date).toLocaleDateString() }}</td>
          <td>{{ lift.type }}</td>
          <td>
            <span v-if="lift.inputs?.load">{{ lift.inputs.load.toFixed(0) }} kg</span>
            <span v-if="lift.inputs?.angle"> @ {{ lift.inputs.angle }}°</span>
            <span v-if="!lift.inputs?.load && !lift.inputs?.angle" class="text-grey">N/A</span>
          </td>
          <td>
            <v-chip :color="getScoreColor(lift.safetyScore)" size="small">
              {{ lift.safetyScore !== undefined ? lift.safetyScore : 'N/A' }}
            </v-chip>
          </td>
          <td class="text-error" style="font-size:12px;">
            <div v-for="(alert, i) in (lift.alerts || [])" :key="i">• {{ alert }}</div>
            <span v-if="!lift.alerts || lift.alerts.length === 0" class="text-success">Safe</span>
          </td>
        </tr>
      </tbody>
    </v-table>

  </template>
</v-container>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue"
import { useStore } from "vuex"
import Chart from 'chart.js/auto'

const store = useStore()
const loading = ref(true)

// DOM Refs for Chart.js
const angleChartCanvas = ref(null)
const loadChartCanvas = ref(null)

const userList = computed(() => store.state.history || [])

// KPIS Computados
const avgSafetyScore = computed(() => {
  const scoredLifts = userList.value.filter(l => l.safetyScore !== undefined)
  if (scoredLifts.length === 0) return 0
  const sum = scoredLifts.reduce((acc, l) => acc + l.safetyScore, 0)
  return Math.round(sum / scoredLifts.length)
})

const scoreColor = computed(() => {
  if (avgSafetyScore.value >= 85) return 'score-green'
  if (avgSafetyScore.value >= 60) return 'score-yellow'
  return 'score-red'
})

function getScoreColor(score) {
  if (score === undefined) return 'grey'
  if (score >= 85) return 'success'
  if (score >= 60) return 'warning'
  return 'error'
}

const avgLoadWeight = computed(() => {
  const liftsWithLoad = userList.value.filter(l => l.inputs && l.inputs.load)
  if (liftsWithLoad.length === 0) return 0
  const sum = liftsWithLoad.reduce((acc, l) => acc + Number(l.inputs.load), 0)
  return Math.round(sum / liftsWithLoad.length)
})

const avgSlingAngle = computed(() => {
  const liftsWithAngle = userList.value.filter(l => l.inputs && l.inputs.angle)
  if (liftsWithAngle.length === 0) return 0
  const sum = liftsWithAngle.reduce((acc, l) => acc + Number(l.inputs.angle), 0)
  return Math.round(sum / liftsWithAngle.length)
})

const totalAlerts = computed(() => {
  return userList.value.reduce((acc, l) => acc + (l.alerts ? l.alerts.length : 0), 0)
})

const poorAngles = computed(() => {
  return userList.value.filter(l => l.inputs && l.inputs.angle && l.inputs.angle < 45).length
})

// Funciones de gráficos
let angleChartInstance = null
let loadChartInstance = null

function renderCharts() {
  if (!angleChartCanvas.value || !loadChartCanvas.value) return

  // 1. Angle Distribution logic
  let angleCat = { ">= 60° (Safe)": 0, "45°-59° (Warning)": 0, "< 45° (Danger)": 0 }
  userList.value.forEach(l => {
    if (l.inputs && l.inputs.angle) {
      if (l.inputs.angle >= 60) angleCat[">= 60° (Safe)"]++
      else if (l.inputs.angle >= 45) angleCat["45°-59° (Warning)"]++
      else angleCat["< 45° (Danger)"]++
    }
  })

  angleChartInstance = new Chart(angleChartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: Object.keys(angleCat),
      datasets: [{
        data: Object.values(angleCat),
        backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#cbd5e1' } }
      }
    }
  })

  // 2. Load Distribution logic
  let loadCat = { "0-5t": 0, "5-10t": 0, "10-20t": 0, ">20t": 0 }
  userList.value.forEach(l => {
    if (l.inputs && l.inputs.load) {
      const w = l.inputs.load
      if (w <= 5000) loadCat["0-5t"]++
      else if (w <= 10000) loadCat["5-10t"]++
      else if (w <= 20000) loadCat["10-20t"]++
      else loadCat[">20t"]++
    }
  })

  loadChartInstance = new Chart(loadChartCanvas.value, {
    type: 'bar',
    data: {
      labels: Object.keys(loadCat),
      datasets: [{
        label: 'Number of Lifts',
        data: Object.values(loadCat),
        backgroundColor: '#3b82f6',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { ticks: { color: '#94a3b8', stepSize: 1 } },
        x: { ticks: { color: '#94a3b8' } }
      }
    }
  })
}

onMounted(async () => {
  // Check if store already has history or user
  if (store.state.user && store.state.user.uid) {
    await store.dispatch("fetchUserLifts", store.state.user.uid)
  }
  loading.value = false

  if (userList.value.length > 0) {
    nextTick(() => {
      renderCharts()
    })
  }
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.kpi-card {
  transition: transform 0.2s;
}
.kpi-card:hover {
  transform: translateY(-4px);
}
.score-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.score-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  border: 6px solid #334155;
  box-shadow: 0 0 15px rgba(0,0,0,0.5) inset;
}
.score-green {
  border-color: #22c55e;
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
}
.score-yellow {
  border-color: #eab308;
  text-shadow: 0 0 10px rgba(234, 179, 8, 0.8);
}
.score-red {
  border-color: #ef4444;
  text-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
}
</style>