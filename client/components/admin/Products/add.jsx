import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.css";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { addProduct } from "../../../stores/actions";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";
import { validation } from "./validations.js";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const blue = {
  500: "#153e21",
  600: "#0072E5",
  700: "#0059B2",
};

const CustomButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 22px;
  background-color: ${blue[500]};
  margin-left: 30em;
  margin-top: 3em;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  width: 5em;
  height: 2em;

  &:hover {
    background-color: #415941;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(33, 73, 25, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Add() {
  const [mounted, setMounted] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "",
  });

  //   const handleSubmit = async () => {
  //     try {
  //       await addProduct(formData);
  //       setMounted(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (!mounted) {
  //     return null;
  //   }

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [property]: value });
    setErrors(validation({ ...formData, [property]: value }));
  };

  const handleFiles = (event, setFormData, formData) => {
    const { files } = event.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
      console.log(reader.result);
    };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorSave = validation(formData);
    try {
      if (Object.values(errorSave).length !== 0) {
        alert("error");
      } else {
        await addProduct(formData);
        setMounted(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (!mounted) {
    return null;
  }
  const handleClose = () => {
    setMounted(false);
  };
  return (
    <>
      <div className={styles.close}>
        <Button
          sx={{ color: "#574c3d", ml: 1.5 }}
          startIcon={<CloseIcon />}
          onClick={() => handleClose()}
        />
      </div>
      <h1 className={styles.h1}> Agregar Producto </h1>
      <FormControlUnstyled>
        {errors.name ? (
          <TextField
            error
            id="name"
            name="name"
            onChange={handleChange}
            sx={{ ml: 60, mt: 8, width: "33%" }}
            label="Error"
            helperText="El nombre debe iniciar con mayúscula y no debe tener carácteres especiales."
            variant="outlined"
          />
        ) : (
          <TextField
            id="name"
            name="name"
            onChange={handleChange}
            sx={{ ml: 60, mt: 8, width: "33%" }}
            label="Nombre"
            variant="outlined"
          />
        )}
        <div className={styles.form1}>
          {errors.price ? (
            <TextField
              error
              id="price"
              name="price"
              onChange={handleChange}
              sx={{ width: "40%" }}
              label="Error"
              helperText="Por favor, indique el precio. El valor debe ser numérico"
              variant="outlined"
              placeholder="$"
            />
          ) : (
            <TextField
              id="price"
              name="price"
              variant="outlined"
              placeholder="$"
              label="Precio"
              onChange={handleChange}
              sx={{ width: "40%" }}
            />
          )}

          {errors.stock ? (
            <TextField
              error
              id="stock"
              name="stock"
              onChange={handleChange}
              sx={{ width: "40%" }}
              label="Error"
              helperText="Por favor, indique el stock. El valor debe ser numérico"
              variant="outlined"
            />
          ) : (
            <TextField
              id="stock"
              name="stock"
              sx={{ width: "40%" }}
              label="Stock"
              variant="outlined"
              onChange={handleChange}
            />
          )}
        </div>
        <div className={styles.form2}>
          {errors.category ? (
            <TextField
              error
              id="category"
              name="category"
              onChange={handleChange}
              sx={{ width: "40%" }}
              label="Error"
              helperText="Por favor, indique al menos una categoria."
              variant="outlined"
            />
          ) : (
            <TextField
              id="category"
              name="category"
              sx={{ mr: 3, width: "44%" }}
              label="Categorias"
              variant="outlined"
              onChange={handleChange}
            />
          )}

          <label
            for="mi_archivo"
            className={styles.mi_archivo}
            name="image"
            onChange={(event) => handleFiles(event, setFormData, formData)}
          >
            <HiArrowDownOnSquare size={30}></HiArrowDownOnSquare>
            Subir imagen
            <span>
              <input
                type="file"
                className={styles.img}
                name="mi_archivo"
                id="mi_archivo"
              ></input>
            </span>
          </label>
        </div>
        {/* {errors.description ? (
          <TextField
            error
            id="description"
            name="description"
            onChange={handleChange}
            sx={{ ml: 61, mt: 2, width: "33%" }}
            label="Error"
            helperText="Se requiere una descripcion mín. 15 caracteres / máx. 250 caracteres."
            variant="outlined"
            multiline
            maxRows={10}
          />
        ) : ( */}{" "}
        null :
        <TextField
          id="description"
          name="description"
          sx={{ ml: 56.5, mt: 2, width: "33%" }}
          label="Descripción"
          multiline
          maxRows={10}
          variant="outlined"
          onChange={handleChange}
        />
        {/* {errors ?   <Stack spacing={2} direction="row">
          <CustomButton variant="contained" disabled>
            Agregar
          </CustomButton>
        </Stack> : */}
        <Stack spacing={2} direction="row">
          <CustomButton variant="contained" onClick={handleSubmit}>
            Agregar
          </CustomButton>
        </Stack>
      </FormControlUnstyled>
    </>
  );
}

export default Add;
