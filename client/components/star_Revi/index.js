import Review from "../Reviews";
import Punctuation from "../Punctuation";
import { PutReview } from "../../stores/actions"
import { useState } from "react";


function Start_Revi({data, id_User}) {
    const { name, image, price, _id, stock, category, boughtBy, star_reviews } =
    data;
    const { stars, reviews, user_id, coment } = star_reviews;
    const [revi, setrevi] = useState({
        stars: "",
        reviews: "",
      });
      console.log(revi);
    
      const handlerPoint = (e) => {
        e.preventDefault();
        PutReview(revi);
        setrevi({
          stars: "",
          reviews: "",
        });
      };
      // console.log(revi)
      const handlerReviews = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(value)
        setrevi({ ...revi, [name]: value, user_id: id_User, coment: false });
      };
      const handlerError = (e) => {
        e.preventDefault();
        alert("debes comprar un producto");
      };
  return (
    <div>
    <Punctuation state={handlerReviews} revi={revi}/>
    <Review state={handlerReviews} revi={revi}></Review>
    <button onClick={(e) => handlerPoint(e)}>comentar</button>
    </div>
  )
}

export default Start_Revi



/*id_User === user_id ? (
            <Review state={handlerError} revi={revi} />
          ) : (
            <Review state={handlerReviews} revi={revi} />
          )}
          {id_User === user_id ? (
            <button>deshabilitado</button>
          ) : coment === false ? (
            <button>solo puedes hacerlo una vez</button>
          ) : (
            <button onClick={(e) => handlerPoint(e)}>comentar</button>
          )*/

          /*id_User === user_id ? (
              <Point state={handlerError} revi={revi} />
            ) : (
              <Point state={handlerReviews} revi={revi} />
            )*/