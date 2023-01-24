import Image from "next/image";
import React from 'react'
import Link from "next/link";
import styles from "./styles.module.css";

export default function Card({ id, nombre, imagen, genero }) {
  return (
    <div className={styles.card}>
      <Link href={`/detail/${id}`}>
        <h3>{nombre.toUpperCase()}</h3>
      </Link>
      <Image src={imagen} width={100} height={100} alt="imagen de la mascota" />
      {genero ? <p>Género: {genero}</p> : null}
    </div>
  );
}
