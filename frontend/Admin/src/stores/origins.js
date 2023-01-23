import { defineStore } from 'pinia'
import { useErrorsStore } from './errors'

export const useOriginsStore = defineStore("origins", {
  state: () => ({ items: [] }),
  getters: {
    errors() {
      const errorsStore = useErrorsStore()
      return errorsStore
    }
  },
  actions: {
    async fetchOrigins() {
      if (this.items.length == 0) {
        const response = await fetch("http://localhost:3000/admin/origin")
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