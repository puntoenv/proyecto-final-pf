import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from "../../components/Card"
import {getper,getmuni} from '../../stores/actions'
import Pagina from '..//../components/paginated/pagina'
 let mock =[ {
    id: 123, 
    name: "ju",
    size: "mediano",
    age: 4,
    description: "ff",
    image: "https://images.unsplash.com/photo-1591871937631-2f64059d234f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    type: "aves",
    location: {
        provincia: "Misiones",
        municipio: "Apóstoles"
    },
    gender: "masculino"
}]
function index() {
  
  const dispatch = useDispatch()
  const provi = useSelector(state => state.caracter.provi.provincias)
  const munici = useSelector (state => state.caracter.municipios.municipios)
   const [deta, setdeta] = useState(
    {
      size:'',
      type:'',
      age:'',
      gender:'',
      location:{}
    }
   )
 console.log(deta)
   useEffect(() => {
    dispatch(getper())
  }, [])

   const handelprovincia = (e) => {
       const {name, value} = e.target;
       e.preventDefault()
       dispatch(getmuni(value))
       setdeta({...deta,[name]:{provincia:value}})
   }
   const handelciudad = (e)=> {
    const {name, value} = e.target;
    e.preventDefault()
    setdeta({...deta,[name]:{...deta.location,municipio:value}})
}
    const handelselector = (e) => {
      const {name, value} = e.target;
      e.preventDefault()
      setdeta({...deta,[name]:value})
    }
    const handenumber = (e)=> {
      const {name, value} = e.target;
      e.preventDefault()
      const number = parseInt(value)
      number > 0 && number <=20? setdeta({...deta,[name]:value}) : console.log('error')
  }

  return (
    <>
    <form >
    <h2>filtros</h2>
    <p></p>
    <select name="size" onChange={(e)=> handelselector(e)}>
            <option disabled>Seleccione el tipo de tamaño...</option>
            <option key="grande" value="grande">grande</option>
            <option key="mediano" value="mediano">mediano</option>
            <option key="pequeño" value="pequeño">pequeño</option>
    </select>
    <p></p>
    <p></p>
    <input type='number' name='age' placeholder='Ingrese la edad' onChange={(e)=>{handenumber(e)}} />
    <p></p>
    <select name="type" onChange={(e)=> handelselector(e)}>
      <option disabled>tipo</option>
      <option key="gatos" value="gatos">gatos</option>
      <option key="perros" value="perros">perros</option>
      <option key="aves" value="aves">aves</option>
      <option key="peces" value="peces">peces</option>
    </select>
    <p></p>
    <select name="location" onChange={(e)=> handelprovincia(e)}>
        <option>provincia</option>
        {provi?.map((el) => <option key={el.nombre} value={el.nombre}>{el.nombre}</option>)}
    </select>
    <p></p>
    <select name="location" onChange={e=> handelciudad(e)}>
        <option>ciudad</option>
        {munici?.map((el) => <option key={el.nombre} value={el.nombre}>{el.nombre}</option>)}
       
    </select>
    <p></p>
    <p></p>
    <select name="gender" onChange={e=> handelselector(e)}>
        <option>genero</option>
        <option key="masculino" value="masculino">masculino</option>
        <option key="femenino" value="femenino">femenino</option>
    </select>
    </form>
    <p></p>
    <h2>cards</h2>
    {mock.map((detail)=><Card
    key={detail.id}
    nombre={detail.name}
    edad={detail.age}
    genero={detail.gender}
    tamaño={detail.size}
    tipo={detail.type}
    locacion={detail.location}
    />)}
   {<Pagina></Pagina>}
    </>
  )
}

export default index