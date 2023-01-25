import React, { useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Perfil from "../../components/Profile/[id]";
import styles from "../../components/Profile/Loading.module.css";
import style from "./style.module.css";
import Layout from "../layout";
import { authUser } from "../../stores/actions";
import {
  hanldeOnChange,
  handleOnSubmit,
} from "../../controller/validationUpdateP";
import { useDispatch, useSelector } from "react-redux";

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

function Profile({ data, response }) {
  const { isLoading, user } = useUser();
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth.userData);
   const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);
console.log(userAuth)
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
