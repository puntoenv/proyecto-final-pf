import styles from "./style.module.css";

function Review({ state, revi }) {
  return (
    <div>
      <textarea
        name="reviews"
        type="text"
        onChange={(e) => state(e)}
        value={revi.reviews}
      ></textarea>
    </div>
  );
}

export default Review;
