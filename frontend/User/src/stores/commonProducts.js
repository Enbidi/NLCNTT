import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'

export const useCommonProducts = defineStore("commonProducts", {
  state: () => ({ items: [] }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async fetchProducts() {
      var url = new URL("http://localhost:3000/product/top_products")
      url.searchParams.append("top", 5)
      var data = await this.alerts.callAPI("warning", url)
      if (data == undefined) {
        return
      }
      this.items = data.items
    }
  }
})