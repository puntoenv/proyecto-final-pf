import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
       <Head>
          <title>Home</title>
        </Head>
      <div className={styles.home}>
        
          <nav className={styles.navBar}>
            <Link href="/adoptar">
              <h1>Adoptar| </h1>
            </Link>
            <Link href="/Apóyanos">
              <h1>Apóyanos | </h1>
            </Link>
            <Link href="/ingresoRegistro">
              <h1>Ingresar | Registrarse</h1>
            </Link>
          </nav>

          <div>
             <form className={styles.searchBar} > 
                <input className={styles.inputSearch} type="text" placeholder="Buscador..." />
                <button className = {styles.buttonSearch} type="submit">Buscar</button>
            </form> 
        </div>

        <div className={styles.sobreNosotros}>About us</div>
        
      </div>
    </>
  );
}
