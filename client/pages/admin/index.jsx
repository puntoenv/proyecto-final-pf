import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar.jsx";
import Bar from "../../components/admin/Bar";
import Link from "next/link";
import Pie from "../../components/admin/Pie";
import CategPie from "../../components/admin/CategPie";
import Calendar from "../../components/admin/Calendar";
import Products from "../../components/admin/Products";
import styles from "./admin.module.css";
import Users from "../../components/admin/Users";
import Footer from "../../components/admin/Footer";

export default function Admin() {
  const [Render, setRender] = useState();

  const handlerOnClick = (e, component) => {
    e.preventDefault;
    setRender(component);
  };

  useEffect(() => {
    {
      setRender(<Pie />);
    }
  }, []);

  return (
    <>
      <div className="navAd">
        <Navbar />
      </div>
      <div>
        <div>
          <div>
            <button
              onClick={(e) => handlerOnClick(e, <Pie />)}
              className={styles.lp}
            >
              Little Paws
            </button>
          </div>

          <div>
            <section>{Render}</section>
          </div>

          <div className={styles.sidebar}>
            <div key="customers">
              <p className="text-gray-400 dark:text-gray-400 m-1 mt-10 uppercase">
                Dashboard
              </p>

              <button
                className={styles.btn}
                onClick={(e) => handlerOnClick(e, <Users />)}
              >
                Usuarios
              </button>
              <button
                className={styles.btn}
                onClick={(e) => handlerOnClick(e, <Products />)}
              >
                Productos
              </button>

              <button
                className={styles.btn}
                onClick={(e) => handlerOnClick(e, <Calendar />)}
              >
                Calendario
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
