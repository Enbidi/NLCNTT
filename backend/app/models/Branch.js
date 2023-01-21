const mongoose = require("mongoose");

const { Schema } = mongoose;

const BranchSchema = new Schema({
  name: String
}, { toJSON: { virtuals: true }});

BranchSchema.statics.findBranchByName = function(name, cb) {
  this.find({
    name: {
      $regex: `.*${name}.*`
    }
  }, cb);
}

BranchSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "branch"
});

const Branch = mongoose.model("Branch", BranchSchema);

module.exports = { Branch };