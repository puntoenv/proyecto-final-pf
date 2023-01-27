import { useState } from "react";
import styles from "./styles.module.css";
import { GoStar } from "react-icons/go";
import { IoIosStarOutline } from "react-icons/io";

function index({ state, stars, input, sizeStar }) {
  const avgStars = [];
  for (let i = 1; i <= stars; i++) {
    avgStars.push(i);
  }

  const fillStars = (n) => {
    if (n < 1) return false;
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  };

  const selectStar = (e) => {
    e.preventDefault();
    const value = e.target.value;

    const arr = [1, 2, 3, 4, 5];
    const deSelect = arr.filter((i) => i !== value);

    deSelect.forEach((element) => {
      document.getElementById(element).style.color = "#aaa";
    });

    const star = document.getElementById(value);
    star.style.color = "rgb(64, 167, 122)";
    console.log(star);
  };

  return (
    <>
      {!input ? (
        <div className={styles.contentStars}>
          {avgStars.map((a) => (
            <GoStar
              key={a}
              className={styles.iconStar}
              style={{ fontSize: sizeStar || "32px" }}
            />
          ))}
          {fillStars(5 - stars) &&
            fillStars(5 - stars).map((a) => (
              <IoIosStarOutline
                key={a}
                className={styles.iconStarEmpty}
                style={{ fontSize: sizeStar || "32px" }}
              />
            ))}
        </div>
      ) : (
        <form className={styles.fromRating}>
          {fillStars(5).map((str) => (
            <label>
              <input
                type="radio"
                value={str}
                onClick={(e) => {
                  state(e);
                  selectStar(e);
                }}
                name="stars"
              />
              <IoIosStarOutline
                className={styles.iconStarForm}
                id={str}
                key={str}
              />
            </label>
          ))}
        </form>
      )}
    </>
  );
}

export default index;

{
  /* <label>
            <input
              type="radio"
              name="stars"
              value="1"
              onClick={(e) => state(e)}
            />
            <span className={styles.icon}>★</span>
          </label>
          <label>
            <input
              type="radio"
              name="stars"
              value="2"
              onClick={(e) => state(e)}
            />
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
          </label>
          <label>
            <input
              type="radio"
              name="stars"
              value="3"
              onClick={(e) => state(e)}
            />
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
          </label>
          <label>
            <input
              type="radio"
              name="stars"
              value="4"
              onClick={(e) => state(e)}
            />
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
          </label>
          <label>
            <input
              type="radio"
              name="stars"
              value="5"
              onClick={(e) => state(e)}
            />
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
            <span className={styles.icon}>★</span>
          </label> */
}
