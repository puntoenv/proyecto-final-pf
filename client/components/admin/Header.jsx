import React from "react";
import styles from "../../styles/admin/admin.module.css";
//import Image from "../../images/watermark.png";

function Header({ category, title }) {
	return (


<div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>

		// <div className={styles.headcontainer}>
		// 	<div className={styles.headwrapper}>
		// 		<div className={styles.title}>
		// 			<h2>
		// 				Hola, <span>Admin</span>
		// 			</h2>
					
		// 		</div>
		// 		<div className={styles.profile}>
		// 			{/* <img src={Image} alt="profile" className={styles.image} /> */}
		// 		</div>
		// 	</div>
		// </div>
	);
}

export default Header;