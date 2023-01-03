const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    min: 15,
    required: true
  },
  Price:{
    type: Number,
    required: true
  }, 
  image: String,
  Stock: Number,
  Category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }

});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", userSchema);