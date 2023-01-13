import axios from "axios";
import Router from "next/router";

export const validateForm = () => {};

export const hanldeOnChange = (event, setInput, input, setResult) => {
  setInput({
    ...input,
    [event.target.name]: event.target.value,
  });

  setResult({
    error: "",
    seccess: "",
  });
};

export const handleOnSubmit = async (
  event,
  setResult,
  setInput,
  input,
  idUser,
  Swal
) => {
  event.preventDefault();

  try {
    const response = await axios.put(
      `http://localhost:3001/updateProfile/${idUser}`,
      input
    );

    if (response.data.error) {
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
    // else {
    //   Swal.fire({
    //     title: "No se pudo editar el perfil. Intenta nuevamente",
    //     icon: "error",
    //     color: "#437042",
    //     confirmButtonColor: "#437042",
    //     confirmButtonAriaLabel: "#437042",
    //   });
    // }
  }
};
