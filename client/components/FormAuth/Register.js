import React, { useEffect } from "react";
import { useState } from "react";

export default function Register({ handlerChange, handlerClick }) {
  const [input, setInput] = useState({
    name: "",
    age: 0,
    bio: "",
    image: "",
    email: "",
    password: "",
  });

  const [result, setResult] = useState({
    failed: "",
    done: ""
  })


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
            type="file"
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
          onClick={(event) =>
            handlerClick(event, input, setResult, setInput, true)
          }
        >
          Log in
        </button>
      </form>
      <div>
        {result.done && <h3>{result.done}</h3>}
        {result.failed && <h3>{result.failed}</h3>}
      </div>
    </div>
  );
}
