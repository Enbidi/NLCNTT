import { defineStore } from "pinia"
import { useAlertsStore } from "./alerts"
export const useBillStore = defineStore("bill", {
  state: () => ({ history: [] }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async fetchData() {
      var data = await this.alerts.callAPI("warning", import.meta.env.VITE_BILL_HISTORY_URL)
      if (data == undefined) {
        return
      }
      this.history = data.items
    }
  }
})