import styles from "./styles.module.css";
import Stars from "../../StarsReview/index";

function Comments({ star_reviews }) {
  return (
    <div className={styles.container}>
      <h4 className={styles.h4}>Comentarios</h4>
      {star_reviews?.map((ite) => {
        return (
          <div className={styles.containerComments}>
            <Stars sizeStar={18} stars={ite.stars} />
            <p className={styles.frase}>{ite.reviews}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
