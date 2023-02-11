import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'

export const useCommonProducts = defineStore("commonProducts", {
  state: () => ({ items: [] }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async fetchData() {
      var url = new URL(import.meta.env.VITE_COMMON_PRODUCTS_URL)
      url.searchParams.append("top", 5)
      var data = await this.alerts.callAPI("warning", url)
      if (data == undefined) {
        return
      }
      this.items = data.items
    }
  }
})