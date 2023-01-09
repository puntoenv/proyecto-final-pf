import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Perfil from "../../components/Profile/Profile";
import NavBar from "../../components/NavBar/NavBar";
import styles from "../../components/Profile/Loading.module.css";
import Layout from "../layout";
// import styles from '../styles/profile.module.css'

function Profile(props) {
  const { isLoading } = useUser();
  console.log(props.user);
  return (
    <>
      <Layout title={"Perfil"}></Layout>
      <NavBar></NavBar>
      <Perfil></Perfil>
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
