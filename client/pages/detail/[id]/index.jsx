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


    {<Card 
    tamaño={detail.size}
    
    
    />}

    </>
  )
}
