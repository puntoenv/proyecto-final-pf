import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Perfil from "../../components/Profile/[id]";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import Petscrea from "../../components/petscreate";
import HistoryEsh from "../../components/HistoryEsh";
import styles from "../../components/Profile/Loading.module.css";
import style from "./style.module.css";
import Layout from "../layout";
import {
  hanldeOnChange,
  handleOnSubmit,
} from "../../controller/validationUpdateP";

function Profile({ data, response }) {
  const { isLoading, user } = useUser();

  return (
    <LayoutGlobal>
      <div className={style.container}>
        <Layout title={"Perfil"}></Layout>
        <Perfil
          data={data}
          response={response}
          hanldeOnChange={hanldeOnChange}
          handleOnSubmit={handleOnSubmit}
          user={user}
          isLoading={isLoading}
        ></Perfil>
      </div>
      <div>
        {
          <div className={style.container_history}>
            <Petscrea response={response} />
            <HistoryEsh response={response} />
          </div>
        }
      </div>
    </LayoutGlobal>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => (
    <div className={styles.container}>
      <div className={styles.loader}></div>
      <p>Loading...</p>
    </div>
  ),
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});

export async function getServerSideProps({ params }) {
  try {
    const response = await (
      await fetch(
        "https://proyecto-final-pf-production.up.railway.app/user/" + params.id
      )
    ).json();
    return {
      props: {
        response,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
