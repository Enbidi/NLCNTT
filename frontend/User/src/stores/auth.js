import { defineStore } from 'pinia'

export const useAuthStore = defineStore("auth", {
  state: () => ({ 
    isAuthenticated: false,
    id: '',
    firstname: '',
    lastname: '',
    email: ''
   }),
  actions: {
    async fetchAuthInfo() {
      let response = await fetch('http://localhost:3000/auth/user_info')
      if (!response.ok) {
        let error = await response.json()
        console.log(error)
        this.isAuthenticated = false
        return
      }
      this.isAuthenticated = true
      let data = await response.json()
      this.id = data.item._id
      this.firstname = data.item.firstname
      this.lastname = data.item.lastname
      this.email = data.item.email
    }
  }
})