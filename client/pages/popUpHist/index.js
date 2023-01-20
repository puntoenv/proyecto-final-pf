import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import {buyAndStock} from "../../controller/buyAndStock"
import { useEffect, useState } from "react";
import axios from "axios";

function index({ response, query }) {
  const [order, setOrder] = useState(" ");
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.sub?.split("|").pop();
  console.log(query);
  const { items, payments, id } = response;

  const handlerEmail = async (e) => {
    e.preventDefault();
    if (query.status === "approved") await axios.get(`/buyEmail/${userId}`);
    // router.push(`/profile/${userId}?pos=${id}`);
  };
  
   if(payments[0].status=="approved"&& query.merchant_order_id!=order ){ buyAndStock(); setOrder(query.merchant_order_id)}
 
  

  return (
    <>
      <div className={styles.cards}>
        <div className={styles.card}>
          {payments?.map((ite) => {
            return (
              <div>
                <p>{ite.id}</p>
                <p>{ite.date_approved}</p>
                <p>{ite.status}</p>
                <p>{ite._detail}</p>
              </div>
            );
          })}
          {items?.map((item) => {
            return (
              <div>
                <p>{item.title}</p>
                <p>{item.quantity}</p>
                <p>{item.unit_price}</p>
              </div>
            );
          })}
          {payments?.map((ite) => {
            return (
              <div>
                <p>{ite.transaction_amount}</p>
                <p>{ite.total_paid_amount}</p>
              </div>
            );
          })}
          <button onClick={(e) => handlerEmail(e)}>
            Enviar correo de confirmación
          </button>
        </div>
      </div>
    </>
  );
}

export default index;

export async function getServerSideProps({ query }) {
  try {
    const response = await (
      await fetch(`http://localhost:3001/payment/${query.merchant_order_id}`)
    ).json();
    return {
      props: {
        response,
        query,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
