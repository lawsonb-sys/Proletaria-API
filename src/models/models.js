const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trime: true,
  },
  lastName: {
    type: String,
    require: true,
    trime: true,
  },
  email: {
    type: String,
    require: true,
    trime: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    trime: true,
    encrypt: true,
  },
  work: {
    type: String,
    require: true,
    trime: true,
  },
  ville: {
    type: String,
    require: true,
    trime: true,
  },
  number: {
    type: Number,
    require: true,
    trime: true,
  },
  picture: {
    type: String,
  },
  image: [
    {
      name: { type: String },
      url: { type: String },
    },
  ],
});

UserSchema.pre("save", async function (nexts) {
  try {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hashSync(this.password, salt);
    }
  } catch (error) {
    nexts(error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
