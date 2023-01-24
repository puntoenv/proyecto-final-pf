const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const merchant_orderSchema = new Schema({
    id: {
    type: Number,
   
    
    
  },
  
  status: {
    type: String,
   
    
  },
  preference_id: {
    type: String,
   
  },
  payments: {
   
        type: Array,
       
  },
  
    
   total_amount: {
    type: Number,
    
   },   

   items: {
    type: Array,
    
  },
  cancelled: {
    type: Boolean,
   
  },
  order_status: {
    type: String,
    
  },
 
  user: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],

});

merchant_orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Merchant_orders", merchant_orderSchema);