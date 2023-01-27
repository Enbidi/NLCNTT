import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    var storedCart = localStorage.getItem("cart");
    return storedCart
      ? JSON.parse(storedCart)
      : {
          items: [],
        };
  },
  getters: {
    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.quantity * item.price, 0),
  },
  actions: {
    addToCart(item, quantity = 1) {
      var newItem = Object.assign({ quantity }, item);
      this.items.push(newItem);
    },
    remove(removedItem) {
      var index = this.items.findIndex((item) => item._id == removedItem._id);
      this.items.splice(index, 1);
    },
  },
});
