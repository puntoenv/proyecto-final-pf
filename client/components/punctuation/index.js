import { useState } from "react";
import styles from "./styles.module.css";
function index({ response }) {

  const [puntu, setpuntu] = useState([0]);
 

//console.log(revi)
const handlerClick = (e) => {
  const {value} = e.target;
setpuntu([...puntu,parseInt(value)])
}
  return (
    <div>
<form className={styles.rating}>
  <label>
    <input type="radio" name="stars" value="1" onClick={(e)=> handlerClick(e)}/>
    <span className={styles.icon}>★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="2" onClick={(e)=> handlerClick(e)}/>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="3" onClick={(e)=> handlerClick(e)}/>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>   
  </label>
  <label>
    <input type="radio" name="stars" value="4" onClick={(e)=> handlerClick(e)}/>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="5" onClick={(e)=> handlerClick(e)}/>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
    <span className={styles.icon}>★</span>
  </label>
</form>
    </div>
  );
}

export default index;
