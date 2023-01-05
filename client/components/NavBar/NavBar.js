import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";
import NavItem from "./NavItem";

const menuList = [
  // {
  //     text: 'Home',
  //     href: '/',
  // },
  {
    text: "Adoptar",
    href: "/petAdoption",
  },
  {
    text: "Apóyanos",
    href: "/apoyanos",
  },
  {
    text: "Ingresar | Registrarse",
    href: "/login",
  },
];

const NavBar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={"/"}>
          {/* <a> LOGOOO
                    <h1></h1>
                </a> */}
        </Link>

        <div className={styles.navMenuBar}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={styles.navMenuList}>
          <Link className={styles.link} href="/petAdoption">
            <h1>Adoptar </h1>
          </Link>
          <Link className={styles.link} href="/Apóyanos">
            <h1>Apóyanos </h1>
          </Link>
          <Link className={styles.link} href="/login">
            <h1>Ingresar | Registrarse</h1>
          </Link>
          {/* {
                        menuList.map((menu)=>{
                            return <div key={menu.text}>
                                <NavItem {...menu}/>
                            </div>
                        })
                    } */}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
