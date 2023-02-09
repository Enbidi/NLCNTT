import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'

export const useBillsStore = defineStore("bills", {
  state: () => ({ items: [] }),
  getters: {
    alertsStore: () => useAlertsStore()
  },
  actions: {
    async fetchBills() {
      if (this.items && this.items.length == 0) {
        var url = 'http://localhost:3000/admin/bill'
        var data = await this.alertsStore.callAPI("danger", url)
        this.items = data.items
      }
    }
  }
})