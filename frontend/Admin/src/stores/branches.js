import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'
import fetchData from './utils/fetchDataWithAlerts'

export const useBranchesStore = defineStore("branches", {
  state: () => ({ items: [] }),
  getters: {
    alertsStore: () => useAlertsStore()
  },
  actions: {
    async fetchBranches() {
      if (this.items && this.items.length == 0) {
        var url = 'http://localhost:3000/admin/branch'
        var data = await fetchData(this.alertsStore, url)
        this.items = data.items
      }
    }
  }
})