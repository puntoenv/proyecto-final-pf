import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getper, getmuni, PostAdop } from "../stores/actions";
import { useSelector } from "react-redux";

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
  if (!input.description) {
    errors.image = "image is require";
  }
  return errors;
}

function form() {
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
  }, []);

  // handel

  const handelselector = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setpost({ ...post, [name]: value });
    seterror(validate({ ...post, [name]: value }));
  };
  const handenumber = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    const number = parseInt(value);
    number > 0 && number <= 20
      ? setpost({ ...post, [name]: value })
      : console.log("error");
  };

  const handelprovincia = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    dispatch(getmuni(value));
    setpost({ ...post, [name]: { provincia: value } });
  };
  const handelciudad = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setpost({ ...post, [name]: { ...post.location, municipio: value } });
  };

  const handelfiles = (e) => {
    const { name, value, files } = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setpost({ ...post, [name]: reader.result });
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    PostAdop(post);
  };
  return (
    <>
      <form onSubmit={(evt) => handleSubmit(evt)}>
        <input
          type="text"
          name="name"
          placeholder="ingrese el nombre de tu mascota..."
          onChange={(e) => handelselector(e)}
        />
        <p></p>
        <select name="size" onChange={(e) => handelselector(e)}>
          <option disabled>Seleccione el tipo de tamaño...</option>
          <option key="grande" value="grande">
            grande
          </option>
          <option key="mediano" value="mediano">
            mediano
          </option>
          <option key="pequeño" value="pequeño">
            pequeño
          </option>
        </select>
        <p></p>
        <input
          type="number"
          name="age"
          placeholder="Ingrese la edad"
          onChange={(e) => {
            handenumber(e);
          }}
        />
        <p></p>
        <select name="type" onChange={(e) => handelselector(e)}>
          <option disabled>tipo</option>
          <option key="gatos" value="gatos">
            gatos
          </option>
          <option key="perros" value="perros">
            perros
          </option>
          <option key="aves" value="aves">
            aves
          </option>
          <option key="peces" value="peces">
            peces
          </option>
        </select>
        <p></p>
        <select name="location" onChange={(e) => handelprovincia(e)}>
          <option>provincia</option>
          {provi?.map((el) => (
            <option key={el.nombre} value={el.nombre}>
              {el.nombre}
            </option>
          ))}
        </select>
        <p></p>
        <select name="location" onChange={(e) => handelciudad(e)}>
          <option>ciudad</option>
          {munici?.map((el) => (
            <option key={el.nombre} value={el.nombre}>
              {el.nombre}
            </option>
          ))}
        </select>
        <p></p>
        <select name="gender" onChange={(e) => handelselector(e)}>
          <option>genero</option>
          <option key="masculino" value="masculino">
            masculino
          </option>
          <option key="femenino" value="femenino">
            femenino
          </option>
        </select>
        <p></p>
        <textarea
          type="text"
          name="description"
          placeholder="ingrese la descripcion de tu mascota..."
          onChange={(e) => handelselector(e)}
        />
        <p></p>
        <input
          type="file"
          name="image"
          onChange={(e) => handelfiles(e)}
          multiple
        />
        <p></p>
        {/*Array.from(post.image)?.map(item => <img src={item ? URL.createObjectURL(item) : null}/>)*/}
        <p></p>
        {post.name !== "" && !error.name && post.description !== "" ? (
          <button type="submit">Guardar</button>
        ) : post.name === "" ? (
          <button>Name is require</button>
        ) : (
          <button>descripcion is require</button>
        )}
      </form>
    </>
  );
}

export default form;
