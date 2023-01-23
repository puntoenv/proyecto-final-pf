const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");

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
  star_reviews:[
    {
    
     stars: Number,
     reviews: String,
     user: {
        type: Schema.Types.ObjectId,
        ref: "User",
     }
    }
  ],
  boughtBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  hidden: { type: Boolean, default: false },
});

productSchema.plugin(uniqueValidator, { message: "is already taken." });

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
