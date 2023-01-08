import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { validation, validationButton } from "../../controller/validationLogin";
import style from "../../pages/adoptionForm/style.module.css";

export default function Login({ handlerOnChange, handlerOnClick }) {
  const router = useRouter();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [result, setResult] = useState({
    failed: "",
    done: "",
  });

  if (result.done) {
    router.push("/profile");
  }

  console.log(result);
  return (
    <>
      <div className={style.container}>
        <h1 className={style.title}>INICIAR SESION</h1>
        <form
          className={style.form}
          onChange={(event) => {
            handlerOnChange(event, setInput, input),
              validation(event, setError);
          }}
        >
          <label>
            Email:{" "}
            <input className={style.input} type="email" name="email"></input>
          </label>
          <div className={style.errors}>
            {error.email && <p>{error.email}</p>}
          </div>
          <label>
            Password:{" "}
            <input
              className={style.input}
              type="password"
              name="password"
            ></input>
          </label>
          <div className={style.errors}>
            {error.password && <p>{error.password}</p>}
          </div>
        </form>
        <button
          type="submit"
          onClick={(event) => handlerOnClick(event, input, setResult, true)}
          disabled={validationButton(error, input)}
        >
          Iniciar sesión
        </button>
        <div>{result.failed && <p>{result.failed}</p>}</div>
        <br />
        <button>
          <Link href={"/login"}>Go Back</Link>
        </button>
      </div>
    </>
  );
}
