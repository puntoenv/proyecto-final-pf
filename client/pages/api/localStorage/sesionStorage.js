const miStorage =
  typeof window !== "undefined" &&
  typeof window !== "null" &&
  window.sessionStorage;

export const setLocalStorage = (nameProp, value) => {
  typeof window !== "undefined" &&
    typeof window !== "null" &&
    miStorage.setItem(nameProp, value);
  return;
};

export const getLocalStorage = (nameItem) => {
  let token;
  typeof window !== "undefined" &&
    typeof window !== "null" &&
    (token = miStorage.getItem(nameItem));
  return token;
};
