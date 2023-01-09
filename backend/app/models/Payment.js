const mongoose = require("mongoose");

const { Schema } = mongoose;

const PaymentSchema = new Schema({
  method: String
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = { Payment, PaymentSchema };