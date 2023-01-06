import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getper, getmuni, PostAdop } from "../../stores/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is require";
  }
  if (!input.size) {
    errors.size = "size is require";
  }
  if (!input.description) {
    errors.description = "description is require";
  }
  if (!input.gender) {
    errors.image = "gender is require";
  }
  return errors;
}

function form() {
  const router = useRouter();
  // console.log(router);
  const dispatch = useDispatch();
  const provi = useSelector((state) => state.caracter.provi.provincias);
  const munici = useSelector((state) => state.caracter.municipios.municipios);
  const [error, seterror] = useState();
  const [post, setpost] = useState({
    name: "",
    size: "",
    age: 0,
    description: "",
    image: null,
    type: "",
    location: {},
    gender: "",
  });

  useEffect(() => {
    dispatch(getper());
  }, [dispatch]);

  // handel

  const handelselector = (e) => {
    const { name, value } = e.target;
    setpost({
      ...post,
      [name]: value,
    });
    console.log(post);
    seterror(
      validate({
        ...post,
        [name]: value,
      })
    );
  };
  const handenumber = (e) => {
    const { name, value } = e.target;
    const number = parseInt(value);
    if (number > 0 && number <= 20) {
      setpost({
        ...post,
        [name]: value,
      });
      console.log(post);
    } else {
      console.log("error");
    }
  };

  const handelprovincia = (e) => {
    const { name, value } = e.target;
    dispatch(getmuni(value));
    setpost({
      ...post,
      [name]: {
        provincia: value,
      },
    });
    console.log(post);
  };
  const handelciudad = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setpost({
      ...post,
      [name]: {
        ...post.location,
        municipio: value,
      },
    });
  };

  const handelfiles = (e) => {
    const { name, files } = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setpost({
        ...post,
        [name]: reader.result,
      });
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    PostAdop(post);

    // router.push("/home");
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(evt) => handleSubmit(evt)}>
          <h1 className={styles.title}>Posteo de Mascota</h1>
          <label htmlFor="name" className={styles.stretch}>
            Nombre:
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Ingrese el nombre de la mascota..."
              onChange={(e) => handelselector(e)}
            />
          </label>
          <label htmlFor="size" className={styles.stretch}>
            Tamaño:
            <div className={styles.radio}>
              <label htmlFor="pequeño">
                <input
                  type="radio"
                  id="pequeño"
                  value="pequeño"
                  name="size"
                  onChange={(e) => handelselector(e)}
                />
                Pequeño
              </label>
              <label htmlFor="mediano">
                <input
                  type="radio"
                  id="mediano"
                  value="mediano"
                  name="size"
                  onChange={(e) => handelselector(e)}
                />
                Mediano
              </label>
              <label htmlFor="grande">
                <input
                  type="radio"
                  id="grande"
                  value="grande"
                  name="size"
                  onChange={(e) => handelselector(e)}
                />
                Grande
              </label>
            </div>
          </label>
          <label htmlFor="age" className={styles.stretch}>
            Edad:
            <input
              id="age"
              type="number"
              name="age"
              placeholder="Ingrese la edad"
              onChange={(e) => {
                handenumber(e);
              }}
            />
          </label>
          <label htmlFor="type" className={styles.stretch}>
            Especie:
            <select id="type" name="type" onChange={(e) => handelselector(e)}>
              <option defaultValue={true}>
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
          <label htmlFor="location" className={styles.stretch}>
            Ubicación:
            <label htmlFor="provincia" className={styles.stretch}>
              <span className={styles.title}>Provincia</span>
              <select
                name="location"
                id="provincia"
                onChange={(e) => handelprovincia(e)}
              >
                <option defaultValue={true}>Seleccione la provincia...</option>
                {provi?.map((el) => (
                  <option key={el.nombre} value={el.nombre}>
                    {el.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="ciudad" className={styles.stretch}>
              <span className={styles.title}>Ciudad</span>
              <select
                id="ciudad"
                name="location"
                onChange={(e) => handelciudad(e)}
              >
                <option defaultValue={true}>Seleccione la ciudad...</option>
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
            <div className={styles.radio}>
              <label htmlFor="macho">
                <input
                  type="radio"
                  value="macho"
                  id="macho"
                  name="gender"
                  onChange={(e) => handelselector(e)}
                />
                Macho
              </label>
              <label htmlFor="hembra">
                <input
                  type="radio"
                  value="hembra"
                  id="hembra"
                  name="gender"
                  onChange={(e) => handelselector(e)}
                />
                Hembra
              </label>
            </div>
          </label>
          <label htmlFor="description" className={styles.stretch}>
            Descripción:
            <textarea
              id="description"
              type="text"
              name="description"
              placeholder="Describa a la mascota..."
              onChange={(e) => handelselector(e)}
            />
          </label>
          <label htmlFor="image" className={styles.stretch}>
            Imagen:
            <input
              id="image"
              type="file"
              name="image"
              onChange={(e) => handelfiles(e)}
              multiple
            />
          </label>
          {post.name !== "" && !error.name && post.description !== "" ? (
            <button type="submit">Guardar</button>
          ) : post.name === "" ? (
            <button>Name is require</button>
          ) : (
            <button>descripcion is require</button>
          )}
        </form>
      </div>

    </>
  );
}

export default form;
