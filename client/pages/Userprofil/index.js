import { useEffect } from "react";
//import CardUserProfi from "../../components/CardUserProfi/index"
import { GetUs } from "..//..//stores/actions";
import { useDispatch, useSelector } from "react-redux";
function index() {
  const f = useSelector((sta) => sta.user.usurio);

  console.log(f);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUs());
  }, []);
  return <>hola</>;
}

export default index;
