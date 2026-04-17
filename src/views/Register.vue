<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Registro PRO</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label>Nombre Completo</label>
          <input type="text" v-model="nombre" required />
        </div>
        <div class="input-group">
          <label>Empresa</label>
          <input type="text" v-model="empresa" required />
        </div>
        <div class="input-group">
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label>Contraseña</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="auth-btn">Crear Cuenta</button>
      </form>
      <p class="error" v-if="error">{{ error }}</p>
      <p class="link" @click="$router.push('/login')">¿Ya tienes cuenta? Inicia sesión</p>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      nombre: '',
      empresa: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        this.error = null
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user
        
        // Guardar perfil en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          nombre: this.nombre,
          empresa: this.empresa,
          email: this.email,
          role: 'pro', // por defecto damos pro en registro para este demo, o 'standard' y luego se actualiza
          activationDate: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        })

        this.$router.push('/')
      } catch (err) {
        let msg = err.message;
        if (err.code === 'auth/email-already-in-use') {
          msg = "El correo ya está registrado.";
        } else if (err.code === 'auth/weak-password') {
          msg = "La contraseña debe tener al menos 6 caracteres.";
        } else if (err.code === 'auth/operation-not-allowed') {
          msg = "La autenticación por Email/Contraseña NO está habilitada en Firebase Console.";
        } else if (err.code === 'auth/invalid-email') {
          msg = "El correo no es válido.";
        }
        this.error = "Error al registrarse: " + msg;
        console.error("Firebase Auth Error:", err);
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}
.auth-box {
  background: #1e293b;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #facc15;
}
.input-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: #cbd5e1;
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #fff;
  outline: none;
}
input:focus {
  border-color: #facc15;
}
.auth-btn {
  width: 100%;
  padding: 12px;
  background: #facc15;
  color: #0f172a;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}
.auth-btn:hover {
  background: #fde047;
}
.error {
  color: #ef4444;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
.link {
  text-align: center;
  margin-top: 15px;
  color: #60a5fa;
  cursor: pointer;
  font-size: 14px;
}
.link:hover {
  text-decoration: underline;
}
</style>
