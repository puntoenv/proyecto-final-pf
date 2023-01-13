import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

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

const NavBar = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <header className="headerNav">
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
        {/* <Link className="itemDash" href="#">
          <span>Mi carrito</span>
        </Link> */}
        <Link className="itemDash" href="/adoptionForm">
          <span>Publicar Mascota</span>
        </Link>
        <a className="itemDash" href="/api/auth/logout">
          <span>Cerrar sesión</span>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
