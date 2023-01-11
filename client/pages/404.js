//import error from "..styles/error.module.css"
import Link from 'next/link';
//import errorPage from "../../img/errorPage.png"




const Error = ({location}) => {


    return (
        <div>
        <div >
            {/* <img className={error.img} src={errorPage} alt="Page Error" /> */}
            <h2 >Ooops, la pagina que estas buscando no existe.</h2>
            {/* <h3 >La URL solicitada <code>{location.pathname}</code> no se encontró en este servidor.</h3> */}
            <Link href="/home" ><button>Volver a Inicio</button></Link>
        </div> 

    </div>
    );
}

export default Error