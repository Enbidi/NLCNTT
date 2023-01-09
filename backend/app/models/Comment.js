const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  content: String,
  rating: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
});

CommentSchema.statics.findByContent = function(content, cb) {
  this.find({
    content: {
      $regex: `.*${content}.*`,
      $options: "i"
    }
  }).then(cb);
}

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };