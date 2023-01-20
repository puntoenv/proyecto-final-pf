// export default function getRelated({
//      related,
// }) {
//     const { name, image, price, _id, stock, category, boughtBy } = related;
// }
// export async function getServerSideProps({ params }) {
//     try {
//       const related = await (
//         await fetch(`${process.env.URL_BACK}products/detail/${params.id}`)
//       ).json();
//       return {
//         props: {
//           related,
//         },
//       };
//     } catch (error) {
//       console.log(error);
//     }
//   }
// import { getRelated } from '../../stores/actions'
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// export function related({
//   addToCart,
//   cart,
//   setCart,
//   productOfCart,
//   discountItem,
// }){
//     const dispatch=useDispatch();
//     const products= useSelector((state)=>state.products.productsRelated)
    
//     useEffect(()=>{
//         dispatch(getRelated())
//     },[dispatch])
//     console.log(products)
// }













