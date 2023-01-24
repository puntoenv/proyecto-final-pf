// import styles from "./style.module.css";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetUs } from "../../stores/actions";
// import NavBar from "../../components/NavBar/NavBar.js";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../img/logo.jpeg";
// import Layout from "../layout.js";

// const ages = [];
// for (let i = 0; i <= 40; i++) {
//   ages.push(i);
// }
// function Favorite({response}) {
// const {favorites} =response
// const [fil, setfil] = useState({
//   type:"",
//   size:"",
//   gender:"",
//   age:""
// })
// //console.log(fil)
//  const handlerFilter = (e) => {
//    const {id, value} = e.target
//    id === 'type' ? setfil ({... fil,[id]:value}) : id === 'size' ? setfil ({... fil,[id]:value}) : id === 'gender' ? setfil ({... fil,[id]:value}) : id === 'age' ? setfil ({... fil,[id]:value}) : setfil({... fil})
//   }

//   return (
    
//     <div>
//       <Layout title="Mascotas" />
//       <NavBar/>
//       <Link href={"/home"} className="logo">
//         <Image
//           src={logo}
//           alt="logo"
//           className={styles.logo}
//           width="auto"
//           height="auto"
//         />
//       </Link>
   
//       <div className={styles.container2}>
//       <form className={styles.form} onChange={(e) => handlerFilter(e)}>
//           <div>
//             <button className={styles.all} onClick={(e) => handlerTodas(e)}>
//               Ver todas
//             </button>
//           </div>
//           <h1 className={styles.title}>Animal</h1>
//           <select className={styles.select} id="type">
//             <option className={styles.option} value="animal">
//               Todos
//             </option>
//             <option className={styles.option} value="perro">
//               Perros
//             </option>
//             <option className={styles.option} value="gato">
//               Gatos
//             </option>
//             <option className={styles.option} value="conejo">
//               Conejos
//             </option>
//             <option className={styles.option} value="ave">
//               Aves
//             </option>
//             <option className={styles.option} value="pez">
//               Peces
//             </option>
//             <option className={styles.option} value="hamster">
//               Hamsters
//             </option>
//             <option className={styles.option} value="tortuga">
//               Tortuga
//             </option>
//           </select>

//           <h1 className={styles.title}>Tamaño</h1>
//           <select className={styles.select} id="size">
//             <option className={styles.option} value="tamaño">
//               Todos
//             </option>
//             <option className={styles.option} value="pequeño">
//               Pequeño
//             </option>
//             <option className={styles.option} value="mediano">
//               Mediano
//             </option>
//             <option className={styles.option} value="grande">
//               Grande
//             </option>
//           </select>

//           <h1 className={styles.title}>Género</h1>
//           <select className={styles.select} id="gender">
//             <option className={styles.option} value="genero">
//               Todos
//             </option>
//             <option className={styles.option} value="macho">
//               Macho
//             </option>
//             <option className={styles.option} value="hembra">
//               Hembra
//             </option>
//           </select>

//           <h1 className={styles.title}>Edades</h1>
//           <select id="age" className={styles.select}>
//             <option className={styles.option} defaultValue={true} value="">
//               Todas
//             </option>
//             {ages.map((age) => (
//               <option className={styles.option} key={age} value={age}>
//                 {age}
//               </option>
//             ))}
//           </select>
//           <button
//             type="submit"
//             value="Aplicar Filtros"
//             className={styles.all}
//             onClick={(e) => handlerSubmit(e)}
//           >Aplicar Filtros</button>
//         </form>
//         <p></p>
     
//       <div className={styles.big_container}>
         
//           {favorites?.map((mascota) => {
//             return (
//               <div key={mascota._id} className={styles.card}>
//                 <Image
//                   className={styles.img}
//                   width="300"
//                   height="240"
//                   src={mascota.image}
//                   alt="image"
//                 />
//                 <h1 className={styles.name}>{mascota.name}</h1>
//                 <h2 className={styles.size}>{mascota.gender}</h2>
//                 <button className={styles.btn}>
//                   <Link href={`/detail/${mascota._id}`}>Ver detalle</Link>
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//         </div>
//     </div>
//   );
// }

// export default Favorite;
// export async function getServerSideProps({query}) {
//   try {
//     const response = await (
//       await fetch(`${process.env.URL_BACK}user/${query.id}`)
//     ).json();
//     return {
//       props: {
//         response,
//       },
//     };
    
//   } catch (error) {
//     console.log(error);
//   }
// }