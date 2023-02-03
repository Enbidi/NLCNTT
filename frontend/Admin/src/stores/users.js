import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'
import fetchData from './utils/fetchDataWithAlerts'

export const useUsersStore = defineStore("users", {
  state: () => ({ items: [] }),
  getters: {
    alertsStore: () => useAlertsStore()
  },
  actions: {
    async fetchUsers() {
      if (this.items && this.items.length == 0) {
        var url = "http://localhost:3000/admin/user"
        var data = await fetchData(this.alertsStore, url)
        this.items = data.items
      }
    }
  }
})