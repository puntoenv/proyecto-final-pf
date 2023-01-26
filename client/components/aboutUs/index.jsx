import { useState } from "react";
import styles from "./styles.module.css";
import sara from "../../img/members/sara.jpg";
import andres from "../../img/members/andres.jpg";
import magui from "../../img/members/magui.jpg";
import emi from "../../img/members/emi.jpg";
import eze from "../../img/members/eze.jpg";
import sebas from "../../img/members/sebas.jpg";
import miru from "../../img/members/miru.jpg";
import emma from "../../img/members/emma.jpg";
import isaias from "../../img/members/isaias.jpg";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

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
                  <div>
                    <Image
                      className={styles.image}
                      src={andres}
                      width={180}
                      height={180}
                    ></Image>
                  </div>
                  <div>
                    <h1>BRAYAN ANDRES RAMIREZ</h1>
                    <p>Desarrollador Web Full Stack</p>
                    <div className={styles.icons}>
                      <p>
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </p>
                      <p>
                        <FaLinkedin size={30}></FaLinkedin>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <Image
                    className={styles.image}
                    src={sara}
                    width={180}
                    height={180}
                  ></Image>
                  <div>
                    <h1>SARAHI M. DEL MORO</h1>
                    <p>Desarrolladora Web Full Stack</p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <Image
                    className={styles.image}
                    src={magui}
                    width={180}
                    height={180}
                  ></Image>
                  <div>
                    <h1>MAGALÍ A. ROMERO</h1>
                    <p>Desarrolladora Web Full Stack</p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <Image
                    className={styles.image}
                    src={eze}
                    width={180}
                    height={180}
                  ></Image>
                  <div>
                    <h1>EZEQUIEL A. GÓMEZ</h1>
                    <p>Desarrollador Web Full Stack</p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <Image
                    className={styles.image}
                    src={sebas}
                    width={180}
                    height={180}
                  ></Image>
                  <div>
                    <h1>SEBASTIAN PERALTA</h1>
                    <p>Desarrollador Web Full Stack</p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <Image
                    className={styles.image}
                    src={miru}
                    width={180}
                    height={180}
                  ></Image>
                  <div>
                    <h1>NOELIA MIRANDA FUERTES</h1>
                    <p>Desarrolladora Web Full Stack</p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <Image
                    className={styles.image}
                    src={emi}
                    width={180}
                    height={180}
                  ></Image>
                  <div>
                    <h1>EMILIANO E. BRITO</h1>
                    <p>Desarrollador Web Full Stack</p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <Image
                    className={styles.image}
                    src={emma}
                    width={180}
                    height={180}
                  ></Image>
                  <div>
                    <h1>JESUS EMMANUEL CASTRO</h1>
                    <p>Desarrollador Web Full Stack</p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <Image
                    className={styles.image}
                    src={isaias}
                    width={180}
                    height={180}
                  ></Image>
                  <div>
                    <h1>ISAIAS GÓMEZ</h1>
                    <p>Mentor</p>
                  </div>
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
