import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const deleteItemOfCart = (cart, setCart, idProduct) => {
  const cartFiltered = cart.filter((item) => item._id !== idProduct);
  setCart(cartFiltered);
  localStorage.setItem("cart", JSON.stringify(cart));
  return;
};

export const deleteCart = (cart, setCart) => {
  setCart([]);
  localStorage.setItem("cart", JSON.stringify(cart));
  return;
};

export const discountOneProduct = (cart, setCart, id) => {
  const item = cart.find((item) => item._id === id);
  if (item.amount === 1) {
    const cartFiltered = cart.filter((item) => item._id !== id);
    setCart(cartFiltered);
    localStorage.setItem("cart", JSON.stringify(cart));
    return Swal.fire({
      position: "center",
      icon: "success",
      title: `Producto quitado de tu Carrito`,
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    item.amount -= 1;
    item.subtotal -= item.price;
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Producto quitado de tu Carrito`,
      showConfirmButton: false,
      timer: 1000,
    });
  }
};
