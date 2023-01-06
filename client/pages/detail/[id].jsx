import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { postDetail } from "../../stores/actions";
import Card from "../../components/Card";
import { useRouter } from "next/router";

export default function Detail({ data }) {
  console.log(data);
  return <>{<Card tamaño={data.size} />}</>;
}
export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch("http://localhost:3001/pets/detail/" + params.id)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
