import axios from "axios";

export function formatItemsMp(total) {
    if (total) {
      
       let item= [{
        name:"productos varios",
        price:total,
    }] 
    const payment = axios
      .post("https://proyecto-final-pf-production.up.railway.app/payment", item)
      .then(
        (res) => (window.location.href = res.data.response.body.init_point)
      );
                      return payment;
    } 


    }
    

export function formatOneItemMP(products) {

  if (products){
        const payment = axios
          .post(
            "https://proyecto-final-pf-production.up.railway.app/payment",
            products
          )
          .then(
            (res) => (window.location.href = res.data.response.body.init_point)
          );
                      return payment;


    }
    
}