import axios from "axios";

import { sendError } from "next/dist/server/api-utils";


 
const buyAndStock = async (merchand_order) => {
    try {
        
    //if (merchand_order) {
      
    
  
  const productstotal = JSON.parse(localStorage.getItem("cart"));
    if (productstotal.length) {
      const items= productstotal
       



     
     for (let i = 0; i < productstotal.length; i++) {
      
        const SearhById = await axios
        .get("http://localhost:3001/products/detail/"+productstotal[i]._id,) //item)
        .then((res) => ( res.data.stock))
        let stockTotal= SearhById - productstotal[i].amount
        let obj = {
            stock:stockTotal
          };
         await axios.put(`http://localhost:3001/updateProduct/`+productstotal[i]._id,obj) //item)
     }
   
    //deleteCart()
     //deleteAllCart();
    //}

    //localStorage.clear();
    localStorage.removeItem('cart');
 }
} catch (error) {
        
    }

    }

    module.exports = {buyAndStock};