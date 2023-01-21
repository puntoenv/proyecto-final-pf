import axios from "axios";

export const getUserById = async (id) => {
  const searchUser = await axios(`http://localhost:3001/user/${id}`);
  const user = await searchUser.data;
  console.log(user);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};
