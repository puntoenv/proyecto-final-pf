import Head from "next/head";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import NavBar from "../../components/NavBar/NavBar";
import UpdateUserProfile from "../../components/updateProfile/updateProfile";
import {
  hanldeOnChange,
  handleOnSubmit,
} from "../../controller/validationUpdateP";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { authUser } from "../../stores/actions";

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

export default function UpdateProfile() {

  const { user } = useUser();
  const dispatch = useDispatch();

  const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);

  const userAuth = useSelector((state) => state.userAuth.userData);

  return (
    <>
      {/* <Head>
        <title>Editar perfil</title>
      </Head>
      <NavBar></NavBar> */}
      <LayoutGlobal title={"Profile"} authUser={userAuth}>
        <UpdateUserProfile
          hanldeOnChange={hanldeOnChange}
          handleOnSubmit={handleOnSubmit}
        ></UpdateUserProfile>
      </LayoutGlobal>
    </>
  );
}
