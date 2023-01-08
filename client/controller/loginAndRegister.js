import { setLocalStorage } from "../sesionStorage";
import axios from "axios";

export const handlerOnChange = (event, setInput, input) => {
  event.preventDefault();
  setInput({
    ...input,
    [event.target.name]: event.target.value,
  });
};

export const handlerOnClick = async (
  event,
  input,
  setResult,
  setInput,
  register
) => {
  if (register) {
    event.preventDefault();
    setInput({
      name: "",
      age: 0,
      bio: "",
      image: "",
      email: "",
      password: "",
    });
    if (input.image === "") {
      input.image =
        "https://www.pngkit.com/png/detail/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";
    }

    if (input.bio === "") {
      input.bio = "No info";
    }

    if (input.age === "") {
      input.age = 0;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        input
      );
      const data = await response.data;
      console.log(data);
      if (data.error) {
        setResult({
          failed: "No se pudo hacer el registro. Intenta de nuevo",
          // done: "",
        });
      } else {
        setResult({
          // failed: "",
          done: "Registro exitoso. Ya puedes iniciar sesión.",
        });
      }
    } catch (error) {
      let errorEmail = error.response.data.errors.email.properties;
      setResult({
        failed: `The email "${errorEmail.value}" ya está registrado.`,
        // done: ""
      });
    }
  } else {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        input
      );
      const data = response.data;
      if (data.error) {
        console.log(data.error);
        setResult({
          failed: [...data.error],
        });
      } else {
        setResult({
          done: [
            data.data.user.name,
            data.data.user.email,
            data.data.user.image,
          ],
        });
      }
      console.log(data);
      setLocalStorage("session", data.data);
    } catch (error) {
      console.log(error);
    }
  }
};
