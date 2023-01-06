import styles from "./landing.module.css";
import Link from "next/link";
import Head from "next/head";

export default function landingPage() {
  return (
    <>
      <Head>
        <title>Bienvenidos</title>
      </Head>
      <div className={styles.landing}>
        <Link href="/home">
          <button className={styles.button}>
            Click aqui para ir a la pagina principal
          </button>
        </Link>
      </div>
    </>
  );
}
