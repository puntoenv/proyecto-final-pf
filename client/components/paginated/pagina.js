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
  setMaxPageLimit,
  setMinPageLimit,
}) {
  //console.log(pets);
  let numeroPaginas = [];
  for (let i = 0; i < pets.length / pg; i++) {
    numeroPaginas.push(i + 1);
  }
  //console.log(numeroPaginas);
  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePageClick = (e) => {
    const { id } = e.target;
    page(Number(id));
  };
  //en este apartado se puede manejar el corte de las paginas
  const pagina = numeroPaginas.map((a) => {
    return (
      <div className={styles.container} key={a}>
        <button className={styles.button} id={a} onClick={handlePageClick}>
          {a}
        </button>{" "}
      </div>
    );
  });
  //console.log(pageNumbers);
  let pageIncrementEllipses = null;
  if (numeroPaginas.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.sig_ant}
        onClick={handlePrevClick}
        disabled={curren === numeroPaginas[0]}
      >
        Ant
      </button>
      {/*pageDecremenEllipses*/}
      {pagina}
      {/*pageIncrementEllipses*/}
      <button
        className={styles.sig_ant}
        onClick={handleNextClick}
        disabled={curren === numeroPaginas[numeroPaginas.length - 1]}
      >
        Sig
      </button>
    </div>
  );
}

export default Pagina;

/*  {numeroPaginas.map(a => (<button className={styles.button} key={a} onClick={() => page(a)}>{a}</button>))}*/
/*(page) => {
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
  }*/
