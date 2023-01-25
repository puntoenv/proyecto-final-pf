import { useState } from "react";
import styles from "./styles.module.css";

const About = () => {
  const [show, setShow] = useState("nosotros");

  return (
    <div className={styles.mainContainer}>
      <h1></h1>
      <div className={styles.containerInfo}>
        <div className={styles.divSticky}>
          <ul className={styles.menu}>
            <li
              onClick={() => setShow("nosotros")}
              style={{
                borderBottom:
                  show === "nosotros" ? "2px solid rgb(61, 46, 37)" : "none",
                cursor: "pointer",
              }}
            >
              Nosotros
            </li>
            <li
              onClick={() => setShow("mision")}
              style={{
                borderBottom:
                  show === "mision" ? "2px solid rgb(61, 46, 37)" : "none",
                cursor: "pointer",
              }}
            >
              Misión
            </li>
            <li
              onClick={() => setShow("vision")}
              style={{
                borderBottom:
                  show === "vision" ? "2px solid rgb(61, 46, 37)" : "none",
                cursor: "pointer",
              }}
            >
              Visión
            </li>
          </ul>
        </div>
        <div className={styles.usInfo}>
          {show === "nosotros" && (
            <div>
              <div>
                <div className={styles.divInfo}>
                  <img></img>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <img></img>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <img></img>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <img></img>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <img></img>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <img></img>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <img></img>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <img></img>
                </div>
              </div>
            </div>
          )}
          {show === "mision" && (
            <div>
              <h1>Mision</h1>
            </div>
          )}
          {show === "vision" && (
            <div>
              <h1>Vision</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
