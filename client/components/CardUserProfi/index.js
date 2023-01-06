import Card from "../../components/Card"

function index({id, username, img, pets, favorites, cart, bough}) {
  const { name, size, age, description, image, type, location, gender} = pets
 
  return (
    <>
    <h2>{id}</h2>
    <h2>Bienvenido, {username}</h2>
    <img src={img} width={100} height={100} alt="imagen del usuario" />
    <h2>pets</h2>
    <Card
    key={name}
    nombre={name}
    imagen={image}
    edad={age}
    genero={gender}
    tamaño={size}
    tipo={type}
    locacion={location}
    />
   <h2>favoritos</h2>
   <Card
    key={favorites.name}
    nombre={favorites.name}
    imagen={favorites.image}
    edad={favorites.age}
    genero={favorites.gender}
    tamaño={favorites.size}
    tipo={favorites.type}
    locacion={favorites.location}
    />
    <h2>carrito</h2>
    <h2>compras realizadas</h2>
    </> 
  )
}

export default index