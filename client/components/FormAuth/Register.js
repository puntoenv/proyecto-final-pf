import React from "react";
import { useState } from "react";

export default function Refister({ handlerChange, handlerClick }) {
  const [input, setInput] = useState({
    name: "",
    age: 0,
    bio: "",
    image:
      "https://www.pngkit.com/png/detail/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png",
    email: "",
    password: "",
  });
  return (
    <div>
      <h1>LOG IN</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </label>

        <label>
          Age:
          <input
            type="number"
            name={"age"}
            value={input.age}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </label>

        <label>
          Bio:
          <input
            type="text"
            name={"bio"}
            value={input.bio}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </label>

        <label>
          Image:
          <input
            type="text"
            name={"image"}
            value={input.image}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </label>

        <label>
          Email:
          <input
            type="text"
            name={"email"}
            value={input.email}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </label>

        <label>
          Password:
          <input
            type="password"
            name={"password"}
            value={input.password}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </label>
        <button
          type="submit"
          onClick={(event) => handlerClick(event, input, true)}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
