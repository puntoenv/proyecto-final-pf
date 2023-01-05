import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";
import 'swiper/css';
import "swiper/css/free-mode";

import 'bootstrap/dist/css/bootstrap.min.css';

import Cards from './Cards'

//import images
import perro1 from '../../public/img/perro1.jpg'
import perro2 from '../../public/img/perro2.jpg'
import perro3 from '../../public/img/perro3.jpg'
import perro4 from '../../public/img/perro4.jpg'
import perro5 from '../../public/img/perro5.jpg'

const ProductSlider=()=> {
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
        <Cards data ={{imgSrc: perro1,name:'Lucas', edad:'2', género:'hembra'}}/>
            {/* <Cards data ={{imgSrc: perro1,name:'Lucas', edad:'2',genero:'hembra'}}/>
            <Cards data ={{imgSrc: perro2,name:'Lucas', edad:'2',genero:'hembra'}}/>
            <Cards data ={{imgSrc: perro3,name:'Lucas', edad:'2',genero:'hembra'}}/>
            <Cards data ={{imgSrc: perro4,name:'Lucas', edad:'2',genero:'hembra'}}/>
            <Cards data ={{imgSrc: perro5,name:'Lucas', edad:'2',genero:'hembra'}}/> */}
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas1', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas2', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas3', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas4', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas5', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas6', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas7', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas8', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
        <SwiperSlide>
        <Cards data ={{imgSrc: perro1,name:'Lucas9', edad:'2', género:'hembra'}}/>
        </SwiperSlide>
     
      </Swiper>
    </div>
  );
};

export default ProductSlider;

