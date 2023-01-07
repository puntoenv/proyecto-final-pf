const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9\s]+$/, "invalid name"],
  },
  bio: String,
  age: {
    type: Number,
  },
  image: String,
  email: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "invalid mail"],
  },
  password: {
    type: String,
    minlength: 8,
  },
  administrator: { type: Boolean, default: false },
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pets",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  bought: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  hidden: { type: Boolean, default: false },
});

userSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", userSchema);
