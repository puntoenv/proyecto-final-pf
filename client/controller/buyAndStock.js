import axios from "axios";
import { sendError } from "next/dist/server/api-utils";


const deleteCart = async () => {
    try {     
  const productstotal = JSON.parse(localStorage.getItem("cart"));
  
    if (productstotal.length) {
    localStorage.setItem("cart", JSON.stringify([]))
 }
 
} catch (error) {
  
    }};

    const updateStock = async (idMo) => {
      try {     
    if (idMo ) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACK}payment/buyNotification/${idMo}`
      );}
      
  } catch (error) {
    
      }};



    
    module.exports = {deleteCart,updateStock};