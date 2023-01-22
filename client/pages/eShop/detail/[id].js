import Link from "next/link";
import React, { useState, useEffect } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal/Layout";
import style from "./detailProduct.module.css";
import { formatOneItemMP } from "../../../controller/formatItemsMp";
import { BsCartDashFill, BsCartPlusFill } from "react-icons/bs";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getProductsRelated } from "../../../stores/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardProduct from "../../../components/CardProduct";
import Point from "../../../components/punctuation/index"


export default function Detail({
  data,
  cart,
  addToCart,
  productOfCart,
  discountItem,
}) 

//  {
//      const settings = {
//       arrows: true,
//       infinite: true,
//       dots: true,
//       speed: 500,
//       slidesToShow: 3,
//       slidesToScroll: 3,
//   };
{
  const { user } = useUser();

  const { name, image, price, _id, stock, category, boughtBy } = data;
  const [amount, setAmount] = useState(0);
  const itemCart = productOfCart(cart, _id);
  const dispatch = useDispatch();
  const recomendados = useSelector((state) => state.products.productsRelated);
  console.log(recomendados);

  const handlerSubmitAdded = (e) => {
    e.preventDefault();
    const product = {
      name,
      image,
      price,
      _id,
      stock,
      category,
      boughtBy,
    };
    setAmount((i) => (i = i + 1));
    addToCart(product);
  };

  const handlerSubmitDiscount = () => {
    if (amount !== 0) {
      setAmount((i) => (i = i - 1));
      discountItem(_id);
    }
  };

  useEffect(() => {
    itemCart && itemCart.amount > 0 && setAmount((i) => (i = itemCart.amount));
    dispatch(getProductsRelated(data._id));
  }, [cart, amount]);

  let products = [data];
  return (
    <LayoutGlobal>
      <div className={style.containProduct}>
        <div className={style.containBtnBack}>
          <Link href="/eShop" className={style.btnBack}>
            {"<"} Atras
          </Link>
        </div>
        <Point></Point>
        <div className={style.headerDetail}>
          <img src={data.image} className={style.imgProduct} />
          <div className={style.containInfo}>
            <h1 className={style.nameProduct}>{data.name}</h1>
            <div className={style.containPriceAndCategorie}>
              {(itemCart && (
                <Link href="/cart" className={style.btnBuy}>
                  Comprar
                </Link>
              )) ||
                (user && (
                  <button
                    className={style.btnBuy}
                    onClick={(e) => formatOneItemMP(products)}
                  >
                    Comprar
                  </button>
                ))}

              <span className={style.priceProduct}>
                ${data.price}
                <div className={style.containFormCart}>
                  <div className={style.formCantCart}>
                    <button
                      onClick={handlerSubmitAdded}
                      className={style.modifiedCant}
                      type="submit"
                    >
                      <BsCartPlusFill className={style.icon} />
                    </button>

                    {amount !== undefined && (
                      <span className={style.amount}>{amount}</span>
                    )}

                    <span className={style.spanButtonAdd}>
                      <button
                        onClick={handlerSubmitDiscount}
                        className={style.modifiedCant}
                        type="submit"
                      >
                        <BsCartDashFill className={style.icon} />
                      </button>
                    </span>
                  </div>
                  <span className={style.spanStock}>stock: {data.stock}</span>
                </div>
              </span>
              {data.category && (
                <span className={style.categoriesProduct}>
                  <ul className={style.listCategories}>
                    categorias:
                    {data.category.map((categ, index) => (
                      <li key={index}>- {categ}</li>
                    ))}
                  </ul>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={style.containDescription}>
          <span className={style.descriptionTitle}>Description</span>
          <span className={style.contentDescription}>{data.description}</span>
        </div>
        
         <div className={style.relatedContainer}>
          <h1 className={style.titleRelated}> Productos Relacionados </h1>

            {/* <Slider {...settings} className="arrowsSlides">   */}
               {recomendados.slice(0, 9).map((recomendado) => (
                    <CardProduct
                    key={recomendado._id}
                    info={recomendado}
                    addToCart={addToCart}
                    cart={cart}
                    // serCart={setCart}
                    productOfCart={productOfCart}
                    discountItem={discountItem}
                  />
              ))}    
             {/* </Slider>  */}
        
        </div> 
      </div>
    </LayoutGlobal>
  );
}
//}

export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch(`${process.env.URL_BACK}products/detail/${params.id}`)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
