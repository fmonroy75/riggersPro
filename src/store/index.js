import { createStore } from 'vuex'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default createStore({
  state: {
    history: [],
    user: null,
    userProfile: null,
    authIsReady: false
  },
  mutations: {
    ADD_HISTORY(state, calc) {
      state.history.push(calc)
    },
    CLEAR_HISTORY(state) {
      state.history = []
    },
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_USER_PROFILE(state, profile) {
      state.userProfile = profile
    },
    SET_AUTH_IS_READY(state, isReady) {
      state.authIsReady = isReady
    }
  },
  actions: {
    async fetchUserProfile({ commit }, uid) {
      try {
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          commit('SET_USER_PROFILE', docSnap.data())
          // Actualizar fecha de último logueo
          await updateDoc(docRef, { lastLogin: new Date().toISOString() })
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
      }
    },
    async logout({ commit }) {
      await signOut(auth)
      commit('SET_USER', null)
      commit('SET_USER_PROFILE', null)
    }
  }
})