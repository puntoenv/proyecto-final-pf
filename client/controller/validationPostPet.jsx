export const validation = (e, errors) => {
  let { value, name } = e.target;
  if (name === "name") {
    errors.name =
      !value ||
      value.length > 150 ||
      !value.match("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$") ||
      !/([A-Z])\w+/g.test(value)
        ? "El nombre debe iniciar con mayuscula y solo puede contener letras."
        : null;
  } else if (name === "size") {
    errors.size = !value ? "Por favor, brinde el tamaño de la mascota." : null;
  } else if (name === "description") {
    errors.description =
      !value || value.length < 15 || value.length > 250
        ? "Se requiere una descripcion mín. 15 caracteres / máx. 250 caracteres."
        : null;
  } else if (name === "image") {
    errors.image = !value
      ? "Se requiere una imagen referencial de la mascota."
      : null;
  } else if (name === "type") {
    errors.type =
      !value || value === "select"
        ? "Por favor, especifique la especie de la mascota."
        : null;
  } else if (name === "provincia") {
    errors.provincia =
      !value || value === "select"
        ? "Por favor, brinde la provincia de la mascota."
        : null;
  } else if (name === "ciudad") {
    errors.ciudad =
      !value || value === "select"
        ? "Por favor, brinde el ciudad de la mascota."
        : null;
  } else if (name === "gender") {
    errors.gender = !value
      ? "Por favor, brinde el genero de la mascota."
      : null;
  } else if (name === "age") {
    errors.age =
      !value || value < 0 || value > 40
        ? "Por favor, especifique edad de la mascota (no mayor a 40 años)."
        : null;
  } else if (name === "health") {
    errors.health = !value
      ? "Por favor, especifique el estado de salud de la mascota"
      : null;
  } else if (name === "sociability") {
    errors.sociability = !value
      ? "Por favor, indique la sociabilidad de la mascota"
      : null;
  } else if (name === "condition") {
    errors.condition = !value
      ? "Por favor, indique la condición de la mascota"
      : null;
  } else {
    setError(null);
  }
};

export const handleSelector = (e, setPost, post) => {
  const { name, value } = e.target;

  setPost({
    ...post,
    [name]: value,
  });
  console.log(post);
};
export const handleProvincia = (e, setPost, post, dispatch, getmuni) => {
  const { value } = e.target;
  dispatch(getmuni(value));
  setPost({
    ...post,
    location: {
      provincia: value,
    },
  });
};
export const handleCiudad = (e, setPost, post) => {
  const { value } = e.target;
  setPost({
    ...post,
    location: {
      ...post.location,
      municipio: value,
    },
  });
};
export const handleFiles = (e, setPost, post) => {
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
export const handleSubmit = async (e, PostAdop, post, router) => {
  e.preventDefault();
  const id = await PostAdop(post);
  if (typeof id === "string") return await router.push(`/detail/${id}`);
};
