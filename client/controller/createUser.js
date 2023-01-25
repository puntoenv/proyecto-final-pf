import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_URL_BACK;

export const createUser = async (email, name) => {
  const finded = await (await fetch(`${baseUrl}user-by-email/${email}`)).json();
  // if (finded.data.finded) {
  console.log(finded.finded);
  const data = await finded.finded;
  return data;
  // }

  await axios.post(`http://localhost:3001/create-user`, {
    email,
    name,
  });
};
