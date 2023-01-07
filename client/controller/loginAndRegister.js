import { setLocalStorage } from "../sesionStorage";
import axios from "axios";

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
    if (input.image === "")
      input.image =
        "https://www.pngkit.com/png/detail/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        input
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        input
      );
      const data = response.data;
      console.log(data);
      setLocalStorage("session", data.data);
    } catch (error) {
      console.log(error);
    }
  }
};
