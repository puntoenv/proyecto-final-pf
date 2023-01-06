
function Pagina({pets, pg, page}) {
  let numeroPaginas = [];
  for (let i = 0; i < (pets.length / pg); i++) {
    numeroPaginas.push(i + 1);
  }
   
  return (
    <div>
      {numeroPaginas.map(a => (<button key={a} onClick={() => page(a)}>{a}</button>))}
      pagina
      </div>
  )
}

export default Pagina