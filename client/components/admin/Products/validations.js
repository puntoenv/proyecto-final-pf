export const validation = (formData) => {
  let errors = {};
  let regex = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

  switch (true) {
    case !formData.name ||
      formData.name.length > 150 ||
      !formData.name.match(regex) ||
      formData.name[0] !== formData.name[0].toUpperCase():
      errors.name = "error";
      break;
    case !formData.price || formData.price < 0:
      errors.price = "error";
      break;
    case !/^\d+$/.test(formData.price):
      errors.price = "error";
      break;
    case !formData.stock || formData.stock < 0:
      errors.stock = "error";
      break;
    case !/^\d+$/.test(formData.stock):
      errors.stock = "error";
      break;
    case !formData.category || formData.category.length < 4:
      errors.category = "error";
      break;

    // case !formData.description ||
    //   formData.description.length < 15 ||
    //   formData.description.length > 250:
    //    errors.description = "error";
    //   break;
    // case !formData.image:
    //   errors.description = "Se requiere una imagen referencial del producto.";

    default:
      break;
  }
  return errors;
};
