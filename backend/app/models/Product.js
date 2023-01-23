const mongoose = require("mongoose");

const { Schema } = mongoose;

const SpecsSchema = new Schema({
  screen: String,
  os: String,
  backCamera: String,
  frontCamera: String,
  chip: String,
  RAM: Number,
  diskSize: Number,
  SIM: String,
  charging: String
});

const ProductSchema = new Schema({
  name: String,
  price: Number,
  img: String,
  description: String,
  specs: SpecsSchema,
  colors: [String],
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

ProductSchema.virtual("includedInBillDetails", {
  ref: "BillDetail",
  localField: "_id",
  foreignField: "product"
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };