const mongoose = require("mongoose");

const { Schema } = mongoose;

const BranchSchema = new Schema({
  name: String
});

BranchSchema.statics.findBranchByName = function(name, cb) {
  this.find({
    name: {
      $regex: `.*${name}.*`
    }
  }, cb);
}

const Branch = mongoose.model("Branch", BranchSchema);

module.exports = { Branch };