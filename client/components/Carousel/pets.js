import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPets } from '../stores/actions'
import Card from './Card'


  export default function Pets(){
 
    const data= useSelector(data=> data.mascotas.mascotas)
      
      const dispatch= useDispatch()
      useEffect(()=>{
        dispatch(getPets())
      },[]);
      
     
}
