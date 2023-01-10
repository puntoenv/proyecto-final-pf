// export const validation = (event, setError, error) => {
//     let inputName = event.target.name
//     let inputValue = event.target.value

//     if (inputValue !== "") {
//       if (inputName === "email") {
//         if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
//           setError({
//             ...error,
//             [inputName]: "Email inválido", 
//           });
//         } else {
//           setError({
//             ...error,
//             [inputName]: "",
//           });
//         }
//       } else if (inputName === "password") {
//         if (inputValue.length < 8 || inputValue.length > 15) {
//           setError({
//             ...error,
//             [inputName]: "La contraseña debe tener entre 8 y 15 caracteres ",
//           });
//         } else if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(inputValue)) {
//           setError({
//             ...error,
//             [inputName]: "No se admiten carácteres especiales",
//           });
//         } else {
//           setError({
//             ...error,
//             [inputName]: "",
//           });
//         }
//       }
//     } else {
//       setError({
//         ...error,
//         [inputName]: "",
//       });
//     }
// };

// export const validationButton = (error, input) => {
//   if(error.email || error.password || !input.email || !input.password){
//     return true
//   } else {
//     return false
//   }
// }

