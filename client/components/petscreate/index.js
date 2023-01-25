import styles from "./pets.module.css";
import Link from "next/link";
import Image from "next/image";
// import { PutPets } from "../../stores/actions";
import { PutPets } from "../../stores/actions";
import Router from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Petscrea({ response }) {
  const { pets } = response;
  console.log(pets);
  const filtro = pets?.filter((items) => items.hidden !== true);
  console.log(filtro);

  const handleClick = (id, obj) => {
    PutPets(id, obj);
    Router.reload(window.location.pathname);
  };
  return (
    <div>
      <div className={styles.container_animal}>
        <h2 className={styles.letra}>Tus publicaciones</h2>
        <div className={styles.container_post}>
          {!filtro ? (
            <h1 className={styles.letra}>No hay historial de creaciones</h1>
          ) : (
            filtro?.map((mascota) => {
              return (
                <div key={mascota._id} className={styles.card}>
                  <img
                    className={styles.img}
                    src={mascota.image[0]}
                    width="200px"
                    height="150px"
                    alt="image"
                  />
                  <h1 className={styles.name}>{mascota.name}</h1>
                  <h2 className={styles.size}>{mascota.gender}</h2>
                  <button className={styles.btn}>
                    <Link href={`/detail/${mascota._id}`}>Ver detalle</Link>
                  </button>
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
                          : handleClick(mascota._id, { hidden: true })
                      )
                    }
                  >
                    x
                  </button>
                </div>
              );
            })
          )}
        </div>
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
