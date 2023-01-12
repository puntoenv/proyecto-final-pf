import Head from "next/head";
import NavBar from "../../components/NavBar/NavBar";
import UpdateUserProfile from "../../components/updateProfile/updateProfile";
import { hanldeOnChange, handleOnSubmit } from "../../controller/validationUpdateP";


export default function UpdateProfile() {
  return (
    <>
      <Head>
        <title>Editar perfil</title>
      </Head>
      <NavBar></NavBar>
      <UpdateUserProfile hanldeOnChange={hanldeOnChange} handleOnSubmit={handleOnSubmit}></UpdateUserProfile>
    </>
  );
}

