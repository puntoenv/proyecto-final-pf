import Review from "../Reviews";
import Punctuation from "../Punctuation";
import { PutReview } from "../../stores/actions";
import { useState } from "react";
import styles from "./styles.module.css";
import Comments from "./comments";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Start_Revi({ data, id_User }) {
  const { name, image, price, _id, stock, category, boughtBy, star_reviews } =
    data;

  const [revi, setrevi] = useState({
    stars: "",
    reviews: "",
  });
  console.log(revi);

  const handlerPoint = (e) => {
    e.preventDefault();
    PutReview(revi, _id);
    setrevi({
      stars: "",
      reviews: "",
    });
  };

  const handlerReviews = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setrevi({ ...revi, [name]: value, user_id: id_User });
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
    compra === true ? (
      iews === false ? (
        <button className={styles.btn} onClick={(e) => handlerPoint(e)}>
          comentar
        </button>
      ) : (
        <button
          className={styles.btn}
          onClick={(e) => {
            Swal.fire({
              title: "Ups, ya lo comento.",
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
      <Punctuation state={handlerReviews} revi={revi} />
      <Review state={handlerReviews} revi={revi}></Review>
      {boton}
      <Comments star_reviews={star_reviews} />
    </div>
  );
}

export default Start_Revi;


