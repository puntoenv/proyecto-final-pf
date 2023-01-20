import React from "react";
import styles from "./styles.module.css";
import logoPata from "../../img/pata_logo_claro.png";
import Image from "next/image";
import { GrHomeRounded } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { HiDocumentText, HiHeart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";

const SideBar = () => {
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
        <ul>
          <li className={styles.icon}>
            <a href="/home">
              <GrHomeRounded className={styles.iconSize}></GrHomeRounded>
            </a>
          </li>
          <div className={styles.li}>
            <CgProfile size={20}></CgProfile>
            <li>
              <a href="">Perfil</a>
            </li>
          </div>
          <div className={styles.li}>
            <HiHeart size={20}></HiHeart>
            <li>
              <a href="">Adopciones</a>
            </li>
          </div>
          <div className={styles.li}>
            <HiDocumentText size={20}></HiDocumentText>
            <li>
              <a href="">Publicaciones</a>
            </li>
          </div>
          <div className={styles.li}>
            <FaStar size={20}></FaStar>
            <li>
              <a href="">Favoritos</a>
            </li>
          </div>
          <div className={styles.li}>
            <BsFillCartFill size={20}></BsFillCartFill>
            <li>
              <a href="">Carrito</a>
            </li>
          </div>
          <div className={styles.liLogout}>
            <RiLogoutBoxLine size={20}></RiLogoutBoxLine>
            <li >
              <a href="/api/auth/logout">Cerrar sesión</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
