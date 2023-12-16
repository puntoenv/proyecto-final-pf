import React from "react";
import logoPata from "../../../img/logo.jpeg";
import Image from "next/image";
import { GrHomeRounded, GrFormDown } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";
import ImageIcon from "@mui/icons-material/Image";
import { IoPaw } from "react-icons/io5";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import { MdArchive } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { SiDatadog } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine, RiFileList3Fill } from "react-icons/ri";
import { BsChevronCompactDown } from "react-icons/bs";
import { BiLink } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { handleAdoption } from "../../../controller/validationUpdateP";
import { useRouter } from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const SideBar = ({ setRender, response, authUser }) => {
  const router = useRouter();
  const idUser = authUser && authUser._id;

  return (
    //============================ NAVBAR= navContainer
    <div className={"navBarcontainer"} id="sideBarUser">
      <div className={"wrapper"}>
        <ul className={"ul"}>
          {/*============================ BIENVENIDA============================ */}
          <li className={"icon"}>
            <span
              style={{
                color: "#ccc",
                fontSize: "22px",
                marginBottom: "150px",
              }}
            >
              ¡Hola,{" "}
              <span style={{ color: "#eee" }}>
                {authUser?.name || authUser?.email}
              </span>
              !
            </span>
          </li>

          {/* ============================ PERFIL============================ */}
          <div
            className={"li"}
            onClick={(event) => {
              event.preventDefault();
              setRender("profile");
            }}
          >
            <FaUserAlt className={"iconSize"} size={20}></FaUserAlt>
            <li>
              <a href="">Perfil</a>
            </li>
          </div>
          {/* ============================ ARCHIVO============================ */}
          <div
            className={"li"}
            onClick={(event) => {
              event.preventDefault();
              setRender("adoptions");
            }}
          >
            <MdArchive className={"iconSize"} size={20}></MdArchive>
            <li>
              <a href="">Adopciones</a>
            </li>
          </div>
          {/* ============================ COMPRAS ============================ */}
          <div
            className={"li"}
            onClick={(event) => {
              event.preventDefault();
              setRender("buy");
            }}
          >
            <RiFileList3Fill className={"iconSize"} size={20}></RiFileList3Fill>
            <li>
              <a href="">Compras</a>
            </li>
          </div>
          {/* ============================ PUBLICACIONES ============================ */}
          <div
            className={"li"}
            onClick={(event) => {
              event.preventDefault();
              setRender("publications");
            }}
          >
            <ImageIcon className={"iconSize"} size={20}></ImageIcon>
            <li>
              <a href="">Publicaciones</a>
            </li>
          </div>
          {/* ============================ CARRITO============================ */}

          <div className={"li"}>
            <BsFillCartFill className={"iconSize"}></BsFillCartFill>
            <li>
              <a href="/cart">Carrito</a>
            </li>
          </div>

          {/* ============================ FAVORITOS ============================ */}
          <div className={"li"}>
            <BsSuitHeartFill className={"iconSize"}></BsSuitHeartFill>
            <li>
              <a href="/favorite">Favoritos</a>
            </li>
          </div>
          {/* ============================ PUBLICAR ============================ */}
          <div className={"li"}>
            <IoPaw className={"iconSize"}></IoPaw>
            <li>
              <span onClick={() => handleAdoption(router, Swal, idUser)}>
                Publica
              </span>
            </li>
          </div>
          {/* ============================ CERRAR SESION ============================ */}
          <div className={"liLogout"}>
            <li>
              <RiLogoutBoxLine size={20}></RiLogoutBoxLine>
              <a href="/api/auth/logout">Cerrar sesión</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
