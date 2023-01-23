import { defineStore } from "pinia"

import { useErrorsStore } from "./errors"

export const useProductsPerBranchStore = defineStore("productsPerBranch", {
  state: () => ({ items: [] }),
  getters: {
    errors(state) {
      const errorsStore = useErrorsStore()
      return errorsStore
    }
  },
  actions: {
    async fetchProductsPerBranch() {
      if (this.items.length == 0) {
        const response = await fetch("http://localhost:3000/branch/product")
        if (!response.ok) {
          let err = JSON.parse(await response.json())
          this.errors = err.errors
          return
        }
        this.items = (await response.json()).items
        this.isLoaded = true
      }
    }
  }
})