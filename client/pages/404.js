import styles from "./404.module.css";
import Link from "next/link";

export default function Error({ location }) {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Ooops, la pagina que estas buscando no existe.
      </h1>
      <div className={styles.btn}>
        <Link href="/home">
          <button>Volver a Inicio</button>
        </Link>
      </div>
    </div>
  );
}
