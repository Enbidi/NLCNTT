import { defineStore } from "pinia"

export const useSearchResultStore = defineStore('searchResult', {
  state: () => ({ items: null }),
  actions: {
    async search(keyword) {
      var url = new URL('http://localhost:3000/product/find')
      url.searchParams.append('keyword', keyword)
      var response = await fetch(url)
      if (!response.ok) {
        return
      }
      this.items = (await response.json()).items
    }
  }
})