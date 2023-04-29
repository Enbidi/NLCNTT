const mongoose = require("mongoose")
const { Schema } = mongoose

const FederatedUserSchema = new Schema({
  provider: String,
  subject: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  displayName: String,
  name: {
    familyName: String,
    givenName: String,
    middleName: String
  },
  emails: [Object]
})

const FederatedUser = mongoose.model("FederatedUser", FederatedUserSchema)

module.exports = {
  FederatedUser
}