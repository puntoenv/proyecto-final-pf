import styles from "./pets.module.css";
import Link from "next/link";
import Image from "next/image";
import { PutPets } from "../../../../stores/actions";
import Router from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import HistoryVacio from "../../../CompoRelle";
import { useState } from "react";
import EditProfile from "./editPet";

function Petscrea({ response }) {
  const { pets } = response;
  console.log(response);
  const petsAdop = pets?.filter(
    (items) => items.adopted && items.hidden === true
  );
  const petsHidden = pets?.filter((items) => items.hidden !== true);
  const filtros = petsAdop.concat(petsHidden);

  const [pet, setPet] = useState();

  const [edit, setEdit] = useState();
  const [input, setInput] = useState();

  const handleClick = (id, obj) => {
    PutPets(id, obj);
    setTimeout(() => {
      return Router.reload(window.location.pathname);
    }, 2000);
  };

  const handleClickAdopt = (mascota, response) => {
    Swal.fire({
      title: "¿Cuál es el estado de la adopción",
      input: "radio",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cambiar estado",
      inputOptions: inputOptions,
    }).then((res) => {
      if (res.isConfirmed === true && res.value !== null) {
        if (res.value !== mascota.adopted.status) {
          PutPets(mascota._id, {
            updateAdopted: res.value,
            userId: response._id,
          });
        } else {
           Swal.fire({
             title: "Ya está asignado este estado",
             icon: "error",
             confirmButtonColor: "#3085d6",
           });
        }
      }
    });
  }
  const inputOptions = new Promise((resolve) => {
    // setTimeout(() => {
    resolve({
      pending: "Pendiente",
      rejected: "Rechazada",
      resolved: "Resuelta",
    });
    // }, 1000);
  });
  const handlerClickEdit = () => {
    const dash = document.getElementById("editPet");

    if (dash.className.includes("showEditPet")) {
      dash.classList.remove("showEditPet");
      return;
    }
    dash.className += " showEditPet";
  };
  return (
    <div className={styles.container_animal}>
      <div className={styles.container_post}>
        <h2 className={styles.letra}>Tus publicaciones</h2>
        {filtros.length === 0 ? (
          <div className={styles.letra}>
            <HistoryVacio />
          </div>
        ) : (
          filtros?.map((mascota) => {
            return (
              <div key={mascota._id} className={styles.card}>
                <div>
                  {mascota.report && <p className={styles.report}>Reportada</p>}
                  <img
                    className={styles.img}
                    src={mascota.image[0]}
                    width="200px"
                    height="150px"
                    alt="image"
                  />
                  {mascota.adopted && (
                    <div
                      // style={{ backgroundColor: "#e27a2" }}
                      className={styles.adopt}
                    >
                      <p>
                        Adopción:{" "}
                        {mascota.adopted.status === "pending"
                          ? "Pendiente"
                          : mascota.adopted.status === "resolved"
                          ? "Resuelta"
                          : mascota.adopted.status === "rejected" &&
                            "Rechazada"}
                      </p>
                      <span
                        onClick={() => handleClickAdopt(mascota, response)}
                        className={styles.changeStatusAdopt}
                      >
                        Cambiar
                      </span>
                    </div>
                  )}
                </div>
                <h1 className={styles.name}>{mascota.name}</h1>
                <h2 className={styles.size}>{mascota.gender}</h2>
                <Link href={`/detail/${mascota._id}`}>
                  <button className={styles.btn}>Ver detalle</button>
                </Link>

                <div>
                  <button
                    className={styles.btn}
                    type="button"
                    onClick={() => {
                      handlerClickEdit(),
                        setPet(mascota),
                        setInput({
                          image: mascota.image,
                          size: mascota.size,
                          gender: mascota.gender,
                          health: mascota.health,
                          condition: mascota.condition,
                          sociability: mascota.sociability,
                        });
                    }}
                  >
                    Editar publicación
                  </button>
                </div>

                <button
                  className={styles.delet}
                  onClick={(e) =>
                    Swal.fire({
                      title: "¿Seguro que deseas continuar?",
                      text: "No podrás deshacer este paso...",
                      type: "warning",
                      showCancelButton: true,
                      cancelButtonText: "Mmm... mejor no",
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: "¡Adelante!",
                      closeOnConfirm: false,
                    }).then((res) =>
                      res.isConfirmed === false
                        ? console.log("clicked cancel")
                        : handleClick(mascota._id, { hidden: "hide" })
                    )
                  }
                >
                  x
                </button>
              </div>
            );
          })
        )}{" "}
        <div id="editPet" className="containerEditPet">
          <EditProfile
            className="containerEditPet"
            handlerClickEdit={handlerClickEdit}
            setEdit={setEdit}
            pet={pet}
            input={input}
            setInput={setInput}
          ></EditProfile>
        </div>
        {/* {edit && <EditProfile setEdit={setEdit}></EditProfile>} */}
      </div>
    </div>
  );
}
/*handleClick(mascota._id, { hidden: true },mascota.user)*/
export default Petscrea;
export async function getServerSideProps({ params }) {
  try {
    const response = await (
      await fetch(`${process.env.URL_BACK}user/${params.id}`)
    ).json();
    return {
      props: {
        response,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
