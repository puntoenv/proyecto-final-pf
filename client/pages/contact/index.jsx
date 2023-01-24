import React, { useState } from "react";
import axios from "axios";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import s from "./styles.module.css";
import {
  validationName,
  validationEmail,
  validationMsg,
} from "../../controller/ContactUs/validations";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Contact = () => {
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
      const msg = await axios.post(
        `https://proyecto-final-pf-production.up.railway.app/contact-us`,
        message
      );
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
  };

  return (
    <LayoutGlobal>
      <div className={s.mainContainer}>
        <form action="" className={s.formContact} onChange={handlerChange}>
          <p className={s.pHeader}>
            Recuerda que puedes resolver tus dudas con nuestro chat automático.
            Si tienes algún problema o necesitas soporte por parte del personal
            de Little Paws contáctanos por medio de este formulario
          </p>
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
            Button
          </button>
        </form>
      </div>
    </LayoutGlobal>
  );
};

export default Contact;
