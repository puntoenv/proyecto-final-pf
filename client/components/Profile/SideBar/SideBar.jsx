import React from "react";
import styles from "./styles.module.css";
import logoPata from "../../../img/pata_logo_claro.png";
import Image from "next/image";
import { GrHomeRounded, GrFormDown } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { HiDocumentText, HiHeart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine, RiFileList3Fill } from "react-icons/ri";
import { BiLink } from "react-icons/bi";
import { useState } from "react";

const SideBar = ({ setRender, response }) => {
  const handlerClick = () => {
    const dash = document.getElementById("hidden");

    if (dash.className.includes("width")) {
      dash.classList.remove("width");
      return;
    }
    dash.className += " width";
  };
  const [links, setLinks] = useState(false);
  return (
    <div className={styles.navBarcontainer}>
      <div className={styles.logo}>
        <Image
          src={logoPata}
          alt="logo"
          className={styles.logoPata}
          width={40}
          height={40}
        />
        <h2>Little Paws</h2>
      </div>
      <div className={styles.wrapper}>
        <ul className={styles.ul}>
          <li className={styles.icon}>
            <a href="/home">
              <GrHomeRounded></GrHomeRounded>
            </a>
          </li>
          <div
            className={styles.li}
            onClick={(event) => {
              event.preventDefault();
              setRender("profile");
            }}
          >
            <CgProfile className={styles.iconSize} size={20}></CgProfile>
            <li>
              <a href="">Perfil</a>
            </li>
          </div>
          <div
            className={styles.li}
            onClick={(event) => {
              event.preventDefault();
              setRender("adoptions");
            }}
          >
            <HiHeart className={styles.iconSize} size={20}></HiHeart>
            <li>
              <a href="">Adopciones</a>
            </li>
          </div>
          <div
            className={styles.li}
            onClick={(event) => {
              event.preventDefault();
              setRender("buy");
            }}
          >
            <RiFileList3Fill
              className={styles.iconSize}
              size={20}
            ></RiFileList3Fill>
            <li>
              <a href="">Compras</a>
            </li>
          </div>
          <div
            className={styles.li}
            onClick={(event) => {
              event.preventDefault();
              setRender("publications");
            }}
          >
            <HiDocumentText
              className={styles.iconSize}
              size={20}
            ></HiDocumentText>
            <li>
              <a href="">Publicaciones</a>
            </li>
          </div>
          <div
            className={styles.li}
            onClick={(event) => {
              event.preventDefault();
              handlerClick();
            }}
          >
            <BiLink className={styles.iconSize} size={20}></BiLink>
            <li>
              Links <GrFormDown className={styles.icondown}></GrFormDown>
            </li>
          </div>

          <div className={styles.liLogout}>
            <RiLogoutBoxLine size={20}></RiLogoutBoxLine>
            <li>
              <a href="/api/auth/logout">Cerrar sesión</a>
            </li>
          </div>
        </ul>
        <ul>
          <div className="divHidden" id="hidden">
            <div className={styles.link}>
              <li>
                <FaStar className={styles.iconSize}></FaStar>
                <a href="/favorite">Favoritos</a>
              </li>
            </div>
            <div className={styles.link}>
              <li>
                <BsFillCartFill className={styles.iconSize}></BsFillCartFill>
                <a href="/cart">Carrito</a>
              </li>
            </div>
            <div className={styles.link}>
              <li>
                <FaStar className={styles.iconSize}></FaStar>
                <a href="/petsPosts">Adopta</a>
              </li>
            </div>
            <div className={styles.link}>
              <li>
                <FaStar className={styles.iconSize}></FaStar>
                <a href={`/adoptionForm/${response._id}`}>Publica</a>
              </li>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
