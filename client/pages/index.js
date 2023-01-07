import styles from "../pages/Landing.module.css";
import Link from "next/link";
import Head from "next/head";

export default function landingPage() {
  return (
    < >
    
      <Head >
        <title>Bienvenidos</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"/>
      </Head>
      
    <div className= {styles.container}>
      <div className= {styles.containerImg}>
      <div className= {styles.img1}></div>
      <div className= {styles.img2}></div>
      <div className= {styles.img3}></div>
      <div className= {styles.img4}></div>
      <div className= {styles.img5}></div>
      <div className= {styles.img6}></div>
      <div className= {styles.img7}></div>
      <div className={styles.buttonContainer}>
        <div>
        <Link href="/home">
          <button className= {styles.button}>
            Entrar
          </button>
        </Link>
        </div>
      </div>
      </div>
      
     </div>
    </>
  );
}
