import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    var storedCart = localStorage.getItem("cart");
    storedCart = storedCart ? JSON.parse(storedCart) : undefined
    if (storedCart && storedCart.items instanceof Array) {
      return { ...storedCart, position: null }
    }
    return {
      items: [],
      position: null
    }
  },
  getters: {
    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.quantity * item.price, 0),
  },
  actions: {
    addToCart(item, quantity = 1) {
      if (this.items.find(i => i._id == item._id)) {
        return;
      }
      item = {
        _id: item._id,
        img: item.img,
        name: item.name,
        price: item.price,
        description: item.description
      }
      var newItem = Object.assign({ quantity }, item);
      this.items.push(newItem);
    },
    remove(removedItem) {
      var index = this.items.findIndex((item) => item._id == removedItem._id);
      this.items.splice(index, 1);
    },
    setPosition(position) {
        this.position = position;
    },
    sortByPrice(asc = true) {
      this.items = this.items.sort((a, b) => {
        var priceA = a.price;
        var priceB = b.price;
        if (priceA > priceB) {
          return asc ? 1 : -1;
        } else if (priceA < priceB) {
          return asc ? -1 : 1;
        }
        return 0;
      })
    },
  },
});
