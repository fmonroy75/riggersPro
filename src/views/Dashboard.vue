<template>
<v-container class="dashboard">
  <h2>Estadísticas Reales y Usuarios Registrados</h2>
  <v-divider class="mb-4"></v-divider>

  <v-row>
    <v-col cols="12" md="4">
      <v-card color="#1e293b" class="pa-4 text-center">
        <v-card-subtitle class="text-white">Usuarios Totales Registrados</v-card-subtitle>
        <h3 class="text-h3 text-warning mt-2">{{ totalUsers }}</h3>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card color="#1e293b" class="pa-4 text-center">
        <v-card-subtitle class="text-white">Cuentas PRO Activas</v-card-subtitle>
        <h3 class="text-h3 text-success mt-2">{{ proUsers }}</h3>
      </v-card>
    </v-col>
    
    <v-col cols="12" md="4">
      <v-card color="#1e293b" class="pa-4 text-center">
        <v-card-subtitle class="text-white">Historial de Lifts Locales</v-card-subtitle>
        <h3 class="text-h3 text-info mt-2">{{ store.state.history.length }}</h3>
      </v-card>
    </v-col>
  </v-row>

  <h3 class="mt-8 mb-4">Directorio de Usuarios</h3>
  <v-table theme="dark" class="bg-blue-grey-darken-4 rounded-lg">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Empresa</th>
        <th>Email</th>
        <th>Rol</th>
        <th>Último Ingreso</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in userList" :key="u.id">
        <td>{{ u.nombre }}</td>
        <td>{{ u.empresa }}</td>
        <td>{{ u.email }}</td>
        <td>
          <v-chip :color="u.role === 'pro' ? 'success' : 'grey'" size="small">
            {{ u.role?.toUpperCase() || 'STANDARD' }}
          </v-chip>
        </td>
        <td>{{ new Date(u.lastLogin || u.activationDate).toLocaleDateString() }}</td>
      </tr>
      <tr v-if="userList.length === 0 && !loading">
        <td colspan="5" class="text-center">No hay usuarios registrados aún.</td>
      </tr>
    </tbody>
  </v-table>
</v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useStore } from "vuex"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"

const store = useStore()

const userList = ref([])
const loading = ref(true)

const totalUsers = computed(() => userList.value.length)
const proUsers = computed(() => userList.value.filter(u => u.role === 'pro').length)

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"))
    const users = []
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() })
    })
    userList.value = users
  } catch (error) {
    console.error("Error obteniendo usuarios de Firestore:", error)
    alert("Hubo un error cargando los usuarios. Revisa los permisos de Firebase (Reglas de Firestore).")
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>