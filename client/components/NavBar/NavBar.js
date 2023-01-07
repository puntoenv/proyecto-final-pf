import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
// import logo from '../../img/logo.png'
// import Image from "next/image";

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
  const { data: session } = useSession();
  return (
    <header className="headerNav">
      <nav className="nav">
        {/* <Link href={"/home"} classname= "logo">
        
        <Image src={logo} alt="logo" className="logo" width='auto' height='auto'/>
      
        </Link> */}
        <div className="navMenuList">
          <Link className="itemNav" href="/Apóyanos">
            <span>Apóyanos </span>
          </Link>
          <Link className="itemNav" href="/petsPosts">
            <span>Adoptar </span>
          </Link>
          {true || session ? (
            <span className="btnPerfil" onClick={handlerClick}>
              Perfil
            </span>
          ) : (
            <Link href="/login" className="itemNav">
              <span>Ingresar | Registrarse</span>
            </Link>
          )}
        </div>
      </nav>
      <div className="dashBoardContain" id="dashNavAdmin">
        <Link className="itemDash" href="#">
          <span>Editar Perfil</span>
        </Link>
        <Link className="itemDash" href="#">
          <span>Mis Favoritos</span>
        </Link>
        <Link className="itemDash" href="#">
          <span>Mi carrito</span>
        </Link>
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
