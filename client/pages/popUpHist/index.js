import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./styles.module.css";
function index({ response }) {
  const { user } = useUser();
  const userId = user?.sub?.split("|").pop();
  //console.log(userId);
  const { items, payments, id } = response;

  return (
    <>
      <div className={styles.cards}>
        <div className={styles.card}>
          {payments?.map((ite) => {
            return (
              <div>
                <p>{ite.id}</p>
                <p> {ite.date_approved}</p>
                <p>estado de la compra: {ite.status}</p>
                <p>{ite._detail}</p>
              </div>
            );
          })}
          <div>
          {items?.map((item) => {
            return (
              <div>
                <p>{item.title}</p>
                <p>{item.quantity}</p>
                <p>{item.unit_price}</p>
              </div>
            );
          })}
          </div>
          {payments?.map((ite) => {
            return (
              <div>
                <p>{ite.transaction_amount}</p>
                <p>{ite.total_paid_amount}</p>
              </div>
            );
          })}
          <button>
            <Link href={`/profile/${userId}?pos=${id}`}>ok</Link>
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
      },
    };
  } catch (error) {
    console.log(error);
  }
}
