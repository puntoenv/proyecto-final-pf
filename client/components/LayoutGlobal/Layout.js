import style from "../../styles/Layout.module.css";
import Head from "next/head";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";

export default function LayoutGlobal({
  children,
  title,
  description,
  authUser,
}) {
  return (
    <div className={style.containLayout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script src="https://sdk.mercadopago.com/js/v2"></script>
      </Head>
      <NavBar authUser={authUser} />

      <main className={style.mainLayout}>{children}</main>
      <Footer />
    </div>
  );
}

LayoutGlobal.defaultProps = {
  title: "Little Paws",
  description: "Esta Pagina esta orientada a la adopcion de mascotas",
};
