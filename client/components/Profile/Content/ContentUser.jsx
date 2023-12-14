import React from "react";
import AdoptHistory from "./AdoptionHistory/adoptionHistory";
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
      {render === "adoptions" && <AdoptHistory response={response}></AdoptHistory>}
      {render === "publications" && <Petscrea response={response}></Petscrea>}
      {render === "buy" && <HistoryEsh response={response}></HistoryEsh>}
    </div>
  );
};

export default ContentUser;
