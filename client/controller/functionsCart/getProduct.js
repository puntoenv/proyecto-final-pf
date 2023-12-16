export const getProduct = (cart, id) => {
  const item = cart.find((item) => item._id === id);

  return item;
};
