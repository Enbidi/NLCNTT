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
    },
    async callAPI(alertType, url, opts, json=true) {
      var response = await fetch(url, opts)
      console.log(response)
      var data = await response.json();
      if (!response.ok && data && data.errors) {
        for (let err of data.errors) {
          this.items.push({
            content: err.msg,
            type: alertType,
          })
        }
        return
      }
      return json ? data : response
    },
  }
})