// import { setLocalStorage } from "../../localStorage";

export const handlerOnChange = (event, setInput, input) => {
  event.preventDefault();
  setInput({
    ...input,
    [event.target.name]: event.target.value,
  });
};

export const handlerOnClick = async (event, input, register) => {
  if (register) {
    event.preventDefault();

    /*     setInput({
      name: "",
      age: 0,
      bio: "",
      image: "",
      email: "",
      password: "",
    }); */
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        input
      );
      const data = await response.data;
      //   if (data.error) {
      //     const badRequest = data.error;
      //     setResult({
      //       error: catchErrorAuth(
      //         badRequest.key,
      //         badRequest.value,
      //         badRequest.limit
      //       ),
      //     });
      //   } else {
      //     setResult({
      //       success: "Se ha creado tu cuenta, inicia sesion",
      //     });
      //   }
    } catch (error) {
      console.log(error);
    }
  }
};
