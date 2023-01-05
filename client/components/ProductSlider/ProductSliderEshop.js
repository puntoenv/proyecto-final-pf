import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";
import 'swiper/css';
import "swiper/css/free-mode";

import 'bootstrap/dist/css/bootstrap.min.css';

import CardsEshop from './CardsEshop';

//import images
import perro1 from '../../public/img/perro1.jpg'
import perro2 from '../../public/img/perro2.jpg'
import perro3 from '../../public/img/perro3.jpg'
import perro4 from '../../public/img/perro4.jpg'
import perro5 from '../../public/img/perro5.jpg'


const ProductSliderEshop=()=> {
  return (
    <div className="container py-4 px-4 justify-content-center">
      <Swiper
      freeMode={true}
      grabCursor={true}
      modules={[FreeMode]}
      className="mySwiper"
      breakpoints={{
        0:{
            slidesPerView:1,
            spacesBetween: 10,
        },
        480:{
            slidesPerView:2,
            spaceBetween:10,    
        },
        768:{
            slidesPerView:3,
            spaceBetween:15,
        },
        1024:{
            slidesPerView:4,
            spaceBetween:15,
        },
        1280:{
            slidesPerView:5,
            spaceBetween:30,
        },

      }}
      >
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
            {/* <CardsEshop data ={{imgSrc: perro1,name:'Lucas', edad:'2',genero:'hembra'}}/>
            <CardsEshop data ={{imgSrc: perro2,name:'Lucas', edad:'2',genero:'hembra'}}/>
            <CardsEshop data ={{imgSrc: perro3,name:'Lucas', edad:'2',genero:'hembra'}}/>
            <CardsEshop data ={{imgSrc: perro4,name:'Lucas', edad:'2',genero:'hembra'}}/>
            <CardsEshop data ={{imgSrc: perro5,name:'Lucas', edad:'2',genero:'hembra'}}/> */}
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <CardsEshop data ={{imgSrc: perro1, name:'Comida Premium', price:'$5.000'}}/>
        </SwiperSlide>
       
     
      </Swiper>
    </div>
  );
};

export default ProductSliderEshop;

