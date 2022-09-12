const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  console.log(this);
  return jwt.sign({ _id: this._id }, process.env.SECRET);
};

userSchema.statics.findByCredentials = async (username, pass) => {
  const user = await User.findOne({ username });
  if (user && bcrypt.compare(pass, user.password)) {
    return user;
  }
  throw new Error();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
