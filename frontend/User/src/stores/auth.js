import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'
export const useAuthStore = defineStore("auth", {
  state: () => ({ 
    isAuthenticated: false,
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    number: '',
    sex: ''
   }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async tryFetch() {
      var response = await fetch(import.meta.env.VITE_USER_INFO_URL)
      console.log(response)
      if (!response.ok) return
      this.isAuthenticated = true
      var data = response.json()
      Object.assign(this, data.item)
    },
    async fetchAuthInfo() {
      if (!this.isAuthenticated) {
        return
      }
      var data = await this.alerts.callAPI("warning", import.meta.env.VITE_USER_INFO_URL)
      if (data == undefined) {
        return
      }
      this.isAuthenticated = true
      Object.assign(this, data.item)
      this.id = this._id
    }
  }
})