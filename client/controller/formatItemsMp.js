import axios from "axios";

export function formatItemsMp(total) {
    if (total) {
      
       let item= [{
        name:"productos varios",
        price:total,
    }] 
    const payment = 
    axios.post("http://localhost:3001/payment", item)
                      .then(
                        (res) =>
                          (window.location.href =
                            res.data.response.body.init_point)
                      );
                      return payment;
    } 


    }
    

export function formatOneItemMP(products) {

  if (products){
        const payment = 
    axios.post("http://localhost:3001/payment", products)
                      .then(
                        (res) =>
                          (window.location.href =
                            res.data.response.body.init_point)
                      );
                      return payment;


    }
    
}