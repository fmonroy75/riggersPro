<script setup>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { computed } from "vue"

import tensionIcon from "@/assets/icons/tension.svg"
import multiLegIcon from "@/assets/icons/multi-leg.svg"
import hookIcon from "@/assets/icons/hook.svg"

const router = useRouter()
const store = useStore()

const user = computed(() => store.state.user)

const standardCalculators = [
  { name: "Sling Tension", icon: tensionIcon, route: "/calc/tension" },
  { name: "Multi Leg Sling", icon: multiLegIcon, route: "/calc/multi-leg" },
  { name: "Hook Load", icon: hookIcon, route: "/calc/hook" },
  { name: "CG Offset Tension", icon: "⚖️", route: "/calc/distribution" },
  { name: "Angle Factor", icon: "📐", route: "/calc/angle-factor" },
  { name: "Sling Angle Capacity", icon: "🔰", route: "/calc/capacity" },
  { name: "Sling Length", icon: "📏", route: "/calc/length" },
  { name: "Load Weight", icon: "📦", route: "/calc/load-weight" },
  { name: "Center Gravity", icon: "⚙️", route: "/calc/cog" },
  { name: "Crane Moment", icon: "🏗️", route: "/calc/crane-moment" },
  { name: "Shackle Safety", icon: "🔗", route: "/calc/shackle-safety" },
  { name: "Safety Factor", icon: "⚠️", route: "/calc/safety" },
  { name: "Lift Planning", icon: "📋", route: "/calc/lift" }
]

const proCalculators = [
  { name: "Tension Factor", icon: "✖️", route: "/calc/tension-factor" },
  { name: "Lift Angle", icon: "🔺", route: "/calc/lift-angle" },
  { name: "Chain Capacity", icon: "⛓️", route: "/calc/chain-capacity" },
  { name: "Choker Capacity", icon: "🪢", route: "/calc/choker-capacity" },
  { name: "Tailing Tension", icon: "🏗️🏗️", route: "/calc/tailing" },
  { name: "Wind Limit", icon: "🌬️", route: "/calc/wind" },
  { name: "Rigging Planner", icon: "⭐", route: "/calc/planner" }
]

function isImageIcon(icon){
  return typeof icon === "string" && (
    icon.startsWith("data:image/") ||
    icon.startsWith("/") ||
    icon.includes(".svg")
  )
}

function handleLogout() {
  store.dispatch('logout')
}
</script>

<template>
  <div class="home">
    <div class="top-bar">
      <div v-if="user" class="user-info">
        <span class="user-email">{{ user.email }}</span>
        <button class="auth-btn" @click="handleLogout">Salir</button>
      </div>
      <div v-else class="auth-actions">
        <button class="auth-btn" @click="router.push('/login')">Ingresar PRO</button>
      </div>
    </div>

    <h1 class="title">RIGGER <span>PRO</span></h1>
    <p class="intro-text">
      Bienvenido a Rigger Pro. Nuestra completa suite de calculadoras avanzadas está diseñada para facilitar la planificación, ejecución y seguridad de tus operaciones de rigging e izaje.
    </p>

    <!-- STANDARD CALCULATORS -->
    <h2 class="section-title">Herramientas Estándar</h2>
    <div class="grid">
      <div
        v-for="calc in standardCalculators"
        :key="calc.name"
        class="card"
        @click="router.push(calc.route)"
      >
        <div class="icon">
          <img v-if="isImageIcon(calc.icon)" :src="calc.icon" class="icon-svg" alt="" />
          <span v-else class="icon-emoji">{{ calc.icon }}</span>
        </div>
        <div class="name">{{ calc.name }}</div>
      </div>
    </div>

    <!-- PRO CALCULATORS -->
    <h2 class="section-title pro-title">Herramientas PRO</h2>
    <div class="grid pro-grid">
      <div
        v-for="calc in proCalculators"
        :key="calc.name"
        class="card pro-card"
        @click="router.push(calc.route)"
      >
        <div class="icon">
          <img v-if="isImageIcon(calc.icon)" :src="calc.icon" class="icon-svg" alt="" />
          <span v-else class="icon-emoji">{{ calc.icon }}</span>
        </div>
        <div class="name">
          {{ calc.name }}
          <span class="lock-icon" v-if="store.state.userProfile?.role !== 'pro'">🔒</span>
        </div>
      </div>
    </div>

    <div class="sponsor">
      Powered by
      <a href="https://www.ingeniumbright.com" target="_blank" rel="noopener noreferrer" class="sponsor-link">IngeniumBright</a>
    </div>

    <footer class="home-footer">
      <p>Si deseas agregar o comentar algo, escríbenos a <a href="mailto:info@ingeniumbright.com">info@ingeniumbright.com</a></p>
      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="wa-icon"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.2c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.1l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 50.8 0 98.5 19.8 134.4 55.7 35.9 35.9 55.7 83.6 55.7 134.4 0 101.7-82.8 184.5-184.6 184.5zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.3 7.3-13.8 2.8-5.6 1.4-10.4-1.2-12.5-12.2-10-21.3-43-16.2-54.8 2.6-5.9 5.6-7.3 11.2-7.3 5.4 0 13.9 1 18.4 6 5.5 6.2 21.4 20.8 25 29s1.4 15.3-2.3 22c-3.1 5.4-4.8 7.3-8.8 12.3-4.1 4.9-8.4 10.9-12.1 14.8-4 4.3-8.3 8.7-3.7 16.7 4.6 7.9 20.5 33.9 44 55.1 30 27.1 55.2 35.1 63.3 38.6 8.1 3.5 12.8 3 17.6-2.5 4.8-5.5 20.3-23.7 25.7-31.9 5.4-8.2 10.8-6.9 15.6-4.6 4.8 2.3 30.6 14.4 35.9 16.8 5.3 2.4 8.8 3.7 10 5.8 1.4 2.2 1.4 12.5-3.3 25.4-4.7 12.9-27.9 24.3-38.6 24.8-10.7 .5-22.1 4-48-5.8z"/></svg>
        Contáctanos por WhatsApp
      </a>
    </footer>
  </div>
