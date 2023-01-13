import Link from "next/link";
import Image from "next/image";
import React from "react";
import logo from "../../img/logo.jpeg";
import { useUser } from "@auth0/nextjs-auth0/client";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "next/router";

const handlerClick = () => {
  const dash = document.getElementById("dashNavAdmin");

  if (dash.className.includes("view")) {
    dash.classList.remove("view");
    console.log(dash.className);
    return;
  }
  dash.className += " view";

  console.log(dash.className);
};

const NavBar = ( response) => {
  const { user, isLoading } = useUser();
    const router = useRouter();
    const idUser = user?.sub.split("|")[1];

  if (isLoading) return <h1>Loading...</h1>;

  const handleAdoption = () => {
    if (!response.response.name || response.response.name === " ") {
      Swal.fire({
        title: "Necesitas configurar tu nombre para adoptar",
        icon: "error",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
    } else {
      router.push(`/adoptionForm/${idUser}`);
    }
  };

  return (
    <header className="headerNav">
      <Link href={"/home"} className="logo">
        <Image
          src={logo}
          alt="logo"
          className="logo"
          width="auto"
          height="auto"
        />
      </Link>
      <nav className="nav">
        <div className="navMenuList">
          <Link className="itemNav" href="/eShop">
            <span>Apóyanos </span>
          </Link>
          <Link className="itemNav" href="/petsPosts">
            <span>Ver Mascotas</span>
          </Link>
          {user ? (
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
        <Link
          className="itemDash"
          href={user ? `/profile/${user.sub.split("|")[1]}` : "/"}
        >
          <span>Mi Perfil</span>
        </Link>
        {/* <Link className="itemDash" href="#">
          <span>Mis Favoritos</span>
        </Link> */}
        <Link className="itemDash" href="/cart">
          <span>Mi carrito</span>
        </Link>
        <p
          onClick={() => handleAdoption()}
          className="itemDash"
          href="/adoptionForm"
        >
          <span>Publicar Mascota</span>
        </p>
        <a className="itemDash" href="/api/auth/logout">
          <span>Cerrar sesión</span>
        </a>
      </div>
    </header>
  );
};

export default NavBar;



