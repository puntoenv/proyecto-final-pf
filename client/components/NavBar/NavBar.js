import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import logo from "../../img/logo.jpeg";
import { useUser } from "@auth0/nextjs-auth0/client";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "next/router";
import { handleAdoption } from "../../controller/validationUpdateP";
import styles from "../Profile/Loading.module.css";
import { BsFillHeartFill } from 'react-icons/bs';
import { RiShoppingCart2Line } from 'react-icons/ri';
const handlerClick = () => {
  const dash = document.getElementById("dashNavAdmin");

  if (dash.className.includes("view")) {
    dash.classList.remove("view");
    return;
  }
  dash.className += " view";
};

const NavBar = ({ authUser }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const idUser = authUser && authUser._id;
  // const idUser = user?.sub.split("|")[1];
//console.log(authUser.administrator)

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}></div>
        <p>Loading...</p>
      </div>
    );

  return (
    <header className="headerNav">
      <Link href={"/home"} className="logo">
        <Image
          src={logo}
          alt="logo"
          className="logo"
          // width="auto"
          // height="auto"
        />
      </Link>
      <nav className="nav">
        <div className="navMenuList">
           <Link className="itemNav" href="/favorite">
            <span><BsFillHeartFill/></span>
          </Link>
          <Link className="itemNav" href="/eShop">
            <span><RiShoppingCart2Line/></span>
          </Link>

          <Link className="itemNav" href="/aboutUs">
            <span>Nosotros</span>
          </Link>
          <Link className="itemNav" href="/contact">
            <span>Contáctanos</span>
          </Link>
        
          <Link className="itemNav" href="/petsPosts">
            <span>Ver Mascotas</span>
          </Link>
          {authUser.administrator === true ? (
            <Link className="itemNav" href="/admin">
              <span>Dashboard</span>
              <Image
                style={{ borderRadius: "50%", marginLeft: "5px" }}
                src={user.picture}
                width={30}
                height={30}
              ></Image>
            </Link>
          ) : user ? (
            <span className="btnPerfil" onClick={handlerClick}>
              Perfil
            </span>
          ) : (
            <Link href="/api/auth/login" className="itemNav">
              <span>Ingresar | Registrarse</span>
            </Link>
          )}
        </div>
      </nav>
      <div className="dashBoardContain" id="dashNavAdmin">
        <Link className="itemDash" href={`/profile/${idUser}`}>
          <span>Mi Perfil</span>
        </Link>
        <Link className="itemDash" href="/cart">
          <span>Mi carrito</span>
        </Link>
        <p
          onClick={() => handleAdoption(router, Swal, idUser)}
          className="itemDash"
          href="/adoptionForm"
        >
          <span>Publicar Mascota</span>
        </p>
        <Link className="itemDash" href="/favorite">
          <span>Favoritos</span>
        </Link>

        <a className="itemDash" href="/api/auth/logout">
          <span>Cerrar sesión</span>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
