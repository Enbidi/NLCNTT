const mongoose = require("mongoose");

const { Schema } = mongoose;

const CreditCardSchema = new Schema({
  cardType: String,
  cardNumber: {
    type: String,
    unique: true
  },
  CVV: String,
  expiration: Date
});

const CreditCart = mongoose.model("CreditCard", CreditCardSchema);

module.exports = { CreditCart, CreditCardSchema };