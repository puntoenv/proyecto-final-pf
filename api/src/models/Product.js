const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new Schema({
  name: {
    type: String,
    // unique: true,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    min: 15,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: String,
  stock: Number,
  category: Array,
  boughtBy: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  hidden: {type: Boolean,
    default: false}
});

// productSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Product", productSchema);
