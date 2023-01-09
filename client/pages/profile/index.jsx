import React, { useState, useEffect } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
// import styles from '../styles/profile.module.css'

function Profile(props) {
  const { isLoading } = useUser();
  console.log(props.user);
  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {props.user && (
        <>
          <a href="/api/auth/logout">Logout</a>
          <div>
            <img src={props.user.picture} />
            <h1>{props.user.name}</h1>
          </div>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <h1>Loading...</h1>,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
