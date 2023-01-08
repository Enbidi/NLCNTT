const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  img: String,
  description: String,
  origin: {
    type: Schema.Types.ObjectId,
    ref: "Origin"
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch"
  }
});

ProductSchema.statics.findProductByName = function(name, cb) {
  this.find({
    name: {
      $regex: `.*${name}.*`
    }
  }).then(cb);
}

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };