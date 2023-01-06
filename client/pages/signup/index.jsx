import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { postUser } from "../../stores/actions";

export default function () {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    age: 0,
    bio: "",
    image: "",
    email: "",
    password: "",
  });

  const handlerChange = (event) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmitRegister = async (event) => {
    event.preventDefault();
    dispatch(postUser(input));
    setInput({
      name: "",
      age: 0,
      bio: "",
      image: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div>
        <h1>SIGN UP</h1>
        <form>
          <label>
            User: <input type="text"></input>
          </label>
          <br />
          <label>
            Password: <input type="text"></input>
          </label>
        </form>
        <button type="submit">Sign up</button>
      </div>
      <button><Link href={'/login'}>Go Back</Link></button>
    </>
  );
}

