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
  SIMs: String,
  charging: String
}, { _id: false });

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
}, { toJSON: {virtuals: true }, toObject: {virtuals: true} });

ProductSchema.statics.findProductByName = function(name, cb) {
  this.find({
    name: {
      $regex: `.*${name}.*`
    }
  }, cb);
}

ProductSchema.virtual("includedInBillDetails", {
  ref: "BillDetail",
  localField: "_id",
  foreignField: "product"
});

ProductSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "product"
});

ProductSchema.virtual("billsCount", {
  ref: "BillDetail",
  localField: "_id",
  foreignField: "product",
  count: true
});

ProductSchema.virtual("inSales", {
  ref: "Sale",
  localField: "_id",
  foreignField: "products"
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema, SpecsSchema };