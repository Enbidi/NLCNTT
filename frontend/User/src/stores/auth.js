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
    async fetchAuthInfo() {
      var data = await this.alerts.callAPI("warning", "http://localhost:3000/auth/user_info")
      if (data == undefined) {
        return
      }
      this.isAuthenticated = true
      Object.assign(this, data.item)
      this.id = this._id
    }
  }
})