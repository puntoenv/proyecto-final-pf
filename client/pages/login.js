import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { postUser } from "../src/actions";

export default function () {
  const { data: session } = useSession();
  console.log(session);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    age: 0,
    bio: "",
    image: "",
    mail: "",
    password: "",
  });

  const handlerSubmitRegister = () => {
    dispatch(postUser);
  };

  const handlerChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {session ? (
        <div>
          <p>
            Go to <Link href={"/profile"}>{session.user.name}'s</Link> profile.
          </p>
        </div>
      ) : (
        <div>
          <div>
            <h1>LOG IN</h1>
            <form>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  value={input.username}
                  name="username"
                  onChange={(event) => handlerChange(event)}
                ></input>
              </div>
              <div>
                <label>Age: </label>
                <input
                  type="number"
                  value={input.age}
                  name={"age"}
                  onChange={(event) => handlerChange(event)}
                ></input>
              </div>
              <div>
                <label>Bio: </label>
                <input
                  type="text"
                  value={input.bio}
                  name={"bio"}
                  onChange={(event) => handlerChange(event)}
                ></input>
              </div>
              <div>
                <label>Image: </label>
                <input
                  type="text"
                  value={input.image}
                  name={"image"}
                  onChange={(event) => handlerChange(event)}
                ></input>
              </div>
              <div>
                <label>Email: </label>
                <input
                  type="text"
                  value={input.mail}
                  name={"mail"}
                  onChange={(event) => handlerChange(event)}
                ></input>
              </div>
              <div>
                <label>Password: </label>
                <input
                  type="text"
                  value={input.password}
                  name={"password"}
                  onChange={(event) => handlerChange(event)}
                ></input>
              </div>
            </form>
            <button type="submit" onSubmit={() => handlerSubmitRegister()}>
              Log in
            </button>
          </div>
          <br />
          <br />
          <div>
            <h1>SIGN IN</h1>
            <form>
              <label>
                User: <input type="text"></input>
              </label>
              <br />
              <label>
                Password: <input type="text"></input>
              </label>
            </form>
            <button type="submit">Sign in</button>
          </div>
          <br />
          <br />
          <div>
            <h1>SIGN IN WITH FACEBOOK OR GOOGLE</h1>
            <button onClick={() => signIn()}>
              Sign in with Facebook or Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}
