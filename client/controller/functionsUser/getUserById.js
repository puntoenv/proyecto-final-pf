import axios from "axios";

export const getUserById = async (id) => {
  const searchUser = await axios(
    `/user/${id}`
  );
  const user = await searchUser.data;
  console.log(user);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};
