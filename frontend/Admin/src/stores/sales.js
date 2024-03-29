import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'
import fetchData from './utils/fetchDataWithAlerts'

export const useSalesStore = defineStore("sales", {
  state: () => ({ items: [] }),
  getters: {
    alertsStore: () => useAlertsStore()
  },
  actions: {
    async fetchSales() {
      if (this.items && this.items.length == 0) {
        var url = "http://localhost:3000/admin/sale"
        var data = await this.alertsStore.callAPI("danger", url)
        this.items = data.items ?? []
      }
    }
  }
})