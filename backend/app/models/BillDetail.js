const mongoose = require("mongoose");

const { Schema } = mongoose;

const BillDetailSchema = new Schema({
  quantity: Number,
  note: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: true
  },
  bill: {
    type: Schema.Types.ObjectId,
    ref: "Bill",
    require: true
  }
}, { toObject: {virtuals: true}});

const BillDetail = mongoose.model("BillDetail", BillDetailSchema);

module.exports = { BillDetail };