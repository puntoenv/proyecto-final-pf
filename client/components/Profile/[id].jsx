import React, { useState } from "react";
import Link from "next/link";
import style from "./styles.module.css";
import styles from "./Loading.module.css";
import {
  HiCheck,
  HiPencilSquare,
  HiCamera,
  HiArrowDownOnSquare,
} from "react-icons/hi2";
import { GoX } from "react-icons/go";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "next/router";
import {
  handleAdoption,
  handleFiles,
  validateForm,
} from "../../controller/validationUpdateP";
import { CgMenuGridR } from "react-icons/cg";
import SideBar from "./SideBar";

export default function Perfil({
  user,
  isLoading,
  response,
  hanldeOnChange,
  handleOnSubmit,
}) {
  const router = useRouter();
  const nameUpper =
    response.name && response.name[0].toUpperCase() + response.name.slice(1);
  const imgAux =
    "https://www.pngkit.com/png/detail/128-1280585_user-icon-fa-fa-user-circle.png";

  const idUser = user?.sub.split("|")[1];

  const [show, setShow] = useState(false)

  const [input, setInput] = useState({
    name: "",
    age: "",
    bio: "",
    image: "",
    ubication: "",
  });

  const [result, setResult] = useState({
    error: "",
    success: "",
  });

  const [error, setError] = useState({
    name: "",
    age: "",
    bio: "",
    image: "",
    ubication: "",
  });

  const [edit, setEdit] = useState({
    name: false,
    age: false,
    bio: false,
    image: false,
    ubication: false,
  });


  return (
    <div className={style.container_caja1}>
      {isLoading && (
        <div className={styles.container}>
          <div className={styles.loader}></div>
          <p>Loading...</p>
        </div>
      )}
      {user && (
        <>
          <div>
            <SideBar></SideBar>
          </div>
          
        </>
      )}
    </div>
  );
}
