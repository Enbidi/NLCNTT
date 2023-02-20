import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'

export const useCommentsStore = defineStore("comments", {
  state: () => ({ items: [] }),
  getters: {
    alertsStore: () => useAlertsStore()
  },
  actions: {
    async fetchData() {
      if (this.items && this.items.length == 0) {
        var url = 'http://localhost:3000/admin/comment'
        var data = await this.alertsStore.callAPI("danger", url)
        this.items = data.items
      }
    }
  }
})