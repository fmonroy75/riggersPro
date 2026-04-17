import { createStore } from 'vuex'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore'

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
    SET_HISTORY(state, history) {
      state.history = history
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
    async fetchUserProfile({ commit, dispatch }, uid) {
      try {
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          commit('SET_USER_PROFILE', docSnap.data())
          await updateDoc(docRef, { lastLogin: new Date().toISOString() })
          
          await dispatch('fetchUserLifts', uid)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
      }
    },
    async saveLiftCalculation({ commit, state }, payload) {
      const calcData = {
        ...payload,
        timestamp: new Date().toISOString()
      };
      
      commit('ADD_HISTORY', calcData)
      
      // Si el usuario está registrado, empujar a la nube su cálculo
      if (state.user && state.user.uid) {
        try {
          const liftsRef = collection(db, 'users', state.user.uid, 'lifts')
          await addDoc(liftsRef, calcData)
        } catch (error) {
          console.error("Error saving lift to Firestore:", error)
        }
      }
    },
    async fetchUserLifts({ commit, state }, uid) {
      try {
        const liftsRef = collection(db, 'users', uid, 'lifts')
        const q = query(liftsRef, orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q)
        const lifts = []
        
        querySnapshot.forEach((doc) => {
          lifts.push({ id: doc.id, ...doc.data() })
        })
        
        commit('SET_HISTORY', lifts)
      } catch (error) {
        console.error("Error fetching user lifts:", error)
      }
    },
    async logout({ commit }) {
      await signOut(auth)
      commit('SET_USER', null)
      commit('SET_USER_PROFILE', null)
      commit('CLEAR_HISTORY')
    }
  }
})