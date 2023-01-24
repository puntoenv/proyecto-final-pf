import axios from "axios";
import { sendError } from "next/dist/server/api-utils";



 
const deleteCart = async () => {
    try {
        
    //if (merchand_order) {
  const productstotal = JSON.parse(localStorage.getItem("cart"));
    if (productstotal.length) {
     
       
     
  
    localStorage.setItem("cart", JSON.stringify([]))
 }
} catch (error) {
      
    }

    }

    

    module.exports = {deleteCart};