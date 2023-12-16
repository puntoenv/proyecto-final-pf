import s from "./style.module.css";
import Stars from "../StarsReview/index";

function Review({ state, revi }) {
  return (
    <div className={s.contentReview}>
      <textarea
        className={s.textArea}
        name="reviews"
        type="text"
        placeholder="Deja tu opinion sobre el producto y puntualo"
        onChange={(e) => state(e)}
        value={revi.reviews}
      />
      <Stars input={true} state={state} />
    </div>
  );
}

export default Review;
