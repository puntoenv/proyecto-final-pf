import React from "react";
import { useState } from "react";
import { validation, validationButton } from "../../controller/validationSignup";
import style from '../../pages/adoptionForm/style.module.css'
import styles from '../../pages/login/styles.module.css'

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
    <div className={style.title}>
      <h1>Registrarse</h1>
      <form className={style.form}>
        <div className={styles.div}>
          <label>Name:</label>
          <input
            className={style.input}
            type="text"
            name="name"
            value={input.name}
            onChange={(event) => {
              handlerChange(event, setInput, input),
                validation(event, setError);
            }}
          ></input>

          <div>{error.name && <p>{error.name}</p>}</div>
        </div>
        <div className={styles.div}>
          <label>Age:</label>
          <input
            className={style.input}
            type="number"
            name={"age"}
            value={input.age}
            onChange={(event) => {
              handlerChange(event, setInput, input),
                validation(event, setError);
            }}
          ></input>

          <div>{error.age && <p>{error.age}</p>}</div>
        </div>
        <div className={styles.div}>
          <label>Bio:</label>
          <input
            className={style.input}
            type="text"
            name={"bio"}
            value={input.bio}
            onChange={(event) => {
              handlerChange(event, setInput, input),
                validation(event, setError);
            }}
          ></input>

          <div>{error.bio && <p>{error.bio}</p>}</div>
        </div>
        <div className={styles.div}>
          <label>Image:</label>
          <input
            className={style.input}
            type="file"
            name={"image"}
            value={input.image}
            onChange={(event) => handlerChange(event, setInput, input)}
          ></input>
        </div>
        <div className={styles.div}>
          <label>Email:</label>
          <input
            className={style.input}
            type="text"
            name={"email"}
            value={input.email}
            onChange={(event) => {
              handlerChange(event, setInput, input),
                validation(event, setError);
            }}
          ></input>

          <div>{error.email && <p>{error.email}</p>}</div>
        </div>
        <div className={styles.div}>
          <label>Password:</label>
          <input
            className={style.input}
            type="password"
            name={"password"}
            value={input.password}
            onChange={(event) => {
              handlerChange(event, setInput, input),
                validation(event, setError);
            }}
          ></input>

          <div>{error.password && <p>{error.password}</p>}</div>
        </div>
        <button
          type="submit"
          onClick={(event) =>
            handlerClick(event, input, setResult, setInput, true)
          }
          disabled={validationButton(error, input)}
        >
          Iniciar sesión
        </button>
      </form> 
      <div>
        {result.done && <h3>{result.done}</h3>}
        {result.failed && <h3>{result.failed}</h3>}
      </div>
    </div>
  );
};
