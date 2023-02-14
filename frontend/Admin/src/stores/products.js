import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'
import fetchData from './utils/fetchDataWithAlerts'

export const useProductsStore = defineStore("products", {
  state: () => ({ items: [], selectedItems: [] }),
  getters: {
    alertsStore: () => useAlertsStore()
  },
  actions: {
    async fetchProducts() {
      if (this.items && this.items.length == 0) {
        var url = import.meta.env.VITE_PRODUCT_URL
        var data = await this.alertsStore.callAPI("danger", url)
        this.items = data.items
      }
    }
  }
})