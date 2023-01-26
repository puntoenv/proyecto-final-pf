import axios from "axios";

export function formatItemsMp() {

  const productstotal = JSON.parse(localStorage.getItem("cart"));
  
    if (productstotal) {
    const payment = axios
      .post(
        "http://localhost:3001/payment",
        productstotal
      ) 
      .then(
        (res) => (window.location.href = res.data.response.body.init_point)
      );
               return payment;
    }}
    

export function formatOneItemMP(products) {

  if (products){
        const payment = axios
          .post(
            "http://localhost:3001/payment",
            products
          )
          .then(
            (res) => (window.location.href = res.data.response.body.init_point)
          );
                      return payment;


    }
    
}