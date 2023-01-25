import { defineStore } from 'pinia'

export const useAlertsStore = defineStore("alerts", {
  state: () => ({ items: [] }),
  actions: {
    remove(alert) {
      this.items = this.items.filter(item => item.content != alert.content)
    },
    push(alert) {
      this.items.push(alert)
    },
    clear() {
      this.items = []
    }
  }
})