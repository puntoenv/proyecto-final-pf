import styles from "./landing.module.css";
import Link from "next/link";
import Layout from "./layout";

export default function landingPage() {
  return (
    <div>
      <Layout title="Bienvenidos" />

      
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <div className={styles.img1}></div>
          <div className={styles.img2}></div>
          <div className={styles.img3}></div>
          <div className={styles.img4}></div>
          <div className={styles.img5}></div>
          <div className={styles.img6}></div>
          <div className={styles.img7}></div>
          
          </div>
        </div>

        
<div className={styles.buttonContainer}>
            <Link href="/home" className={styles.button}>
              Entrar
            </Link>

      </div>

      
    </div>
  );
}
