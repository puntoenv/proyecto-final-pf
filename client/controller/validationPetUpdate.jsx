
export const validationUpdatePet = (event, input, setError, error) => {
    let regex = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
   if(event.target.name === 'name'){
     if (event.target.value.length >= 1 && event.target.value.length < 3) {
       setError({
         ...error,
         name: "El nombre debe contener de 3 a 30 carácteres",
       });
     } else if(event.target.value.length >= 1 && !event.target.value.match(regex)){
        setError({
          ...error,
          name: "No se admiten carácteres especiales",
        });
     } else {
       setError({
         ...error,
         name: null,
       });
     }
   }

   if (event.target.name === "description") {
    console.log(event.target.value.length)
     if (
       event.target.value.length >= 1 && (event.target.value.length < 15 ||
       event.target.value.length > 400)
     ) {
       setError({
         ...error,
         description: "La descripción debe contener de 15 a 400 carácteres",
       });
     } else {
       setError({
         ...error,
         description: null,
       });
     }
   }

//    if(event.target.name === 'image'){
//     if (input.image.length === 0) {
//       setError({
//         ...error,
//         image: "Debes subir al menos una imagen",
//       });
//     } else if (input.image.length >= 1) {
//       setError({
//         ...error,
//         image: null,
//       });
//     }
//    }
}

export const validationImage = (event, input, setError, error) => {
console.log(input.image.length)
    if (!input.image.length) {
      setError({
        ...error,
        image: "Debes subir al menos una imagen",
      });
    } else if (input.image.length >= 1) {
      setError({
        ...error,
        image: null,
      });
    }

};