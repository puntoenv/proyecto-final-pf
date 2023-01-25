import axios from "axios";
import Router from "next/router";

export const validateForm = (event, setError, error) => {
  let regex = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
  let inputValue = event.target.value;
  let inputName = event.target.name;
  console.log(error);

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
          [inputName]: "El nombre debe tener de 3 a 20 caracteres ",
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

    if (inputName === "ubication") {
      if (!inputValue.match(regex)) {
        setError({
          ...error,
          [inputName]: "No se admiten carácteres especiales o números",
        });
      } else if (inputValue.length < 3 || inputValue.length > 20) {
        setError({
          ...error,
          [inputName]: "Debe tener de 3 a 20 caracteres ",
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

export const hanldeOnChange = (event, setInput, input, setResult) => {
  if (event.target.name.includes("direction")) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
  setInput({
    ...input,
    [event.target.name]: event.target.value,
  });

  setResult({
    error: "",
    seccess: "",
  });
};

export const handleFiles = (event, setInput, input) => {
  const { files } = event.target;
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onloadend = () => {
    setInput({
      ...input,
      image: reader.result,
    });
  };
};

export const handleAdoption = async (router, Swal, idUser) => {
  try {
    const response = await axios.get(
      `https://proyecto-final-pf-production.up.railway.app/user/${idUser}`
    );
    if (!response.data.name || response.data.name === " ") {
      Swal.fire({
        title: "Necesitas configurar tu nombre para adoptar",
        icon: "error",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
    } else {
      router.push(`/adoptionForm/${idUser}`);
    }
  } catch (error) {
    console.log(error);
  }
};



export const handleOnSubmit = async (
  event,
  setResult,
  setInput,
  input,
  idUser,
  Swal, setLoader
) => {
  event.preventDefault();

  try {
    setLoader(true)
    const response = await axios.put(
      `https://proyecto-final-pf-production.up.railway.app/updateProfile/${idUser}`,
      input
    );

    if (response.data.error) {
      setLoader(false)
      setResult({
        error: "El perfil no se pudo editar. Intenta de nuevo más tarde",
        success: "",
      });
    } else {
      
      setResult({
        error: "",
        success: "Perfil editado con éxito",
      });
      setInput({
        name: "",
        lastname: "",
        age: "",
        bio: "",
        image: "",
        ubication: "",
      });
      
      Router.reload(window.location.pathname);
    }
  } catch (error) {
    if (input.image && error) {
      if (error.response.statusText === "Payload Too Large") {
        Swal.fire({
          title: "Error. Intenta nuevamente con otra imagen",
          icon: "error",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",
        });
      }
    }
  }
};
