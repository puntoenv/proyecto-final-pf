import React from "react";
import HistoryEsh from "./HistoryEsh"
import Petscrea from "./petscreate";
import ContentProfile from "./Profile/contentProfile";
import styles from "./styles.module.css";

const ContentUser = ({
  response,
  user,
  handleOnSubmit,
  hanldeOnChange,

  render,

}) => {
  console.log(render);
  return (
    <div className={styles.contentcontainer}>
      {render === "profile" && (
        <ContentProfile
          response={response}
          user={user}
          handleOnSubmit={handleOnSubmit}
          hanldeOnChange={hanldeOnChange}
        ></ContentProfile>
      )}
      {render === "adoptions" && <h1>Adopciones</h1>}
      {render === "publications" && <Petscrea response={response}></Petscrea>}
      {render === "buy" && <HistoryEsh response={response}></HistoryEsh>}
    </div>
  );
};

export default ContentUser;