</template>

<style scoped>
.home {
  padding: 30px;
}
.top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.user-email {
  color: #94a3b8;
  font-size: 14px;
}
.auth-btn {
  background: #facc15;
  color: #0f172a;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
.auth-btn:hover {
  background: #fde047;
}

.title {
  text-align: center;
  margin-bottom: 15px;
  font-size: 34px;
}
.title span {
  color: #facc15;
}
.section-title {
  color: #cbd5e1;
  font-size: 20px;
  margin-top: 35px;
  margin-bottom: 15px;
  border-bottom: 1px solid #334155;
  padding-bottom: 8px;
}
.pro-title {
  color: #facc15;
  border-bottom-color: rgba(250, 204, 21, 0.3);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.card {
  background: #1e293b;
  padding: 18px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: 0.25s;
}
.card:hover {
  background: #334155;
  transform: scale(1.05);
}

.pro-card {
  border: 1px solid rgba(250, 204, 21, 0.2);
}
.pro-card:hover {
  border-color: rgba(250, 204, 21, 0.8);
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.2);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  height: 34px;
  line-height: 1;
}
.icon-svg {
  width: 28px;
  height: 28px;
  display: block;
  object-fit: contain;
  filter: brightness(0) invert(1);
}
.icon-emoji {
  font-size: 28px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.name {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.lock-icon {
  font-size: 12px;
}

.sponsor {
  margin-top: 40px;
  text-align: center;
  opacity: 0.95;
}
.sponsor-link {
  color: #facc15;
  font-weight: 700;
  margin-left: 6px;
  text-decoration: none;
  text-shadow: 0 0 8px rgba(250, 204, 21, 0.8), 0 0 16px rgba(250, 204, 21, 0.45);
  transition: text-shadow 0.25s ease, color 0.25s ease;
}
.sponsor-link:hover {
  color: #fde047;
  text-shadow: 0 0 12px rgba(253, 224, 71, 0.95), 0 0 24px rgba(253, 224, 71, 0.6);
}

.intro-text {
  text-align: center;
  color: #94a3b8;
  font-size: 16px;
  line-height: 1.5;
  margin: -5px auto 30px auto;
  max-width: 800px;
}

.home-footer {
  margin-top: 50px;
  text-align: center;
  border-top: 1px solid #1e293b;
  padding-top: 20px;
}
.home-footer p {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 15px;
}
.home-footer a:not(.whatsapp-btn) {
  color: #60a5fa;
  text-decoration: none;
}
.home-footer a:hover:not(.whatsapp-btn) {
  text-decoration: underline;
}
.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #25d366;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 24px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.whatsapp-btn:hover {
  background-color: #128c7e;
  transform: scale(1.05);
}
.wa-icon {
  width: 20px;
  height: 20px;
}
</style>