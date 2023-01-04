import styles from "../styles/landing.module.css";
import Link from "next/link";
import Head from "next/head";
export default function () {
  return (
    <div className={styles.landing}>
      <Head>
        <title>Bienvenidos</title>
      </Head>
      <Link href="/home">
        <button className={styles.button}>
          Click aquí para ir a la pagina principal
        </button>
      </Link>
    </div>
  );
}
