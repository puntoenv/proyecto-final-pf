import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";
import { authUser } from "../../stores/actions";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import s from "./styles.module.css";
import {
  validationName,
  validationEmail,
  validationMsg,
} from "../../controller/ContactUs/validations";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { GrInstagram } from "react-icons/gr";

const fn = (user, dispatch, setNumCall) => {
  if (user) {
    const sub = user.sub.split("|");
    if (sub[0] === "google-oauth2") {
      dispatch(
        authUser(`${user.nickname}@gmail.com`, user.name || user.nickname)
      );
    } else {
      dispatch(authUser(user.name, null));
    }
  }
  setNumCall(1);
};

const Contact = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);

  const userAuth = useSelector((state) => state.userAuth.userData);

  const [message, setMessage] = useState({
    name: "",
    email: "",
    msg: "",
  });

  const [submit, setSubmit] = useState(true);

  const handlerChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setSubmit(validationName(value));
    if (name === "email") setSubmit(validationEmail(value));
    if (name === "msg") setSubmit(validationMsg(value));

    setMessage({
      ...message,
      [name]: value,
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (!submit) {
      const msg = await axios.post(`/contact-us`, message);
      const succes = msg.data;

      if (!succes.error) {
        Swal.fire({
          title: `${succes.message}. En breve te responderemos`,
          icon: "success",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",
        });
      } else {
        Swal.fire({
          title:
            "Error. Intentalo de nuevo y si el problema persiste intentelo más tarde",
          icon: "error",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",
        });
      }
    } else {
      Swal.fire({
        title: "Por Favor completa correctamente los campos",
        icon: "error",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
    }
    setMessage({ name: "", email: "", msg: "" });
  };

  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: process.env.NEXT_PUBLIC_APP_CHATBOT_ID,
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, [])

  return (
    <LayoutGlobal authUser={userAuth}>
      <div className={s.mainContainer}>
        <div className={s.contentForm}>
          <hr className={s.hrTop} />
          <div className={s.contentLogoTip}>
            <p className={s.pHeader}>
              Recuerda que puedes resolver tus dudas con nuestro chat
              automático. Si tienes algún problema o necesitas soporte por parte
              del personal de Little Paws contáctanos por medio de este
              formulario
            </p>
            <div className={s.logoPaw}></div>
            <a
              target={"_blank"}
              className={s.hrefInsta}
              href="https://www.instagram.com/pets_littlepaws/"
            >
              <GrInstagram className={s.iconInsta}></GrInstagram>
            </a>
          </div>
          <form action="" className={s.formContact} onChange={handlerChange}>
            <label name="name" className={s.labelName}>
              Nombre y apellido
              <span id="spanErrorName" className={s.spanError}>
                Debes ingresar al menos 6 caracteres
              </span>
              <input
                type="text"
                name="name"
                className={s.inputName}
                value={message.name}
              />
            </label>
            <label name="email" className={s.labelEmail}>
              Email
              <span id="spanErrorEmail" className={s.spanError}>
                Ingresa un mail valido
              </span>
              <input
                type="text"
                name="email"
                className={s.inputEmail}
                value={message.email}
              />
            </label>
            <label name="msg" className={s.labelMsg}>
              Dejanos tu mensaje
              <span id="spanErrorMsg" className={s.spanError}>
                Debes ingresar al menos 30 caracteres
              </span>
              <textarea
                className={s.textAreaMsg}
                name="msg"
                value={message.msg}
              />
            </label>
            <button className={s.button} onClick={handlerSubmit}>
              Enviar
            </button>
          </form>

          <hr className={s.hrBottom} />
        </div>
      </div>
    </LayoutGlobal>
  );
};

export default Contact;
