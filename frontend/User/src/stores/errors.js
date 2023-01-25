import { defineStore } from 'pinia'

export const useErrorsStore = defineStore("errors", {
  state: () => ({ items: [] }),
  actions: {
    removeError(err) {
      this.items = this.items.filter(item => item != err)
    },
    pushError(err) {
      this.items.push(err)
    },
    clearErrors() {
      this.items = []
    }
  }
})