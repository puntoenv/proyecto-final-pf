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
import { BsSuitHeartFill, BsFillCartFill } from "react-icons/bs";
import { IoPaw } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

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

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}></div>
        <p>Loading...</p>
      </div>
    );

  return (
    <header className="headerNav">
      <Link href={"/home"} className="logoNav">
        <Image src={logo} alt="logo" className="logoNav" />
      </Link>
      <nav className="nav">
        <div className="navMenuList">
          <Link className="itemNav" href="/eShop">
            <span>Productos</span>
          </Link>
          <Link className="itemNav" href="/contact">
            <span>Contáctanos</span>
          </Link>

          <Link className="itemNav" href="/petsPosts">
            <span>Mascotas</span>
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
              <FiMenu />
            </span>
          ) : (
            <Link href="/api/auth/login" className="itemNav">
              <span>Entrar</span>
            </Link>
          )}
        </div>
      </nav>
      <div className="dashBoardContain" id="dashNavAdmin">
        <span className="btnPerfilSlide" onClick={handlerClick}>
          <RxCross2 />
        </span>
        <Link className="itemDash" href={`/profile/${idUser}`}>
          <FaUserAlt className={"iconSideNav"} />
          <span>Perfil</span>
        </Link>
        <Link className="itemDash" href="/cart">
          <BsFillCartFill className={"iconSideNav"} /> Carrito
        </Link>

        <Link className="itemDash" href="/favorite">
          <BsSuitHeartFill className={"iconSideNav"} /> Favorito
        </Link>
        <p
          onClick={() => handleAdoption(router, Swal, idUser)}
          className="itemDash"
          href="/adoptionForm"
        >
          <IoPaw className={"iconSideNav"} />
          <span>Publicar</span>
        </p>
        <a className="itemDash itemLogOut" href="/api/auth/logout">
          <RiLogoutBoxLine className={"iconSideNav"} />

          <span>Cerrar sesión</span>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
