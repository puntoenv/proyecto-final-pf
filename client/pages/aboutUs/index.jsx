import About from "../../components/aboutUs";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import styles from "./styles.module.css";
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

const AboutUs = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);

  const userAuth = useSelector((state) => state.userAuth.userData);
  return (
    <LayoutGlobal authUser={userAuth}>
      <About></About>
    </LayoutGlobal>
  );
};

export default AboutUs;
