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
  console.log(response);
  const { items, payments, id } = response;

  const handlerEmail = async (e) => {
    e.preventDefault();
    if (query.status === "approved") await axios.get(`/buyEmail/${userId}`);
    router.push(`/home`);
  };

  
   if(payments[0].status=="approved"&& query.merchant_order_id!=order ){ buyAndStock(); setOrder(query.merchant_order_id)}
 
  


  return (
    <>
      <div className={styles.cards}>
        <div className={styles.card}>
          {payments?.map((ite) => {
            return (
              <div className={styles.items_info}>
                <p>{ite.id}</p>
                <p> {ite.date_approved}</p>
                <p>estado de la compra: {ite.status}</p>
                <p>{ite._detail}</p>
              </div>
            );
          })}
          <h1 className={styles.title}>Factura de Venta</h1>
          <div className={styles.product}>
            <ul className={styles.items_Compras}>
              <li>Productos</li>
              <li className={styles.li}>Und</li>
              <li>Total</li>
            </ul>
            {items?.map((item) => {
              return (
                <ul className={styles.items_Compras}>
                  <li>{item.title}</li>
                  <li className={styles.li}>{item.quantity}</li>
                  <li> $ {item.unit_price}</li>
                </ul>
              );
            })}
          </div>
          {payments?.map((ite) => {
            return (
              <div className={styles.total}>
                <p>Total $ {ite.transaction_amount}</p>
                <p>Total mas intereses $ {ite.total_paid_amount}</p>
              </div>
            );
          })}
          <h1 className={styles.title}>Gracias por su compra!</h1>
          <button onClick={(e) => handlerEmail(e)} className={styles.btn}>
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
