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
    return;
  } else {
    item.amount -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
