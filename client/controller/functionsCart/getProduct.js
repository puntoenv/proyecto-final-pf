export const getProduct = (cart, id) => {
  const item = cart.find((item) => item._id === id);

  return item;
};

export const getTotal = (cart) => {
  const total = cart.reduce(
    (total, producto) => total + producto.amount * producto.price,
    0
  );

  return total;
};
