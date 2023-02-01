import { defineStore } from "pinia"

export const useSelectedProductsStore = defineStore("selectedProducts", {
  state: () => ({ items: [] }),
  actions: {
    push(item) {
      this.items.push(item)
    }
  }
})