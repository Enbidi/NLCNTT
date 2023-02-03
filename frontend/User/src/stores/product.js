import { defineStore } from "pinia"

export const useProductStore = defineStore("product", {
  state: () => ({ data: null }),
  getters: {
    finalPrice: (state) => {
      var data = state.data
      if (data == null || data == undefined) {
        return
      }
      var price = state.data.price
      for (let sale of data.inSales) {
        switch(sale.saleType) {
        case 'Promotion':
          price -= price * (sale.percent / 100)
          break
        case 'Discount':
          price -= sale.value
          break
        }
      }
      return price.toFixed(2)
    }
  }
})