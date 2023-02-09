import { defineStore } from "pinia"
import { useAlertsStore } from "./alerts"

export const useSizesStore = defineStore("sizes", {
  items: () => ({ user: 0, bill: 0 }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async fetchUserSize() {
      var url = "http://localhost:3000/admin/user/size"
      var data = await this.alerts.callAPI("warning", url)
      this.user = data
    }
  }
})