import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import styles from "./NavBar.module.css";
import styleDash from "./DashBoardUser.module.css";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={"/"}>
          <span className={styles.logo}>Paw Pet</span>
        </Link>
        <div className={styles.navMenuList}>
          <Link className={styles.itemNav} href="/Apóyanos">
            <span>Apóyanos </span>
          </Link>
          <Link className={styles.itemNav} href="/petAdoption">
            <span>Adoptar </span>
          </Link>
          {true || session ? (
            <span className={styles.btnPerfil}>Perfil</span>
          ) : (
            <Link href="/login" className={styles.itemNav}>
              <span>Ingresar | Registrarse</span>
            </Link>
          )}
        </div>
      </nav>
      <div className={styleDash.dashBoardContain} id="dashNavAdmin">
        <Link className={styleDash.itemDash} href="#">
          <span>Editar Perfil</span>
        </Link>
        <Link className={styleDash.itemDash} href="#">
          <span>Mis Favoritos</span>
        </Link>
        <Link className={styleDash.itemDash} href="#">
          <span>Mi carrito</span>
        </Link>
        <Link className={styleDash.itemDash} href="#">
          <span>Publicar Mascota</span>
        </Link>
        <Link className={styleDash.itemDash} href="#">
          <span>Cerrar sesión</span>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
