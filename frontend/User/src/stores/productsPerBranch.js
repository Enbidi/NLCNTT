import { defineStore } from "pinia"

import { useErrorsStore } from "./errors"
import { useAlertsStore } from "./alerts"

export const useProductsPerBranchStore = defineStore("productsPerBranch", {
  state: () => ({ items: [] }),
  getters: {
    errors(state) {
      const errorsStore = useErrorsStore()
      return errorsStore
    },
    alerts: () => useAlertsStore()
  },
  actions: {
    async fetchProductsPerBranch() {
      if (this.items.length == 0) {
        var response = await fetch("http://localhost:3000/branch/product")
        var data
        if (!response.ok) {
          data = await response.json()
          for (let error of data.errors) {
            this.alerts.push(error)
          }
          return
        }
        data = await response.json()
        this.items = data.items
        this.isLoaded = true
      }
    }
  }
})