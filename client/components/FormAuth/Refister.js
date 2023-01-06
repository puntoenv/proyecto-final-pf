import React from "react";
import { useState } from "react";

export default function Refister({ handlerChange, handlerClick }) {
  const [input, setInput] = useState({
    name: "",
    age: 0,
    bio: "",
    image: "",
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

        <div>
          <label>
            Age:
            <input
              type="number"
              name={"age"}
              value={input.age}
              onChange={(event) => handlerChange(event, setInput, input)}
            ></input>
          </label>
        </div>
        <div>
          <label>Bio: </label>
          <input
            type="text"
            name={"bio"}
            value={input.bio}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            name={"image"}
            value={input.image}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </div>
        <div>
          <label>Email: </label>
          <input
            type="text"
            name={"email"}
            value={input.email}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name={"password"}
            value={input.password}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </div>
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
