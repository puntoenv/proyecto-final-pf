import React, { useState } from "react";
import style from "./styles.module.css";
import styles from "./Loading.module.css";
import "sweetalert2/src/sweetalert2.scss";
import SideBar from "./SideBar/SideBar";
import HeaderTest from "./Header/Header";
import ContentUser from "./Content/ContentUser";

export default function Perfil({
  user,
  isLoading,
  response,
  hanldeOnChange,
  handleOnSubmit,
  authUser,
}) {
  const [render, setRender] = useState("adoptions");

  return (
    <div className={style.container_caja1}>
      {isLoading && (
        <div className={styles.container}>
          <div className={styles.loader}></div>
          <p>Loading...</p>
        </div>
      )}
      {authUser && (
        <>
          <div>
            <SideBar
              render={render}
              setRender={setRender}
              response={response}
              authUser={authUser}
            ></SideBar>
            <HeaderTest
              user={user}
              response={response}
              setRender={setRender}
              authUser={authUser}
            ></HeaderTest>
            <ContentUser
              response={response}
              user={user}
              handleOnSubmit={handleOnSubmit}
              hanldeOnChange={hanldeOnChange}
              render={render}
            ></ContentUser>
          </div>
        </>
      )}
    </div>
  );
}
