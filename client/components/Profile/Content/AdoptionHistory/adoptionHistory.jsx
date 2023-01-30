import React from "react";
import HistoryVacio from "../../../CompoRelle";
import Link from "next/link";
import { BsClockHistory } from "react-icons/bs";
import { MdDoneAll } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import styles from "./styles.module.css";

const AdoptHistory = ({ response }) => {
  const { petsAdopted } = response;
  console.log(response);
  return (
    <>
      <h1 className={styles.letra}>Tus Adopciones</h1>
      {petsAdopted.length === 0 ? (
        <div className={styles.letra}>
          <HistoryVacio></HistoryVacio>
        </div>
      ) : (
        <div className={styles.container_post}>
          {petsAdopted.map((ele) => (
            <div className={styles.card}>
              <img
                className={styles.img}
                src={ele.image[0]}
                style={{
                  border:
                    ele.adopted.status === "pending"
                      ? "2px solid #d35908"
                      : ele.adopted.status === "resolved"
                      ? "2px solid green"
                      : ele.adopted.status === "rejected" && "2px solid red",
                }}
              />
              <h1 className={styles.name}>
                {ele.name.length > 10 && !ele.name.includes(" ")
                  ? ele.name.slice(0, 10).toUpperCase()
                  : ele.name.toUpperCase()}
              </h1>
              <div className={styles.status}>
                Estado:{" "}
                {ele.adopted.status === "pending" ? (
                  <>
                    <BsClockHistory
                      size={18}
                      style={{ color: "#d35908" }}
                    ></BsClockHistory>
                    <p>Pendiente</p>
                  </>
                ) : ele.adopted.status === "resolved" ? (
                  <>
                    <MdDoneAll size={19} style={{ color: "green" }}></MdDoneAll>
                    <p>Resuelta</p>
                  </>
                ) : (
                  ele.adopted.status === "rejected" && (
                    <>
                      <VscError size={20} style={{ color: "red" }}></VscError>
                      <p>Rechazada</p>
                    </>
                  )
                )}
              </div>
              <Link className={styles.btn} href={`/detail/${ele._id}`}>
                Ver detalle
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdoptHistory;
