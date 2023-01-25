import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Perfil from "../../components/Profile/[id]";
import styles from "../../components/Profile/Loading.module.css";
import style from "./style.module.css";
import Layout from "../layout";
import {
  hanldeOnChange,
  handleOnSubmit,
} from "../../controller/validationUpdateP";
import { useSelector } from "react-redux";

function Profile({ data, response }) {
  const { isLoading, user } = useUser();
  const userAuth = useSelector((state) => state.userAuth.userData);

  return (
    <>
      <div className={style.container}>
        <div>
          <Layout title={"Perfil"}></Layout>
          <Perfil
            data={data}
            response={response}
            hanldeOnChange={hanldeOnChange}
            handleOnSubmit={handleOnSubmit}
            user={user}
            isLoading={isLoading}
            authUser={userAuth}
          ></Perfil>
        </div>
      </div>
    </>
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
      await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}user/${params.id}`)
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
