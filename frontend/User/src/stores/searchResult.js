import { defineStore } from "pinia"

import { useAlertsStore } from "./alerts"

export const useSearchResultStore = defineStore('searchResult', {
  state: () => ({ items: null }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async search(keyword) {
      var url = new URL(import.meta.env.VITE_FIND_PRODUCT_URL)
      url.searchParams.append('keyword', keyword)
      var data = await this.alerts.callAPI("warning", url)
      if (data == undefined) {
        return
      }
      this.items = data.items 
    }
  }
})