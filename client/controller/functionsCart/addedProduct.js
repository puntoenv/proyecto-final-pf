export const addedProduct = (product, cart, setCart) => {
  const item = cart.find((item) => item._id === product._id);
  if (!cart.length || !item) {
    product.amount = 1;
    product.subtotal += product.price;
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }
  item.amount += 1;
  product.subtotal += product.price;
  localStorage.setItem("cart", JSON.stringify(cart));
  return;
};
