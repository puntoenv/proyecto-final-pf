export const addedProduct = (product, cart, setCart) => {
  const item = cart.find((item) => item._id === product._id);
  if (!cart.length || !item) {
    product.amount = 1;
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }
  item.amount += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  return;
};
