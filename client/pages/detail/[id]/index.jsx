import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { postDetail } from "../../../stores/actions";
import Card from "../../../components/Card";
import { useRouter } from 'next/router'

export default function Detail() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.mascotas.detail);
   console.log(detail);
  useEffect(() => {
    dispatch(postDetail(id));
  }, []);
console.log(id);
  return(
<>

      {/* <h1>{detail[0].name}</h1> */}

    {/* <h1>{detail.name}</h1>

    <div>
        {detail.image ? (<img src={detail.image} alt={detail.name}/>) : null}
    </div>

    <p>{detail.size}</p>
    <p>{detail.gender}</p>
    <p>{detail.age}</p>
    <p>{detail.location}</p>
    <p>{detail.description}</p> */}
    {<Card 
    tamaño={detail.size}
    
    
    />}

    </>
  )
}
