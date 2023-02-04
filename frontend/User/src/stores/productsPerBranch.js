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
    async fetchData() {
      if (this.items.length == 0) {
        var data = await this.alerts.callAPI("warning", "http://localhost:3000/branch/product")
        if (data == undefined) {
          return
        }
        this.items = data.items
        this.isLoaded = true
      }
    },
    getProductsByBranchName(branchName) {
      return this.items.find(branch => branch.name == branchName)?.products
    }
  }
})