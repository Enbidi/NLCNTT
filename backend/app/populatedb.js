require("dotenv").config()

const mongoose = require("mongoose");
const { User } = require("./models/User");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
User.create({
  firstname: "Nguyen",
  lastname: "Duy",
  number: "0789526780",
  email: "enbidi.normallife@gmail.com",
  password: "123456789",
  sex: "Male"
});