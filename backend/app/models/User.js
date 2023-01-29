const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;

const options = { 
  discriminatorKey: "role",
  toJSON: { virtuals: true }
};

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  number: String,
  email: String,
  password: String,
  sex: {
    type: String,
    enum: ["male", "female"]
  }
}, options);

UserSchema.virtual("name").get(function() {
  return `${this.firstname} ${this.lastname}`;
})

UserSchema.statics.findUserByEmail = function(email, cb) {
  return this.where("email", email).exec(cb);
}

UserSchema.statics.findUserByFullname = function(fullname, cb) {
  this.aggregate([
    {
      $addFields: {
        fullname: {
          $concat: ["$firstname", " ", "$lastname"]
        }
      }
    },
    {
      $match: {
        fullname: {
          $regex: `.*${fullname}.*`,
          $options: "i"
        }
      }
    }
  ]).project("firstname lastname email number sex").then(cb);
}

UserSchema.virtual("bills", {
  ref: "Bill",
  localField: "_id",
  foreignField: "user"
});

UserSchema.plugin(passportLocalMongoose, {
  usernameUnique: false,
  usernameQueryFields: ["email"],
  usernameField: "email",
  selectFields: "firstname lastname email number sex"
});

const User = mongoose.model("User", UserSchema);

const Customer = User.discriminator("Customer", {}, options);
const Staff = User.discriminator("Staff", {}, options);
const Admin = User.discriminator("Admin", {}, options);

module.exports = {
  Customer,
  Staff,
  Admin,
  User
};