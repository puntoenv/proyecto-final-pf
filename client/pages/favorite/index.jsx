import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function index({ favorite, DeletFavori }) {
  const { user } = useUser();
  const userId = user?.sub?.split("|").pop();
  const router = useRouter();
  console.log(favorite);
  const dupli = Array.from(new Set(favorite));

  const handleClick = (e) => {
    let petId = favorite[e.target.value]._id;
    e.preventDefault();
    if (user) {
      router.push(`/getYourPet/?pet=${petId}&user=${userId}`);
    } else {
      Swal.fire({
        title: "Necesitas registrarte para realizar alguna adopción.",
        icon: "error ",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
    }
    console.log("soy el formulario");
  };

  return (
    <LayoutGlobal>
      <div className={styles.cards}>
        {!dupli.length ? (
          <h1 className={styles.favoritoVacio}>la lista esta vacia</h1>
        ) : (
          dupli?.map((items, index) => (
            <div className={styles.card}>
              <img
                className={styles.card__image}
                src={items.image[0]}
                alt="imagen de la mascota"
              />
              <button
                className={styles.delet}
                onClick={() => DeletFavori(items._id)}
              >
                x
              </button>
              <div className={styles.card__overlay}>
                <div className={styles.card__header}>
                  <Link href={`/detail/${items._id}`}>
                    <h3 className={styles.card__title}>
                      {items.name.toUpperCase()}
                    </h3>
                  </Link>
                  {items.gender ? (
                    <p className={styles.card__status}>{items.gender}</p>
                  ) : null}
                </div>
                <h3 className={styles.card__description}>
                  {items.description}
                </h3>
                <button
                  className={styles.btn}
                  value={index}
                  onClick={(e) => handleClick(e)}
                >
                  Adoptar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </LayoutGlobal>
  );
}

export default index;
