import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Perfil from "../../components/Profile/Profile";
import NavBar from "../../components/NavBar/NavBar";
import styles from '../../components/Profile/Loading.module.css'
// import styles from '../styles/profile.module.css'

function Profile(props) {
  const { isLoading } = useUser();
  console.log(props.user);
  return (
    <>
      <NavBar></NavBar>
      <Perfil></Perfil>
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => (
    <div className={styles.container}>
      <div className={styles.loader}>
        <p>Loading...</p>
      </div>
    </div>
  ),
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
