import style from "../../styles/Layout.module.css";
import Head from "next/head";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
export default function LayoutGlobal({
  children,
  title,
  description,
  authUser,
}) {
  const router = useRouter();
  const userAuth = useSelector((state) => state.userAuth.userData);
  userAuth.hidden === true
    ? Swal.fire({
        title: "Su cuenta ha sido bloqueada ",
        text: "Ha infringido nuestras normas, por lo que ya no tiene permiso para utilizar la plataforma ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#616161",
        cancelButtonColor: "#d33",
        cancelButtonText: "Salir",
        confirmButtonText: "Reclamar",
        allowEscapeKey: false,
        allowEnterKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.dismiss) {
          router.push("/api/auth/logout");
        }
        if (result.isConfirmed) {
          Swal.fire({
            showCancelButton: true,
            showConfirmButton: false,
            title: "Escribinos",
            text: "Mail: littlePaws0508@gmail.com",
            cancelButtonColor: "#d33",
            cancelButtonText: "Salir",
            allowEscapeKey: false,
            allowEnterKey: false,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.dismiss) router.push("/api/auth/logout");
          });
        }
      })
    : null;

  return (
    <div className={style.containLayout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script src="https://sdk.mercadopago.com/js/v2"></script>
      </Head>
      <NavBar authUser={authUser} />

      <main className={style.mainLayout}>{children}</main>
      <Footer idUser={authUser._id} />
    </div>
  );
}

LayoutGlobal.defaultProps = {
  title: "Little Paws",
  description: "Esta Pagina esta orientada a la adopcion de mascotas",
};
