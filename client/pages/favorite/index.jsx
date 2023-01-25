import Link from "next/link";
import styles from "./styles.module.css";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { authUser } from "../../stores/actions";
import { useRouter } from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const fn = (user, dispatch, setNumCall) => {
  if (user) {
    const sub = user.sub.split("|");
    if (sub[0] === "google-oauth2") {
      dispatch(
        authUser(`${user.nickname}@gmail.com`, user.name || user.nickname)
      );
    } else {
      dispatch(authUser(user.name, null));
    }
  }
  setNumCall(1);
};

function index({ favorite, DeletFavori }) {
  const { user } = useUser();
  const dispatch = useDispatch();

  const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);

  const userAuth = useSelector((state) => state.userAuth.userData);

  const userId = userAuth && userAuth._id;
  const router = useRouter();
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
