const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  content: String,
  rate: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };