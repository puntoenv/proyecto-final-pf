import axios from "axios";

export async function searchUser(id) {
  try {
    const user = await axios(`http://localhost:3001/user/${id}`);
    console.log(user.data);
    return user.data;
  } catch (error) {
    console.error(error);
  }
}
