const mongoose = require("mongoose");

const { Schema } = mongoose;

const BillSchema = new Schema({
  amount: Number,
  sale: {
    type: Schema.Types.ObjectId,
    ref: "Sale"
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment"
  }
});

const Bill = mongoose.model("Bill", BillSchema);

module.exports = { Bill };