import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { postDetail } from "../../../stores/actions";
import Card from "../../../components/Card";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.mascotas.detail);
  console.log(detail);
  useEffect(() => {
    dispatch(postDetail(id));
  }, []);

  return(
<>
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
