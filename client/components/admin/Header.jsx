import React from 'react';
import styles from '../../pages/admin/admin.module.css'
export default function Header  ({ category, title })  {
  return(
  <div>
    {/* <p className="text-lg text-gray-400">{category}</p> */}
    <p className="text-3xl mb-8 mt-32 font-extrabold tracking-tight text-gray-600 text-slate-900">
      {title}
    </p>
  </div>)
}


