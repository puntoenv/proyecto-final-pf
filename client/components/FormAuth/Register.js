import React from "react";
import { useState } from "react";
import { validation, validationButton } from "../../controller/validationLogin";

export default function Register({ handlerChange, handlerClick }) {
  const [input, setInput] = useState({
    name: "",
    age: 0,
    bio: "",
    image: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: "",
    age: "",
    bio: "",
    email: "",
    password: "",
  });

  const [result, setResult] = useState({
    failed: "",
    done: "",
  });

  return (
    <div>
      <h1>LOG IN</h1>
      <form>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(event) => {
                handlerChange(event, setInput, input),
                  validation(event, setError);
              }}
            ></input>
          </label>
          <div>{error.name && <p>{error.name}</p>}</div>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name={"age"}
              value={input.age}
              onChange={(event) => {
                handlerChange(event, setInput, input),
                  validation(event, setError);
              }}
            ></input>
          </label>
          <div>{error.age && <p>{error.age}</p>}</div>
        </div>
        <div>
          <label>
            Bio:
            <input
              type="text"
              name={"bio"}
              value={input.bio}
              onChange={(event) => {
                handlerChange(event, setInput, input),
                  validation(event, setError);
              }}
            ></input>
          </label>
          <div>{error.bio && <p>{error.bio}</p>}</div>
        </div>
        <div>
          <label>
            Image:
            <input
              type="file"
              name={"image"}
              value={input.image}
              onChange={(event) => handlerChange(event, setInput, input)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="text"
              name={"email"}
              value={input.email}
              onChange={(event) => {
                handlerChange(event, setInput, input),
                  validation(event, setError);
              }}
            ></input>
          </label>
          <div>{error.email && <p>{error.email}</p>}</div>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name={"password"}
              value={input.password}
              onChange={(event) => {
                handlerChange(event, setInput, input),
                  validation(event, setError);
              }}
            ></input>
          </label>
          <div>{error.password && <p>{error.password}</p>}</div>
        </div>
        <button
          type="submit"
          onClick={(event) =>
            handlerClick(event, input, setResult, setInput, true)
          }
          disabled={validationButton(error, input)}
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
};
