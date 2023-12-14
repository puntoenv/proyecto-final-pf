import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Map from "../GoogleMap/Maps";
import { IoLogoInstagram } from "react-icons/io";

const Footer = ({ idUser }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.superFooter}>
        <div className={styles.info}>
          <Link href={"/aboutUs"} className={styles.linksInfoSuper}>
            Nosotros
          </Link>
          <Link href={"/contact"} className={styles.linksInfoSuper}>
            Contactanos
          </Link>
          <a
            target={"_blank"}
            href={"https://www.instagram.com/pets_littlepaws/"}
          >
            <IoLogoInstagram className={styles.icon}></IoLogoInstagram>
          </a>
        </div>
        <div className={styles.info}>
          <span>Nuestra Sede</span>
          <div className={styles.contentMap}>
            <Map coords={{ lat: -34.61315, lng: -58.37723 }} />
          </div>
        </div>
        <div className={styles.info}>
          <Link href={"/eShop"} className={styles.linksInfoSuper}>
            Productos
          </Link>
          <Link href={"/petsPosts"} className={styles.linksInfoSuper}>
            Ver Mascotas
          </Link>
          <Link
            href={`/adoptionForm/${idUser}`}
            className={styles.linksInfoSuper}
          >
            Publica tu mascota
          </Link>
        </div>
      </div>
      <div className={styles.inferFooter}>
        © 2022 Little Paws. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
