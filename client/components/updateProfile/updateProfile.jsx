import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState } from "react";
import style from "./styles.module.css";

export default function UpdateUserProfile({ hanldeOnChange, handleOnSubmit, authUser }) {
  const { user } = useUser();

  const idUser = authUser && authUser._id
  //user?.sub.split("|")[1];
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    age: "",
    bio: "",
    image: "",
    ubication: "",
  });

  const [result, setResult] = useState({
    error: "",
    success: "",
  });
  console.log(input);

  const handleFiles = (event) => {
    const { files } = event.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setInput({
        ...input,
        image: reader.result,
      });
    };
  };

  return (
    <div className={style.mainContainer}>
      <div>
        <Link href={`/profile/${idUser}`}>Volver atrás</Link>
      </div>
      <div>
        <form
          onSubmit={(event) =>
            handleOnSubmit(
              event,
              setResult,
              setInput,
              input,
              idUser,
              Swal,
              setLoader
            )
          }
        >
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Ej: Pedro"
              name="name"
              onChange={(event) =>
                hanldeOnChange(event, setInput, input, setResult)
              }
            />
          </div>
          <div>
            <label>Apellido: </label>
            <input
              type="text"
              placeholder="Ej: Pérez"
              name="lastname"
              onChange={(event) =>
                hanldeOnChange(event, setInput, input, setResult)
              }
            />
          </div>
          <div>
            <label>Edad: </label>
            <input
              type="text"
              placeholder="Ej: 28"
              name="age"
              onChange={(event) =>
                hanldeOnChange(event, setInput, input, setResult)
              }
            />
          </div>
          <div>
            <label>Bio: </label>
            <input
              type="text"
              placeholder="Breve descripción sobre ti"
              name="bio"
              onChange={(event) =>
                hanldeOnChange(event, setInput, input, setResult)
              }
            />
          </div>
          <div>
            <label>Imagen de perfil: </label>
            <input
              type="file"
              name="image"
              onChange={(event) => handleFiles(event)}
            />
          </div>
          <div>
            <label>Ubicación: </label>
            <input
              type="text"
              placeholder="Ej: Buenos Aires"
              name="bio"
              onChange={(event) =>
                hanldeOnChange(event, setInput, input, setResult)
              }
            />
          </div>
          <button type="submit">Editar</button>
        </form>
      </div>
      <div>
        <h4>{result.error ? result.error : result.success}</h4>
      </div>
    </div>
  );
}
