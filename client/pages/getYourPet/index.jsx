"use client";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2/dist/sweetalert2";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import Layout from "../layout";
import styles from "./styles.module.css";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function getYourPet({ pet, user }) {
  const router = useRouter();
  const [boolean, setBoolean] = useState(true);
  const [input, setInput] = useState({});
  const [page, setPage] = useState(1);
  const [petImage, setImage] = useState(pet.image[0]);
  const [x, setX] = useState("center");
  const [y, setY] = useState("center");
  console.log(pet);

  function disabled(input) {
    if (
      input.apto === "si" &&
      input.salud === "no" &&
      input.edad === "si" &&
      input.relacion === "no"
    )
      return setBoolean(false);
    return setBoolean(true);
  }

  const handlerSelectImage = (e) => {
    e.preventDefault();
  };

  const handlerContainerImage = (e) => {
    setX(e.clientX - e.target.offsetLeft);
    setY(e.clientY - e.target.offsetTop);
    return (_) => {
      setX("center");
      setY("center");
    };
  };

  const handlerOnPaging = (e) => {
    e.preventDefault();
    page === 1 ? setPage(2) : setPage(1);
  };

  const handlerForm = (e) => {
    // e.preventDefault();
    let { name, value } = e.target;
    input[name] = value;
    disabled(input);
    console.log(input);
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¡Felicidades! Se realizo la adopción.",
      icon: "success",
      color: "#437042",
      confirmButtonColor: "#437042",
      confirmButtonAriaLabel: "#437042",
    });
    router.push("/home");
  };

  return (
    <div className={styles.page}>
      <LayoutGlobal>
        <Layout title="Adopción" />
        <div className={styles.container}>
          <div className={styles.imagesContainer}>
            <div className={styles.petName}>{pet?.name?.toUpperCase()}</div>
            <div
              className={styles.divImage}
              onMouseMove={(e) => handlerContainerImage(e)}
            >
              <Image
                style={{
                  transformOrigin: `${x}px ${y}px`,
                }}
                className={styles.image}
                src={petImage}
                alt="petImage"
                width={500}
                height={500}
              />
            </div>
            <div className={styles.images}>
              <Image
                src={pet.image}
                width={1000}
                height={1000}
                className={styles.imgs}
                onClick={(e) => handlerSelectImage(e)}
              />
              <Image
                src={pet.image}
                width={1000}
                height={1000}
                className={styles.imgs}
                onClick={(e) => handlerSelectImage(e)}
              />
              <Image
                src={pet.image}
                width={1000}
                height={1000}
                className={styles.imgs}
                onClick={(e) => handlerSelectImage(e)}
              />
            </div>
          </div>
          {page === 1 ? (
            <div className={styles.form}>
              <div>
                <h1>Enhorabuena {capitalize(user.name) || user.email}</h1>
                <p className={styles.p}>
                  Tu familia está a punto de crecer. Estamos muy felices de que
                  te hayas interesado en adoptar a {capitalize(pet.name)}. Cada
                  vez son mas las personas que desean darle un hogar a nuestras
                  Little Paws.
                </p>
              </div>
              <Image
                src="https://res.cloudinary.com/dibwxnomi/image/upload/v1673708954/imagenes/Logo_marro%CC%81n.png_ehcsx9.png"
                width={150}
                height={150}
              />
              <p className={styles.p}>
                Acontinuación deberas llenar un pequeño formulario para saber si
                eres apto para {capitalize(pet.name)}.
              </p>
              <div className={styles.btns}>
                <Link href={`/detail/${pet._id}`} className={styles.back}>
                  <button>Volver</button>
                </Link>
                <button
                  className={styles.next}
                  onClick={(e) => handlerOnPaging(e)}
                >
                  Siguiente<IoIosArrowForward size={30}></IoIosArrowForward>
                </button>
              </div>
            </div>
          ) : (
            <form
              className={styles.form}
              onChange={(e) => handlerForm(e)}
              onSubmit={(e) => handlerOnSubmit(e)}
            >
              <div>
                <p className={styles.p}>
                  ¿Te consideras apto para adoptar a {capitalize(pet.name)}?
                </p>
                <div className={styles.options}>
                  <label>
                    <input name="apto" type="radio" value="si" />
                    Si
                  </label>
                  <label>
                    <input name="apto" type="radio" value="no" />
                    No
                  </label>
                </div>
              </div>
              <div>
                <p className={styles.p}>
                  ¿Teniendo en cuenta que {capitalize(pet.name)} tiene {pet.age}{" "}
                  de edad consideras que podras cuidar de{" "}
                  {pet.gender === "hembra" ? "ella" : "el"} el tiempo que le
                  quede de vida?
                </p>
                <div className={styles.options}>
                  <label>
                    <input name="edad" type="radio" value="si" />
                    Si
                  </label>
                  <label>
                    <input name="edad" type="radio" value="no" />
                    No
                  </label>
                </div>
              </div>
              <div>
                <p className={styles.p}>
                  Despues de visualizar la informacion detallada de{" "}
                  {capitalize(pet.name)} ¿Crees que podrias tener dificultades
                  con la salud de tu nueva mascota?
                </p>
                <div className={styles.options}>
                  <label>
                    <input name="salud" type="radio" value="si" />
                    Si
                  </label>
                  <label>
                    <input name="salud" type="radio" value="no" />
                    No
                  </label>
                </div>
              </div>
              <div>
                <p className={styles.p}>
                  ¿Consideras que la {pet.sociability} relación de{" "}
                  {capitalize(pet.name)} con las otras mascotas se volvera un
                  problema para ti?
                </p>
                <div className={styles.options}>
                  <label>
                    <input name="relacion" type="radio" value="si" />
                    Si
                  </label>
                  <label>
                    <input name="relacion" type="radio" value="no" />
                    No
                  </label>
                </div>
              </div>
              <div className={styles.btns}>
                <button
                  className={styles.prev}
                  onClick={(e) => handlerOnPaging(e)}
                >
                  <IoIosArrowBack size={30}></IoIosArrowBack>Anterior
                </button>
                <input
                  type="submit"
                  disabled={boolean}
                  className={styles.adopt}
                  value="Adoptar"
                />
              </div>
            </form>
          )}
        </div>
      </LayoutGlobal>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const pet = await axios
      .get(`/pets/detail/${query.pet}`)
      .then((response) => response.data);
    const user = await axios
      .get(`/user/${query.user}`)
      .then((response) => response.data);

    return { props: { pet, user } };
  } catch (err) {
    return console.log(err);
  }
}
