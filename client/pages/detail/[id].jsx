import styles from "./detail.module.css";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import Layout from "../layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import Swal from "sweetalert2/dist/sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetsRelated } from "../../stores/actions";
import Maps from "../../components/GoogleMap/Maps";
import axios from "axios";
import Slider from "react-slick";
import PetsCard from "../../components/Carousel/petsCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Detail({ data }) {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userId = user?.sub?.split("|").pop();
  const router = useRouter();
  const related = useSelector((state) => state.mascotas.relatedPets);
  useEffect(() => {
    dispatch(getPetsRelated(data._id));
  }, []);
  console.log(data.expireAt.split("T")[0]);
  const [nImg, setNImg] = useState(0);
  const imgS = data.image;

  const handlerAdopt = (e) => {
    e.preventDefault();
    if (user) {
      router.push(`/getYourPet/?pet=${data._id}&user=${userId}`);
    } else {
      Swal.fire({
        title: "Necesitas registrarte para realizar alguna adopción.",
        icon: "error ",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
    }
  };

  const handlerNext = () => {
    if (nImg < imgS.length - 1) {
      setNImg((n) => (n = n + 1));
    }
  };
  const handlerPrev = (e) => {
    if (nImg > 0) {
      setNImg((n) => (n = n - 1));
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1700,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <LayoutGlobal title={data.name.toUpperCase()}>
      <div className={styles.containerAll}>
        <div className={styles.containDetail}>
          <div className={styles.button}>
            <Link className={styles.back} href="/petsPosts">
              Volver
            </Link>
          </div>
          <h1 className={styles.namePet}> {data.name.toUpperCase()} </h1>
          <div className={styles.containCardDetail}>
            {/* <img
            className={styles.image}
            src={data.image}
            alt="Imagen de la mascota"
          /> */}
            <div className={styles.main}>
              <div className={styles.box}>
                <button
                  className={styles.adoptar}
                  onClick={(e) => handlerAdopt(e)}
                >
                  Adoptar
                </button>
                {data.image.map((ele) => (
                  <img
                    className={styles.image}
                    src={ele}
                    alt="Imagen de la mascota"
                  />
                ))}
              </div>
              <div className={styles.divLocation}>
                <Maps
                  coords={{ lat: data.location.lat, lng: data.location.lng }}
                ></Maps>
              </div>
            </div>
            <div className={styles.divDescription}>
              <h3 className={styles.titleDescription}>Descripición</h3>
              <p className={styles.description}>{data.description}</p>
            </div>
            <div class={styles.divCharacteristics}>
              <div class={styles.divSize}>
                <b>Tamaño: </b>
                <span>{data.size}</span>
              </div>

              <div class={styles.divSpecie}>
                <b>Especie: </b>
                <span>{data.type}</span>
              </div>

              <div class={styles.divCondition}>
                <b>Condición: </b>
                <span>{data.condition}</span>
              </div>

              <div class={styles.divGender}>
                <b>Genero: </b>
                <span>{data.gender}</span>
              </div>

              <div class={styles.divAge}>
                <b>Edad: </b>
                <span>{data.age}</span>
              </div>

              <div class={styles.divSocial}>
                <b>Interacción con otros animales: </b>
                <span>{data.sociability}</span>
              </div>

              <div class={styles.divHealth}>
                <b>Salud: </b>
                <span>{data.health}</span>
              </div>

              {data.healthExtra && (
                <div class={styles.divHealthExtra}>
                  <b>Descripción de salud: </b>
                  <span>{data.healthExtra}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.buttonReport}>
            <button
              className={styles.back}
              onClick={async () => {
                user
                  ? Swal.fire({
                      title: "¿Por qué denuncias este post?",
                      text: "Revisaremos cuidadosamente cada caso. Por favor, describe entre 15 y 100 carácteres.",
                      input: "text",
                      showCancelButton: true,
                    })
                      .then(async (result) => {
                        if (result.isConfirmed) {
                          if (result.value) {
                            let report = { motiveReport: result.value };
                            return [result, report];
                          }
                        }
                      })
                      .then(async (response) => {
                        try {
                          if (response) {
                            let res = await axios.put(
                              "https://proyecto-final-pf-production.up.railway.app/updatePet/report/" +
                                data._id,
                              response[1]
                            );
                            return res;
                          }
                        } catch (error) {
                          return { error: error };
                        }
                      })
                      .then((response) => {
                        if (response) {
                          response.error
                            ? Swal.fire({
                                title: response.error.response.data,
                                icon: "error",
                                color: "#437042",
                                confirmButtonColor: "#437042",
                                confirmButtonAriaLabel: "#437042",
                              })
                            : Swal.fire({
                                title: "Reporte enviado con éxito.",
                                text: "Estaremos revisando el post en poco tiempo",
                                icon: "success",
                                color: "#437042",
                                confirmButtonColor: "#437042",
                                confirmButtonAriaLabel: "#437042",
                              });
                        }
                      })
                  : Swal.fire({
                      title: "Necesitas registrarte para denunciar",
                      icon: "error",
                      color: "#437042",
                      confirmButtonColor: "#437042",
                      confirmButtonAriaLabel: "#437042",
                    });
              }}
              type="button"
            >
              Denunciar
            </button>
          </div>
          <div className={styles.containSlider}>
            <Slider {...settings} className="arrowsSlides">
              {related.slice(0, 9).map((mascota) => (
                <PetsCard
                  key={mascota._id}
                  nombre={mascota.name}
                  imagen={mascota.image}
                  genero={mascota.gender}
                  tamano={mascota.size}
                  id={mascota._id}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </LayoutGlobal>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch(`${process.env.URL_BACK}pets/detail/${params.id}`)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
