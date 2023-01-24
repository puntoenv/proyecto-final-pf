import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar.jsx";
// import Bar from "../../components/admin/Bar";
//import Pie from "../../components/admin/Pie";
// import CategPie from "../../components/admin/CategPie";
// import Calendar from "../../components/admin/Calendar";
import Products from "../../components/admin/Products/Products";
import Pets from "../../components/admin/Posts/Posts";
import styles from "./admin.module.css";
import Users from "../../components/admin/Users/Users";
import Footer from "../../components/admin/Footer";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getUserById } from "../../controller/functionsUser/getUserById.js";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import GroupIcon from "@mui/icons-material/Group";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Link from "next/link";
import Image from "next/image";
import logo from "../../img/logo.jpeg";
import ImageIcon from '@mui/icons-material/Image';

const Admin = withPageAuthRequired(() => {
  const [Render, setRender] = useState();

  const { user } = useUser();
  const router = useRouter();

  let id;
  if (user && user.sub) {
    const idUser = user.sub.split("|")[1];
    id = idUser;
  }
  const { data: dbUser, isLoading } = useQuery(["user", id], () =>
    getUserById(id)
  );

  useEffect(() => {
    if (!isLoading && dbUser.administrator === false) {
      Swal.fire({
        icon: "warning",
        title: "Acceso denegado",
        text: "La ruta a la que intentó acceder es solo para administradores",
        showCloseButton: false,
        showCancelButton: false,
        link: "/home",
        iconColor: "#415D43",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      router.push("/home");
    }
  }, [isLoading]);

  const handlerOnClick = (e, component) => {
    e.preventDefault;
    setRender(component);
  };

  useEffect(() => {
    {
      setRender();
    }
  }, []);

  return (
    <div>
      <div className="navAd">
        <Navbar />
      </div>
    
      <div>
        <div>
          <section>{Render}</section>
        </div>

        <div className={styles.sidebar}>
        <Link href={"/home"} className="logo">
        <Image
          src={logo}
          alt="logo"
          className={styles.logo}
          width="auto"
          height="auto"
        />
      </Link>
          <div key="customers">
            <p className="text-gray-400 dark:text-gray-400 m-1 mt-32 uppercase">
              Dashboard
            </p>

            <button
              className={styles.btn}
              onClick={(e) => handlerOnClick(e, <Users />)}
            >
              
              <GroupIcon />
              Usuarios
            </button>
            <button
              className={styles.btn}
              onClick={(e) => handlerOnClick(e, <Products />)}
            >
             
              <StorefrontIcon />
              Productos
            </button>
            <button
              className={styles.btn}
              onClick={(e) => handlerOnClick(e, <Pets />)}
            >
             
              <ImageIcon />
              Publicaciones
            </button>
            {/* <button
                className={styles.btn}
                onClick={(e) => handlerOnClick(e, )}
              >
                Calendario
              </button> */}
          </div>
        </div>
      </div>

      {/* 
      <Footer /> */}
    </div>
  );
});

export default Admin;
