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
import Link from "next/link";

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
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>BRAYAN ANDRES RAMIREZ</h1>
                      <p>Desarrollador Web Full Stack</p>
                      <p className={styles.info1}>Tareas realizadas:</p>
                      <p className={styles.info1}>
                        Borrado lógico, formulario, favoritos, local storage,
                        CCS, puntuación reviews y tareas en general.
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        target={"_blank"}
                        href={"https://github.com/brayanmar"}
                      >
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </a>
                      <a
                        target={"_blank"}
                        href={"www.linkedin.com/in/andres-ramirez-380891263"}
                      >
                        <FaLinkedin size={30}></FaLinkedin>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <div>
                    <Image
                      className={styles.image}
                      src={sara}
                      width={180}
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>SARAHI M. DEL MORO</h1>
                      <p>Desarrolladora Web Full Stack</p>
                      <p className={styles.info1}>Tareas realizadas:</p>
                      <p className={styles.info1}>
                        Deploy, panel de usuario, formularios, chatbot,
                        validaciones, tareas generales.
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a target={"_blank"} href={"https://github.com/saradehi"}>
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </a>
                      <a
                        target={"_blank"}
                        href={
                          "https://www.linkedin.com/in/sarahi-del-moro-902b981a6/"
                        }
                      >
                        <FaLinkedin size={30}></FaLinkedin>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <div>
                    <Image
                      className={styles.image}
                      src={magui}
                      width={180}
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>MAGALÍ A. ROMERO</h1>
                      <p>Desarrolladora Web Full Stack</p>
                      <p className={styles.info1}>Tareas realizadas:</p>
                      <p className={styles.info1}>
                        Panel administrador, Estilos, CSS; Backfront: CRUD,
                        ruteo y manejo de bases de datos.
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        target={"_blank"}
                        href={"https://github.com/maguiromeroa"}
                      >
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </a>
                      <a
                        target={"_blank"}
                        href={
                          "https://www.linkedin.com/in/magal%C3%AD-a-romero-530738162"
                        }
                      >
                        <FaLinkedin size={30}></FaLinkedin>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <div>
                    <Image
                      className={styles.image}
                      src={eze}
                      width={180}
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>EZEQUIEL A. GÓMEZ</h1>
                      <p>Desarrollador Web Full Stack</p>
                      <p className={styles.info1}>Tareas realizadas:</p>
                      <p className={styles.info1}>
                        Backend(CRUD y ruteo), autenticación, rutas de frontend,
                        estilos, formularios y validaciones.
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        target={"_blank"}
                        href={"https://github.com/EzeGomez0407"}
                      >
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </a>
                      <a
                        target={"_blank"}
                        href={"https://www.linkedin.com/in/eze-gomez-merlo/"}
                      >
                        <FaLinkedin size={30}></FaLinkedin>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <div>
                    <Image
                      className={styles.image}
                      src={sebas}
                      width={180}
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>SEBASTIAN PERALTA</h1>
                      <p>Desarrollador Web Full Stack</p>
                      <p className={styles.info1}>Tareas realizadas:</p>
                      <p className={styles.info1}>
                        Backend(CRUD), implementación de inteligencia
                        artificial, subida de imagenes, envíos de email.
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        target={"_blank"}
                        href={"https://github.com/gitperalta"}
                      >
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </a>
                      <a
                        target={"_blank"}
                        href={
                          "https://www.linkedin.com/in/sebastian-peralta-62539a240/"
                        }
                      >
                        <FaLinkedin size={30}></FaLinkedin>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <div>
                    <Image
                      className={styles.image}
                      src={miru}
                      width={180}
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>NOELIA MIRANDA FUERTES</h1>
                      <p>Desarrolladora Web Full Stack</p>
                      <p className={styles.info1}>Tareas realizadas:</p>
                      <p className={styles.info1}>
                        Estilos y posicionamiento en CSS, diseño responsive,
                        rutas de frontend y carruseles.
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        target={"_blank"}
                        href={"https://github.com/mirufuertes21"}
                      >
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </a>
                      <a
                        target={"_blank"}
                        href={
                          "https://www.linkedin.com/in/miranda-noelia-fuertes-1790a023b/"
                        }
                      >
                        <FaLinkedin size={30}></FaLinkedin>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <div>
                    <Image
                      className={styles.image}
                      src={emi}
                      width={180}
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>EMILIANO E. BRITO</h1>
                      <p>Desarrollador Web Full Stack</p>
                      <p className={styles.info1}>Tareas realizadas:</p>
                      <p className={styles.info1}>
                        Páginas de posteo de mascotas, productos, carrito de
                        compras, protección de rutas.
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        target={"_blank"}
                        href={"https://github.com/Emiliano1128"}
                      >
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </a>
                      <a
                        target={"_blank"}
                        href={
                          "https://www.linkedin.com/in/emiliano-brito-92403a1a8"
                        }
                      >
                        <FaLinkedin size={30}></FaLinkedin>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <div>
                    <Image
                      className={styles.image}
                      src={emma}
                      width={180}
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>JESUS EMMANUEL CASTRO</h1>
                      <p>Desarrollador Web Full Stack</p>
                      <p className={styles.info1}>Tareas realizadas:</p>
                      <p className={styles.info1}>
                        Implementación de mercadopago, Backend(CRUD y ruteo),
                        estilos y tareas generales
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        target={"_blank"}
                        href={"https://github.com/Shoretick"}
                      >
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </a>
                      <a
                        target={"_blank"}
                        href={
                          "https://www.linkedin.com/in/jesus-emmanuel-castro/"
                        }
                      >
                        <FaLinkedin size={30}></FaLinkedin>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.divInfo}>
                  <div>
                    <Image
                      className={styles.image}
                      src={isaias}
                      width={180}
                      height={200}
                    ></Image>
                  </div>
                  <div className={styles.indiv}>
                    <div>
                      <h1>ISAIAS GÓMEZ</h1>
                      <p>Mentor</p>

                      <p className={styles.info1}>
                        Apoyo y tutoría en el desarrollo de la aplicación, así
                        como recomendaciones para mejoras.
                      </p>
                    </div>
                    {/* <div className={styles.icons}>
                      <p>
                        <FaGithubSquare size={30}></FaGithubSquare>
                      </p>
                      <p>
                        <FaLinkedin size={30}></FaLinkedin>
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
          {show === "mision" && (
            <div className={styles.divMV}>
              <h1 className={styles.misionVision}>Mision</h1>
              <p>
                Para todos en Little Paws cada vida es importante, por lo tanto
                nuestra misión es ayudar a conseguirles familia y un hogar a las
                mascotas que se encuentran desprotegidas en la calle y
                brindarles una buena vida.
              </p>
            </div>
          )}
          {show === "vision" && (
            <div className={styles.divMV}>
              <h1 className={styles.misionVision}>Vision</h1>
              <p>
                Crear un sentido de responsabilidad en cada persona para que
                entre todos ayudemos a las mascotas y le demos igualdad de
                importancia a cada vida.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
