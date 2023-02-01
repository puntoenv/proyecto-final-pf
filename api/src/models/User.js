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
  gender: {
    type: String,
    type: String,
  },
  ubication: {
    type: Object,
    type: Object,
  },
  directions: {
    type: Array,
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
  petsAdopted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
  petsAdopted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pet",
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
  review_star: [
    
    {
      stars: Number,
      reviews: String,
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  signIn: {
    type: String,
    default: "local",
  },
  hidden: { type: Boolean, default: false },
  
 

},{timestamps:true});

userSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", userSchema);
