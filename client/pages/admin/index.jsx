import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Navbar from "../../components/admin/NavBar";
// import ThemeSettings from "../../components/admin/themeSettings";
import Link from "next/link";

import { MdOutlineCancel } from "react-icons/md";
import Products from "../../components/admin/Products";
import styles from "./admin.module.css";
import Pie from '../../components/admin/Pie'
import Calendar from '../../components/admin/Calendar'
import Users from "../../components/admin/Users";
import { useStateContext } from "../../contexts/ContextProvider.js";
import Footer from "../../components/admin/Footer";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function Admin() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    setActiveMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    screenSize,
  } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const [Render, setRender] = useState();

  const handlerOnClick = (e, component) => {
    e.preventDefault;
    setRender(component);
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            {/* <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button> */}
          </TooltipComponent>
        </div>
      </div>
     
      <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
        <Navbar />
      </div>
      
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        {activeMenu && (
          <>
            <div >
              <Link
                href="/"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                 <span>Little Paws</span>
              </Link>
              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: "black" }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
              <div>
                <section>{Render}</section>
              </div>
              
              <div className={styles.sidebar}>
                <div key="customers">
                  <p className="text-gray-400 dark:text-gray-400 m-4 mt-20 uppercase">
                    Dashboard
                  </p>

                  <button
                    className={styles.btn}
                    onClick={(e) =>
                      handlerOnClick(
                        e,
                        <Users />
                      )
                    }
                  >
                    Usuarios
                  </button>
                  <button
                    className={styles.btn}
                    onClick={(e) => handlerOnClick(e, <Products />)}
                  >
                    Productos
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        
      </div>
      {/* <Calendar /> */}
      <Footer />
      </>
  );
}
