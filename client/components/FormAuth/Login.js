import React, { useState } from "react";

import Link from "next/link";

export default function Login({ handlerOnChange, handlerOnClick }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <div>
        <h1>SIGN UP</h1>
        <form onChange={(event) => handlerOnChange(event, setInput, input)}>
          <label>
            Email: <input type="text" name="email"></input>
          </label>
          <label>
            Password: <input type="password" name="password"></input>
          </label>
        </form>
        <button type="submit" onClick={(event) => handlerOnClick(event, input)}>
          Sign up
        </button>
      </div>
      <button>
        <Link href={"/login"}>Go Back</Link>
      </button>
    </>
  );
}
