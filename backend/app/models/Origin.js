const mongoose = require("mongoose");

const { Schema } = mongoose;

const OriginSchema = new Schema({
  country: String,
});

OriginSchema.statics.findOriginByCountry = function (country, cb) {
  this.find({
    country: {
      $regex: `.*${country}.*`,
    },
  }).exec(cb);
};

const Origin = mongoose.model("Origin", OriginSchema);

module.exports = { Origin };
