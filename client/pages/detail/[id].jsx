import styles from "./detail.module.css";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import Swal from "sweetalert2/dist/sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetsRelated } from "../../stores/actions";
import { authUser } from "../../stores/actions";
import Maps from "../../components/GoogleMap/Maps";
import axios from "axios";
import PetsCard from "../../components/Carousel/petsCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import Slider from "react-slick";

const fn = (user, dispatch, setNumCall) => {
  if (user) {
    const sub = user.sub.split("|");
    if (sub[0] === "google-oauth2") {
      dispatch(
        authUser(`${user.nickname}@gmail.com`, user.name || user.nickname)
      );
    } else {
      dispatch(authUser(user.name, null));
    }
  }
  setNumCall(1);
};

export default function Detail({ data }) {
  const dispatch = useDispatch();
  const { user } = useUser();
  //user?.sub?.split("|").pop();
  const router = useRouter();
  const related = useSelector((state) => state.mascotas.relatedPets);
  
  const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);
  
  const userAuth = useSelector((state) => state.userAuth.userData);
  const userId = userAuth && userAuth._id

  useEffect(() => {
    dispatch(getPetsRelated(data._id));
    console.log(related);
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
    <LayoutGlobal title={data.name.toUpperCase()} authUser={userAuth}>
      <div className={styles.containerAll}>
        {/* //////////////////////////////////// */}
        <div className={styles.containDetail}>
          <div className={styles.button}>
            <Link className={styles.back} href="/petsPosts">
              Volver
            </Link>
          </div>
          <h1 className={styles.namePet}> {data.name.toUpperCase()} </h1>
          <button className={styles.adoptar} onClick={(e) => handlerAdopt(e)}>
            Adoptar
          </button>
          <div className={styles.containCardDetail}>
            <div className={styles.box}>
              <div className={styles.divSlideManual}>
                <GrCaretPrevious
                  className={styles.iconPrev}
                  onClick={handlerPrev}
                  name="Prev"
                />
                <img src={imgS[nImg]} className={styles.image} />
                <GrCaretNext
                  className={styles.iconNext}
                  onClick={handlerNext}
                />
              </div>
              <div className={styles.divLocation}>
                <Maps
                  coords={{ lat: data.location.lat, lng: data.location.lng }}
                ></Maps>
              </div>
            </div>
            {/* ----------------------------------- */}
            <div class={styles.divCharacteristics}>
              <div class={styles.divSize}>
                <b>Tamaño: </b>
                <span className={styles.spanChar}>{data.size}</span>
              </div>

              <div class={styles.divSpecie}>
                <b>Especie: </b>
                <span className={styles.spanChar}>{data.type}</span>
              </div>

              <div class={styles.divCondition}>
                <b>Condición: </b>
                <span className={styles.spanChar}>{data.condition}</span>
              </div>

              <div class={styles.divGender}>
                <b>Genero: </b>
                <span className={styles.spanChar}>{data.gender}</span>
              </div>

              <div class={styles.divAge}>
                <b>Edad: </b>
                <span className={styles.spanChar}>{data.age}</span>
              </div>

              <div class={styles.divSocial}>
                <b>Interacción con otros animales: </b>
                <span className={styles.spanChar}>{data.sociability}</span>
              </div>

              <div class={styles.divHealth}>
                <b>Salud: </b>
                <span className={styles.spanChar}>{data.health}</span>
              </div>

              {data.healthExtra && (
                <div class={styles.divHealthExtra}>
                  <b>Descripción de salud: </b>
                  <span className={styles.spanChar}>{data.healthExtra}</span>
                </div>
              )}
              {data.contactAdoption && (
                <div class={styles.contactUser}>
                  <b>Contacto: </b>
                  <span className={styles.spanChar}>
                    {data.contactAdoption}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.divDescription}>
            <h3 className={styles.titleDescription}>Descripición</h3>
            <p className={styles.description}>{data.description}</p>
          </div>
          <div className={styles.divDate}>
            <span>Fecha de Publicación: {data.expireAt.split("T")[0]}</span>
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
                              `${process.env.NEXT_PUBLIC_URL_BACK}updatePet/report/` +
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
        </div>
        {related.length > 0 && (
          <h1 className={styles.titleRelated}> Mascotas Relacionados </h1>
        )}
        <div className={styles.contentSlidePets}>
          {related.length > 2 ? (
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
          ) : (
            related.map((mascota) => (
              <PetsCard
                key={mascota._id}
                nombre={mascota.name}
                imagen={mascota.image}
                genero={mascota.gender}
                tamano={mascota.size}
                id={mascota._id}
              />
            ))
          )}
        </div>
      </div>
    </LayoutGlobal>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}pets/detail/${params.id}`)
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
