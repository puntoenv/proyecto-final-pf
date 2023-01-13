import React, { useState } from "react";
import Link from "next/link";
import style from "./styles.module.css";
import styles from "./Loading.module.css";
import {
  HiCheck,
  HiPencilSquare,
  HiCamera,
  HiArrowDownOnSquare,
} from "react-icons/hi2";
import { GoX } from "react-icons/go";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "next/router";

export default function Perfil({
  user,
  isLoading,
  response,
  hanldeOnChange,
  handleOnSubmit,
}) {
  console.log(user);
  const router = useRouter()
  const nameUpper =
    response.name && response.name[0].toUpperCase() + response.name.slice(1);
  const imgAux =
    "https://www.pngkit.com/png/detail/128-1280585_user-icon-fa-fa-user-circle.png";

  const idUser = user?.sub.split("|")[1];
  const [input, setInput] = useState({
    name: "",
    age: "",
    bio: "",
    image: "",
    ubication: "",
  });

  const [result, setResult] = useState({
    error: "",
    success: "",
  });

  const [edit, setEdit] = useState({
    name: false,
    age: false,
    bio: false,
    image: false,
    ubication: false,
  });

  const handleAdoption = () => {
    if(!response.name || response.name === ' '){
      Swal.fire({
        title: "Necesitas configurar tu nombre para adoptar",
        icon: "error",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
    } else {
      router.push(`/adoptionForm/${idUser}`)
    }
  }

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
  const { _id } = response;
  return (
    <div className={style.mainContainer}>
      {isLoading && (
        <div className={styles.container}>
          <div className={styles.loader}></div>
          <p>Loading...</p>
        </div>
      )}
      {user && (
        <div>
          <div className={style.infoContainer}>
            <div className={style.thirdContainer}>
              <div>
                <h1 className={style.h1}>Mi perfil </h1>
                <span className={style.email}>{response?.email}</span>
                <p>
                  <div className={style.bioContainer}>
                    <p className={style.p}>Bio: </p>
                    <div className={style.insideInfo}>
                      {!edit.bio ? (
                        response.bio ? (
                          response.bio
                        ) : (
                          "No especificado"
                        )
                      ) : (
                        <form
                          className={style.form}
                          onSubmit={(event) =>
                            handleOnSubmit(
                              event,
                              setResult,
                              setInput,
                              input,
                              idUser
                            )
                          }
                        >
                          <input
                            type="text"
                            placeholder="Breve descripción sobre ti"
                            name="bio"
                            onChange={(event) =>
                              hanldeOnChange(event, setInput, input, setResult)
                            }
                          />
                          <button className={style.iconBio} type="submit">
                            <HiCheck size={20}></HiCheck>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                  <span
                    className={style.icon}
                    onClick={() => {
                      setEdit({ ...edit, bio: !edit.bio }),
                        setInput({ ...input, bio: "" });
                    }}
                  >
                    <HiPencilSquare size={18}></HiPencilSquare>
                  </span>
                </p>
              </div>
              <div className={style.fourthContainer}>
                <img
                  src={response.image ? response.image : imgAux}
                  className={style.image}
                  alt={user.name}
                />

                <span
                  className={style.imageEdit}
                  onClick={() => {
                    setEdit({ ...edit, image: !edit.image });
                  }}
                >
                  <HiCamera className={style.icon} size={30}></HiCamera>
                </span>

                <div>
                  {edit.image ? (
                    <form
                      className={style.formImage}
                      onSubmit={(event) =>
                        handleOnSubmit(
                          event,
                          setResult,
                          setInput,
                          input,
                          idUser,
                          Swal
                        )
                      }
                    >
                      <div className={style.divImage}>
                        <label
                          for="mi_archivo"
                          className={style.mi_archivo}
                          name="image"
                          onChange={(event) => handleFiles(event)}
                        >
                          <HiArrowDownOnSquare size={30}></HiArrowDownOnSquare>
                          Subir imagen
                          <span>
                            <input
                              type="file"
                              className={style.hiddenInput}
                              name="mi_archivo"
                              id="mi_archivo"
                            ></input>
                          </span>
                        </label>
                        <span
                          className={style.imageEdit}
                          onClick={() => {
                            setInput({ ...input, image: "" });
                          }}
                        >
                          <GoX className={style.icon} size={25}></GoX>
                        </span>
                      </div>
                      <span>{input.image && input.image.slice(0, 40)}</span>
                      <button className={style.iconImage} type="submit">
                        Editar imagen
                      </button>
                    </form>
                  ) : (
                    <div className={style.emptyDiv}>
                      <p>Image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={style.div}>
              <div className={style.infoStyles}>
                <p className={style.infoStylesP}>
                  <div className={style.pContainer}>
                    <p className={style.p}>Nombre completo:</p>
                    <div className={style.insideInfo}>
                      {!edit.name ? (
                        nameUpper ? (
                          nameUpper
                        ) : (
                          "No especificado"
                        )
                      ) : (
                        <form
                          className={style.form}
                          onSubmit={(event) =>
                            handleOnSubmit(
                              event,
                              setResult,
                              setInput,
                              input,
                              idUser
                            )
                          }
                        >
                          <input
                            type="text"
                            placeholder="Ej: Pedro"
                            name="name"
                            onChange={(event) =>
                              hanldeOnChange(event, setInput, input, setResult)
                            }
                          />
                          <button className={style.icon} type="submit">
                            <HiCheck size={20}></HiCheck>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                  <span
                    className={style.icon}
                    onClick={() => {
                      setEdit({ ...edit, name: !edit.name }),
                        setInput({ ...input, name: "" });
                    }}
                  >
                    <HiPencilSquare size={18}></HiPencilSquare>
                  </span>
                </p>
                <p className={style.infoStylesP}>
                  <div className={style.pContainer}>
                    <p className={style.p}>Edad: </p>
                    <div className={style.insideInfo}>
                      {!edit.age ? (
                        response.age ? (
                          response.age
                        ) : (
                          "No especificado"
                        )
                      ) : (
                        <form
                          className={style.form}
                          onSubmit={(event) =>
                            handleOnSubmit(
                              event,
                              setResult,
                              setInput,
                              input,
                              idUser
                            )
                          }
                        >
                          <input
                            type="text"
                            placeholder="Ej: 28"
                            name="age"
                            onChange={(event) =>
                              hanldeOnChange(event, setInput, input, setResult)
                            }
                          />
                          <button className={style.icon} type="submit">
                            <HiCheck size={20}></HiCheck>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                  <span
                    className={style.icon}
                    onClick={() => {
                      setEdit({ ...edit, age: !edit.age }),
                        setInput({ ...input, age: "" });
                    }}
                  >
                    <HiPencilSquare size={18}></HiPencilSquare>
                  </span>
                </p>

                <p className={style.infoStylesP}>
                  <div className={style.pContainer}>
                    <p className={style.p}>Provincia: </p>
                    <div className={style.insideInfo}>
                      {!edit.ubication ? (
                        response.ubication ? (
                          response.ubication
                        ) : (
                          "No especificado"
                        )
                      ) : (
                        <form
                          className={style.form}
                          onSubmit={(event) =>
                            handleOnSubmit(
                              event,
                              setResult,
                              setInput,
                              input,
                              idUser
                            )
                          }
                        >
                          <input
                            type="text"
                            placeholder="Ej: Buenos Aires"
                            name="ubication"
                            onChange={(event) =>
                              hanldeOnChange(event, setInput, input, setResult)
                            }
                          />
                          <button className={style.icon} type="submit">
                            <HiCheck size={20}></HiCheck>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                  <span
                    className={style.icon}
                    onClick={() => {
                      setEdit({ ...edit, ubication: !edit.ubication }),
                        setInput({ ...input, ubication: "" });
                    }}
                  >
                    <HiPencilSquare size={18}></HiPencilSquare>
                  </span>
                </p>
              </div>
              <div className={style.buttons}>
                <button className={style.button}>
                  <Link href={"/petsPosts"}>
                    <b>Ver todas las mascotas</b>
                  </Link>
                </button>
                <button
                  className={style.button}
                  onClick={() => handleAdoption()}
                >
                  {/* <Link onClick={()=> handleAdoption()} href={`/adoptionForm/${idUser}`}> */}
                  <b>Postea una adopción</b>
                  {/* </Link> */}
                </button>
                <button className={style.button}>
                  <Link
                    href={{
                      pathname: "/PetsCrea",
                      query: { id: `${_id}` },
                    }}
                  >
                    <b>Animales creados</b>
                  </Link>
                </button>
                {/* <button className={style.button}>
                  <Link href={"/profile"}>
                    <b>Adopta</b>
                  </Link>
                </button> */}
              </div>
            </div>
          </div>
          {/* <h4>{result && {}}</h4> */}
          <div className={style.link}>
            <Link href={"/home"}>
              <b>Página principal</b>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
