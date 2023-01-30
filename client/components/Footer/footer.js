import React from "react";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      © 2022 Little Paws. All Rights Reserved{" "}
      <Link
        href={"/aboutUs"}
        style={{ marginLeft: "30px", fontSize: "20px", fontWeight: "bold" }}
        className={styles.link}
      >
        Nosotros
      </Link>
    </div>
  );
};

export default Footer;
