import axios from "axios";

export function formatItemsMp(userAuth, Swal) {
  const productstotal = JSON.parse(localStorage.getItem("cart"));

  if (userAuth.name || userAuth.name !== "") {
    if (productstotal) {
      const payment = axios
        .post("/payment", productstotal)
        .then(
          (res) => (window.location.href = res.data.response.body.init_point)
        );
      return payment;
    }
  } else {
    Swal.fire({
      title: "Necesitas configurar tu nombre para comprar",
      icon: "error",
      color: "#437042",
      confirmButtonColor: "#437042",
      confirmButtonAriaLabel: "#437042",
    });
  }
}

export function formatOneItemMP(products, userAuth, Swal) {
  if (userAuth.name || userAuth.name !== "") {
    if (products) {
      const payment = axios
        .post("/payment", products)
        .then(
          (res) => (window.location.href = res.data.response.body.init_point)
        );
      return payment;
    }
  } else {
    Swal.fire({
      title: "Necesitas configurar tu nombre para comprar",
      icon: "error",
      color: "#437042",
      confirmButtonColor: "#437042",
      confirmButtonAriaLabel: "#437042",
    });
  }
}
