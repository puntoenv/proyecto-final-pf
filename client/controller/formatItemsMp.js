import axios from "axios";

export function formatItemsMp() {
  const productstotal = JSON.parse(localStorage.getItem("cart"));

  if (productstotal) {
    const payment = axios
      .post("/payment", productstotal)
      .then(
        (res) => (window.location.href = res.data.response.body.init_point)
      );
    return payment;
  }
}

export function formatOneItemMP(products) {
  if (products) {
    const payment = axios
      .post("/payment", products)
      .then(
        (res) => (window.location.href = res.data.response.body.init_point)
      );
    return payment;
  }
}
