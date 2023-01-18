import Link from "next/link";
import styles from "./styles.module.css";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
function index({ favorite, DeletFavori }) {
  console.log(favorite);
  const handleClick = () => {
    console.log("soy el formulario");
  };
  return (
    <LayoutGlobal>
      <div className={styles.cards}>
        {!favorite.length ? (
          <h1 className={styles.favoritoVacio}>la lista esta vacia</h1>
        ) : (
          favorite?.map((items) => (
            <div className={styles.card}>
              <img
                className={styles.card__image}
                src={items.image}
                alt="imagen de la mascota"
              />
              <button
                className={styles.delet}
                onClick={() => DeletFavori(items._id)}
              >
                x
              </button>
              <div className={styles.card__overlay}>
                <div className={styles.card__header}>
                  <Link href={`/detail/${items._id}`}>
                    <h3 className={styles.card__title}>
                      {items.name.toUpperCase()}
                    </h3>
                  </Link>
                  {items.gender ? (
                    <p className={styles.card__status}>{items.gender}</p>
                  ) : null}
                </div>
                <h3 className={styles.card__description}>
                  {items.description}
                </h3>
                <button className={styles.btn} onClick={() => handleClick()}>
                  formulario
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </LayoutGlobal>
  );
}

export default index;
