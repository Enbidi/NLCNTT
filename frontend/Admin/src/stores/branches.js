import { defineStore } from 'pinia'
import { useErrorsStore } from './errors'

export const useBranchesStore = defineStore("branches", {
  state: () => ({ items: [] }),
  getters: {
    errors() {
      const errorsStore = useErrorsStore()
      return errorsStore
    }
  },
  actions: {
    async fetchBranches() {
      if (this.items.length == 0) {
        const response = await fetch("http://localhost:3000/admin/branch")
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