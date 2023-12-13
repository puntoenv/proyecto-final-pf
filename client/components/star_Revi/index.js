import Review from "../Reviews";
import Stars from "../StarsReview";
import { PutReview } from "../../stores/actions";
import { useState } from "react";
import styles from "./styles.module.css";
import Comments from "./comments";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Router from "next/router";

function Start_Revi({ data, id_User, response }) {
  const { _id, boughtBy, star_reviews } = data;

  const stars = star_reviews.reduce((a, b) => {
    return (a += b.stars);
  }, 0);

  const [revi, setrevi] = useState({
    stars: "",
    reviews: "",
  });

  const handlerPoint = (e) => {
    e.preventDefault();
    PutReview(revi, _id);
    Swal.fire({
      title: "Gracias por tu comentario.",
      icon: "success",
      color: "#437042",
      confirmButtonColor: "#437042",
      confirmButtonAriaLabel: "#437042",
    });
    setrevi({
      stars: "",
      reviews: "",
    });
    // Router.reload(window.location.pathname);
  };

  const handlerReviews = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setrevi({ ...revi, [name]: value, user_id: id_User });
    console.log(revi);
  };
  const handlerError = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Debes comprar un producto",
      icon: "error ",
      color: "#437042",
      confirmButtonColor: "#437042",
      confirmButtonAriaLabel: "#437042",
    });
    setrevi({
      stars: "",
      reviews: "",
    });
  };
  const compra = boughtBy.some((items) => items._id === id_User); // true es por que compro el producto
  const iews = star_reviews.some((item) => item.user === id_User); //false es por que no a comentado el producto

  const boton =
    revi.stars === "" && revi.reviews === "" ? (
      <button
        className={styles.btn}
        onClick={(e) => {
          Swal.fire({
            title: "Espacios no completados",
            icon: "error ",
            color: "#437042",
            confirmButtonColor: "#437042",
            confirmButtonAriaLabel: "#437042",
          });
        }}
      >
        comentar
      </button>
    ) : compra === true ? (
      iews === false ? (
        <button className={styles.btn} onClick={(e) => handlerPoint(e)}>
          comentar
        </button>
      ) : (
        <button
          className={styles.btn}
          onClick={(e) => {
            Swal.fire({
              title: "Ya ha comentado sonre este producto",
              icon: "error ",
              color: "#437042",
              confirmButtonColor: "#437042",
              confirmButtonAriaLabel: "#437042",
            });
            setrevi({
              stars: "",
              reviews: "",
            });
          }}
        >
          comentar
        </button>
      )
    ) : (
      <button className={styles.btn} onClick={(e) => handlerError(e)}>
        comentar
      </button>
    );

  return (
    <div>
      <Stars state={handlerReviews} stars={stars / star_reviews.length} />
      <Comments star_reviews={star_reviews} />
      <div className={styles.contentReviewSend}>
        <Review state={handlerReviews} revi={revi}></Review>
        {boton}
      </div>
    </div>
  );
}

export default Start_Revi;
