const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "invalid name"],
  },
  bio: String,
  age: {
    type: Number,
    required: true,
  },
  image: String,
  mail: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "invalid mail"],
  },
  password: {
    type: String,
    min: 8,
  },
  pets: [{ 
    type: Schema.Types.ObjectId,
     ref: 'Pet',
 }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Favorites'
  }],

});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", userSchema);
