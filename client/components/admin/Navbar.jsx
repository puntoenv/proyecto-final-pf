import styles from "../../pages/admin/admin.module.css";


const NavBar = () => {
  return (
    <div className={styles.conteiner}>
      <span className={styles.hola}>Hola, </span>
      <span className={styles.admin}>Admin!</span>
      {/* <MdKeyboardArrowDown className="text-gray-400 text-14" /> */}
    </div>
  );
};

export default NavBar;
