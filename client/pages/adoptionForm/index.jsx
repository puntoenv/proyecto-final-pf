import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getper, getmuni, PostAdop } from "../../stores/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../layout";
import NavBar from "../../components/NavBar/NavBar";

export default function form() {
  const router = useRouter();
  const dispatch = useDispatch();
  const provi = useSelector((state) => state.caracter.provi.provincias);
  const munici = useSelector((state) => state.caracter.municipios.municipios);
  const [errors, setError] = useState({});
  const [post, setPost] = useState({});
  const validation = (e) => {
    let { value, name } = e.target;
    if (name === "name") {
      errors.name =
        !value ||
        value.length > 150 ||
        !value.match("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$") ||
        !/([A-Z])\w+/g.test(value)
          ? "Se requiere un nombre empiece con mayuscula que solo contenga letras tenga mas de 3 caracteres y no mas de 150."
          : null;
    } else if (name === "size") {
      errors.size = !value
        ? "Se requiere que se brinde el tamaño de la mascota."
        : null;
    } else if (name === "description") {
      errors.description =
        !value || value.length < 15 || value.length > 150
          ? "Se requiere una descripcion de minimo 15 caracteres"
          : null;
    } else if (name === "image") {
      errors.image = !value
        ? "Se requiere una imagen referencial de la mascota."
        : null;
    } else if (name === "type") {
      errors.type =
        !value || value === "select"
          ? "Se requiere que se especifique la especie de la mascota."
          : null;
    } else if (name === "provincia") {
      errors.provincia =
        !value || value === "select"
          ? "Se requiere que se brinde la provincia de la mascota."
          : null;
    } else if (name === "municipio") {
      errors.municipio =
        !value || value === "select"
          ? "Se requiere que se brinde el municipio de la mascota."
          : null;
    } else if (name === "gender") {
      errors.gender = !value
        ? "Se requiere que se brinde el genero de la mascota."
        : null;
    } else if (name === "age") {
      errors.age =
        !value || value < 0 || value > 40
          ? "Se requiere que se especifique la edad de la mascota no mayor a 40 años."
          : null;
    } else {
      setError(null);
    }
    return console.log(errors);
  };
  useEffect(() => {
    dispatch(getper());
  }, [dispatch]);
  const handleSelector = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };
  const handleNumber = (e) => {
    const { value } = e.target;
    setPost({
      ...post,
      age: value,
    });
  };
  const handleProvincia = (e) => {
    const { value } = e.target;
    dispatch(getmuni(value));
    setPost({
      ...post,
      location: {
        provincia: value,
      },
    });
  };
  const handleMunicipio = (e) => {
    const { value } = e.target;
    setPost({
      ...post,
      location: {
        ...post.location,
        municipio: value,
      },
    });
  };
  const handleFiles = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setPost({
        ...post,
        image: reader.result,
      });
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    return PostAdop(post).then((id) => router.push(`detail/${id}`));
  };
  return (
    <>
      <Layout title="Publicar Mascota" />
      <NavBar />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <span className={styles.title}>Datos de la Mascota</span>
          <label htmlFor="name" className={styles.stretch}>
            Nombre:
            <span className={styles.errors}>{errors.name}</span>
            <input
              className={styles.input}
              id="name"
              type="text"
              name="name"
              placeholder=" Ingrese el nombre de la mascota..."
              onChange={(e) => {
                validation(e);
                handleSelector(e);
              }}
            />
          </label>
          <label htmlFor="size" className={styles.stretch}>
            Tamaño:
            <span className={styles.errors}>{errors.size}</span>
            <div className={styles.radio}>
              <label htmlFor="pequeño">
                <input
                  type="radio"
                  id="pequeño"
                  value="pequeño"
                  name="size"
                  onChange={(e) => {
                    validation(e);
                    handleSelector(e);
                  }}
                />
                Pequeño
              </label>
              <label htmlFor="mediano">
                <input
                  type="radio"
                  id="mediano"
                  value="mediano"
                  name="size"
                  onChange={(e) => {
                    validation(e);
                    handleSelector(e);
                  }}
                />
                Mediano
              </label>
              <label htmlFor="grande">
                <input
                  type="radio"
                  id="grande"
                  value="grande"
                  name="size"
                  onChange={(e) => {
                    validation(e);
                    handleSelector(e);
                  }}
                />
                Grande
              </label>
            </div>
          </label>
          <label htmlFor="age" className={styles.stretch}>
            Edad:
            <span className={styles.errors}>{errors.age}</span>
            <input
              className={styles.input}
              id="age"
              type="number"
              name="age"
              placeholder=" Ingrese la edad de la mascota.."
              min="0"
              max="40"
              onChange={(e) => {
                validation(e);
                handleNumber(e);
              }}
            />
          </label>
          <label htmlFor="type" className={styles.stretch}>
            Especie:
            <span className={styles.errors}>{errors.type}</span>
            <select
              className={styles.input}
              id="type"
              name="type"
              onChange={(e) => {
                validation(e);
                handleSelector(e);
              }}
            >
              <option defaultValue={true} value="select">
                Seleccione la especie de la mascota
              </option>
              <option key="gatos" value="gatos">
                gato
              </option>
              <option key="perros" value="perros">
                perro
              </option>
              <option key="aves" value="aves">
                ave
              </option>
              <option key="peces" value="peces">
                pez
              </option>
            </select>
          </label>
          <label className={styles.stretch}>
            Ubicación:
            <label htmlFor="provincia" className={styles.stretch}>
              <span className={styles.title}>Provincia</span>
              <span className={styles.errors}>{errors.provincia}</span>
              <select
                className={styles.input}
                name="provincia"
                id="provincia"
                onChange={(e) => {
                  validation(e);
                  handleProvincia(e);
                }}
              >
                <option defaultValue={true} value="select">
                  Seleccione la provincia...
                </option>
                {provi?.map((el) => (
                  <option key={el.nombre} value={el.nombre}>
                    {el.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="municipio" className={styles.stretch}>
              <span className={styles.title}>Ciudad</span>
              <span className={styles.errors}>{errors.municipio}</span>
              <select
                className={styles.input}
                id="municipio"
                name="municipio"
                onChange={(e) => {
                  validation(e);
                  handleMunicipio(e);
                }}
              >
                <option defaultValue={true} value="select">
                  Seleccione la ciudad...
                </option>
                {munici?.map((el) => (
                  <option key={el.nombre} value={el.nombre}>
                    {el.nombre}
                  </option>
                ))}
              </select>
            </label>
          </label>
          <label htmlFor="gender" className={styles.stretch}>
            Genero:
            <span className={styles.errors}>{errors.gender}</span>
            <div className={styles.radio}>
              <label htmlFor="macho">
                <input
                  type="radio"
                  value="macho"
                  id="macho"
                  name="gender"
                  onChange={(e) => {
                    validation(e);
                    handleSelector(e);
                  }}
                />
                Macho
              </label>
              <label htmlFor="hembra">
                <input
                  type="radio"
                  value="hembra"
                  id="hembra"
                  name="gender"
                  onChange={(e) => {
                    validation(e);
                    handleSelector(e);
                  }}
                />
                Hembra
              </label>
            </div>
          </label>
          <label htmlFor="description" className={styles.stretch}>
            Descripción:
            <span className={styles.errors}>{errors.description}</span>
            <textarea
              className={styles.input}
              id="description"
              type="text"
              name="description"
              rows="3"
              placeholder=" Describa a la mascota..."
              onChange={(e) => {
                validation(e);
                handleSelector(e);
              }}
            />
          </label>
          <label htmlFor="image" className={styles.stretch}>
            Imagen:
            <span className={styles.errors}>{errors.image}</span>
            <input
              id="image"
              type="file"
              name="image"
              onChange={(e) => {
                validation(e);
                handleFiles(e);
              }}
            />
          </label>
          <label htmlFor="submit"></label>
          <input
            id="submit"
            type="submit"
            value="Subir Mascota"
            disabled={
              !post.age ||
              !post.name ||
              !post.description ||
              !post.location.provincia ||
              !post.image ||
              !post.size ||
              !post.gender ||
              !post.type ||
              !post.location.municipio ||
              /////////////////////////////////////////////////////////
              errors.name !== null ||
              errors.age !== null ||
              errors.description !== null ||
              errors.size !== null ||
              errors.gender !== null ||
              errors.municipio !== null ||
              errors.provincia !== null ||
              errors.type !== null ||
              errors.image !== null
            }
          />
        </form>
      </div>
    </>
  );
}
