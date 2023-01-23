import { defineStore } from 'pinia'
import { useErrorsStore } from './errors'

export const useProductsStore = defineStore("products", {
  state: () => ({ items: [] }),
  getters: {
    errors() {
      const errorsStore = useErrorsStore()
      return errorsStore
    }
  },
  actions: {
    async fetchProducts() {
      if (this.items.length == 0) {
        const response = await fetch("http://localhost:3000/admin/product")
        if (!response.ok) {
          const err = await response.json()
          this.errors = err.errors
          return
        }
        this.items = (await response.json()).items
      }
    }
  }
})