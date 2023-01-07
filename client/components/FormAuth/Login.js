import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Login({ handlerOnChange, handlerOnClick }) {
  const router = useRouter()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [result, setResult] = useState({
    failed: "",
    done: "",
  });

  if(result.done) {
      router.push('/profile')
  }

  console.log(result)
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
        <button
          type="submit"
          onClick={(event) => handlerOnClick(event, input, setResult, true)}
        >
          Sign up
        </button>
      </div>
      <div>
        {/* {result.done && <p>{result.done}</p>}
        {result.failed && <p>{result.failed}</p>} */}
      </div>
      <button>
        <Link href={"/login"}>Go Back</Link>
      </button>
    </>
  );
}
