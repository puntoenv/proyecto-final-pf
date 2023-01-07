import styles from "./style.module.css";
function Pagina({
  pets,
  pg,
  page,
  onPrevClick,
  onNextClick,
  curren,
  maxPageLimit,
  minPageLimit,
}) {
  let numeroPaginas = [];
  for (let i = 0; i < pets.length - 1 / pg; i++) {
    numeroPaginas.push(i);
  }
  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePageClick = (e) => {
    page(Number(e.target.id));
  };
  const pageNumbers = numeroPaginas.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={curren === page ? "active" : null}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });
  let pageIncrementEllipses = null;
  if (numeroPaginas.length > maxPageLimit) {
    pageIncrementEllipses = (
      <button className={styles.button} onClick={handleNextClick}>
        {numeroPaginas}
      </button>
    );
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = (
      <button className={styles.button} onClick={handlePrevClick}>
        {numeroPaginas}
      </button>
    );
  }

  return (
    <div>
      <button
        className={styles.button}
        onClick={handlePrevClick}
        disabled={curren === numeroPaginas[0]}
      >
        Prev
      </button>
      <button className={styles.button}>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
      </button>
      <button
        className={styles.button}
        onClick={handleNextClick}
        disabled={curren === numeroPaginas[numeroPaginas.length - 1]}
      >
        Next
      </button>
      pagina
    </div>
  );
}

export default Pagina;

/*  {numeroPaginas.map(a => (<button className={styles.button} key={a} onClick={() => page(a)}>{a}</button>))}*/
