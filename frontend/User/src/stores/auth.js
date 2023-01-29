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
      var response = await fetch('http://localhost:3000/auth/user_info')
      var data
      if (!response.ok) {
        data = await response.json()
        for (let error of data.errors) {
          this.alerts.push(error, 'warning')
        }
        this.isAuthenticated = false
        return
      }
      this.isAuthenticated = true
      data = await response.json()
      Object.assign(this, data.item)
      this.id = this._id
      // this.id = data.item._id
      // this.firstname = data.item.firstname
      // this.lastname = data.item.lastname
      // this.email = data.item.email
      // this.number = data.item.number
      // this.sex = data.item.sex
    }
  }
})