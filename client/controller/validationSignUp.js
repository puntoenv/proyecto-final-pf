export const validation = (event, setError, error) => {
  let regex = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
  let inputValue = event.target.value;
  let inputName = event.target.name;

  if (inputValue !== "") {
    if (inputName === "name") {
      if (!inputValue.match(regex)) {
        setError({
          ...error,
          [inputName]: "No se admiten carácteres especiales o números",
        });
      } else if (inputValue.length < 3 || inputValue.length > 20) {
        setError({
          ...error,
          [inputName]: "El nombre debe tener de 3 a 10 caracteres ",
        });
      } else {
        setError({
          ...error,
          [inputName]: "",
        });
      }
    }
    if (inputName === "age") {
      if (inputValue < 18 || inputValue > 80) {
        setError({
          ...error,
          [inputName]: "La edad permitida para registrarse es de 18 a 80 años",
        });
      } else {
        setError({
          ...error,
          [inputName]: "",
        });
      }
    }
    if (inputName === "bio") {
      if (inputValue.length > 150) {
        setError({
          ...error,
          [inputName]: "No puedes pasar los 150 carácteres",
        });
      } else {
        setError({
          ...error,
          [inputName]: "",
        });
      }
    }
    if (inputName === "email") {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
        setError({
          ...error,
          [inputName]: "Email inválido",
        });
      } else {
        setError({
          ...error,
          [inputName]: "",
        });
      }
    }
    if (inputName === "password") {
      if (inputValue.length < 8 || inputValue.length > 15) {
        setError({
          ...error,
          [inputName]: "La contraseña debe tener entre 8 y 15 caracteres ",
        });
      } else if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(inputValue)) {
        setError({
          ...error,
          [inputName]: "No se admiten carácteres especiales",
        });
      } else {
        setError({
          ...error,
          [inputName]: "",
        });
      }
    }
  } else {
    setError({
      ...error,
      [inputName]: "",
    });
  }
};

export const validationButton = (error, input) => {
  if (error.email || error.password || error.name || error.age || !input.name || !input.age || !input.email || !input.password) {
    return true;
  } else {
    return false;
  }
};
