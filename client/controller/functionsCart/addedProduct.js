import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const addedProduct = (product, cart, setCart) => {
  const item = cart.find((item) => item._id === product._id);

  if (!cart.length || !item) {
    product.amount = 1;
    product.subtotal += product.price;
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify(cart));
    return Swal.fire({
      position: "center",
      icon: "success",
      title: `Producto añadido a tu carrito`,
      showConfirmButton: false,
      timer: 1000,
    });
  }

  if (item.amount < item.stock) {
    item.amount += 1;
    product.subtotal += product.price;
    localStorage.setItem("cart", JSON.stringify(cart));
    return Swal.fire({
      position: "center",
      icon: "success",
      title: `Producto añadido a tu carrito`,
      showConfirmButton: false,
      timer: 1000,
    });
  }

  return Swal.fire({
    position: "center",
    icon: "error",
    title: `Limite de stock disponible`,
    showConfirmButton: false,
    timer: 1000,
  });
};
