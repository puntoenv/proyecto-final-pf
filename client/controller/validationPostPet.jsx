export const validation = (e, errors, setError) => {
  let { value, name } = e.target;
  let regex = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
  if (name === "name") {
    errors.name =
      !value ||
      value.length > 150 ||
      !value.match(regex) || // arreglar que no acepta la Ñ
      value[0] !== value[0].toUpperCase()
        ? "El nombre debe iniciar con mayuscula y no debe tener carácteres especiales."
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
  } else if (name === "healthExtra") {
    errors.healthExtra = !value
      ? "Por favor, describe la condición de salud de la mascota"
      : "";
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
export const handleLocation = (post, setPost, coords) => {
  setPost({
    ...post,
    location: coords,
  });
};

export const handleFiles = (e, setPost, post) => {
  const { files } = e.target;
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onloadend = () => {
    setPost({
      ...post,
      image: [...post.image, reader.result],
    });
  };
};
export const handleSubmit = async (e, PostAdop, post, router, errors, Swal) => {
  e.preventDefault();
  if (
    !post.age ||
    !post.name ||
    !post.description ||
    !post.location ||
    !post.image ||
    !post.size ||
    !post.gender ||
    !post.type ||
    errors.name !== null ||
    errors.age !== null ||
    errors.description !== null ||
    errors.size !== null ||
    errors.gender !== null ||
    errors.type !== null ||
    errors.image !== null ||
    errors.health !== null ||
    errors.sociability !== null ||
    errors.condition !== null
  ) {
    Swal.fire({
      title: "Rellena todos los input para avanzar",
      icon: "error",
      color: "#437042",
      confirmButtonColor: "#437042",
      confirmButtonAriaLabel: "#437042",
    });
  } else {
    const id = await PostAdop(post);

    if (typeof id === "string") {
      return await router.push(`/detail/${id}`);
    }
  }
};

export const handleDisableInput = (event, post, errors, Swal) => {
  event.preventDefault();
  if (
    !post.age ||
    !post.name ||
    !post.description ||
    !post.location.provincia ||
    !post.image ||
    !post.size ||
    !post.gender ||
    !post.type ||
    !post.location.municipio ||
    errors.name !== null ||
    errors.age !== null ||
    errors.description !== null ||
    errors.size !== null ||
    errors.gender !== null ||
    errors.ciudad !== null ||
    errors.provincia !== null ||
    errors.type !== null ||
    errors.image !== null ||
    errors.health !== null ||
    errors.sociability !== null ||
    errors.condition !== null
  ) {
    Swal.fire({
      title: "Rellena todos los input para avanzar",
      icon: "error",
      color: "#437042",
      confirmButtonColor: "#437042",
      confirmButtonAriaLabel: "#437042",
    });
  }
};
