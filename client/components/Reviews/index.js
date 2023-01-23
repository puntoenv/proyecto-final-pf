import styles from "./style.module.css";

function Review({ state, revi }) {
  return (
    <div>
      <textarea
        className={styles.container}
        name="reviews"
        type="text"
        onChange={(e) => state(e)}
        value={revi.reviews}
      ></textarea>
    </div>
  );
}

export default Review;
