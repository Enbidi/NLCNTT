import { defineStore } from 'pinia'
import { useAlertsStore } from './alerts'
export const useStatisticsStore = defineStore('statisticsStore', {
  state: () => {
    return {
      bills: []
    }
  },
  getters: {
    alerts: () => useAlertsStore()
  },
  actions: {
    async fetchBills(months=12) {
      var url = new URL("http://localhost:3000/admin/bill/statistic")
      url.searchParams.append("no_month", months)
      var data = await this.alerts.callAPI("warning", url)
      this.bills = data.items
    }
  }
})