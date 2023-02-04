import { defineStore } from "pinia"
import { useAlertsStore } from "./alerts"
export const useBillStore = defineStore("bill", {
  state: () => ({ history: [] }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async fetchData() {
      var data = await this.alerts.callAPI("warning", "http://localhost:3000/user/bill")
      if (data == undefined) {
        return
      }
      this.history = data.items
    }
  }
})