import { defineStore } from 'pinia'

export const useAlertsStore = defineStore("alerts", {
  state: () => ({ items: [] }),
  actions: {
    remove(alert) {
      this.items = this.items.filter(item => item.content != alert.content)
    },
    push(alert, type='warning') {
      switch(typeof alert) {
      case 'object':
        this.items.push(alert)
        break
      case 'string':
        this.items.push({ content: alert, type })
      }
    },
    clear() {
      this.items = []
    }
  }
})