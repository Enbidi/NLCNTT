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
        var url = "http://localhost:3000/admin/product"
        var data = await fetchData(this.alertsStore, url)
        this.items = data.items
      }
    }
  }
})