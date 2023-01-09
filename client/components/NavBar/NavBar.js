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
          {/* <Link className="itemNav" href="/Apóyanos">
            <span>Apóyanos </span>
          </Link> */}
          <Link className="itemNav" href="/petsPosts">
            <span>Adoptar </span>
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
        <Link className="itemDash" href="/profile">
          <span>Editar Perfil</span>
        </Link>
        <Link className="itemDash" href="#">
          <span>Mis Favoritos</span>
        </Link>
        {/* <Link className="itemDash" href="#">
          <span>Mi carrito</span>
        </Link> */}
        <Link className="itemDash" href="/adoptionForm">
          <span>Publicar Mascota</span>
        </Link>
        <Link className="itemDash" href="#">
          <span>Cerrar sesión</span>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
