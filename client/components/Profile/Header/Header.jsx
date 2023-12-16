import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import logo from "../../../img/logo.jpeg";
import Link from "next/link";

const HeaderTest = ({ user, response, setRender, authUser }) => {
  const handlerClick = () => {
    const dash = document.getElementById("sideBarUser");

    if (dash.className.includes("viewSideBarUser")) {
      dash.classList.remove("viewSideBarUser");
      return;
    }
    dash.className += " viewSideBarUser";
  };

  return (
    <div className={styles.headContainer}>
      <div className={styles.haedwrapper}>
        <div
          className={styles.profile}
          // onClick={(event) => {
          //   event.preventDefault();
          //   setRender("profile");
          // }}
          style={{ zIndex: 40001 }}
        >
          <img
            src={authUser.image ? authUser.image : user.picture}
            className={styles.image}
            onClick={handlerClick}
          ></img>
          <Link href={"/home"}>
            <Image src={logo} className={styles.logo}></Image>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderTest;
