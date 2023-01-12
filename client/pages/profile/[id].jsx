import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Perfil from "../../components/Profile/[id]";
import NavBar from "../../components/NavBar/NavBar";
import styles from "../../components/Profile/Loading.module.css";
import Layout from "../layout";
// import styles from '../styles/profile.module.css'

function Profile({data, response}) {

    const { isLoading, user } = useUser();

  return (
    <>
      <Layout title={"Perfil"}></Layout>
      <NavBar></NavBar>
      <Perfil data={data} user={user} isLoading={isLoading} response={response}></Perfil>
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
      await fetch("http://localhost:3001/user/" + params.id)
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

