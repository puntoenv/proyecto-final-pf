
import styles from "./styles.module.css"

function Comments({star_reviews}) {
    
  return (
    <div className={styles.container} >
        
 {  star_reviews?.map((ite)=> {
    return (
        <div className={styles.container_1}>
        <p className={styles.title}>Puntuacion</p>
        <p className={styles.frase}>{ite.stars}</p>
        <p className={styles.title}>Reseñas</p>
        <p className={styles.frase}>{ite.reviews}</p>
        </div>
    )
 }) }
    </div>
  )
}

export default Comments