import { defineStore } from "pinia"
import { useAlertsStore } from "./alerts"
export const useBillStore = defineStore("bill", {
  state: () => ({ history: [] }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async fetchHistory() {
      var response = await fetch("http://localhost:3000/user/bill")
      var data
      if (!response.ok) {
        data = await response.json()
        for (let error of data.errors) {
          this.alerts.push(err)
        }
      }
      data = await response.json()
      this.history = data.items
    }
  }
})