import axios from "axios";
import { sendError } from "next/dist/server/api-utils";


const deleteCart = async (idMo) => {
    try {     
  const productstotal = JSON.parse(localStorage.getItem("cart"));
  if (idMo ) {
    await axios.post(
      (`http://localhost:3001/payment/buyNotification/${idMo}`)
    );}
    if (productstotal.length) {
    localStorage.setItem("cart", JSON.stringify([]))
 }
} catch (error) {
      
    }};

    



    
    module.exports = {deleteCart};