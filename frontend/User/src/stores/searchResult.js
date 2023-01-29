import { defineStore } from "pinia"

import { useAlertsStore } from "./alerts"

export const useSearchResultStore = defineStore('searchResult', {
  state: () => ({ items: null }),
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async search(keyword) {
      var url = new URL('http://localhost:3000/product/find')
      url.searchParams.append('keyword', keyword)
      var response = await fetch(url)
      var data
      if (!response.ok) {
        data = await response.json()
        for (let error of data.errors) {
          this.alerts.push(error)
        }
      }
      var data = await response.json()
      this.items = data.items
    }
  }
})