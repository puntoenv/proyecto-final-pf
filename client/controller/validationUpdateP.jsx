import axios from "axios";

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
  idUser
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
    }
  } catch (error) {
    console.log(error);
  }
};
