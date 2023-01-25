import Link from "next/link";
import React, { useState, useEffect } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal/Layout";
import style from "./detailProduct.module.css";
import { formatOneItemMP } from "../../../controller/formatItemsMp";
import { BsCartDashFill, BsCartPlusFill } from "react-icons/bs";
import { useUser } from "@auth0/nextjs-auth0/client";
import { authUser } from "../../../stores/actions";
import { getProductsRelated } from "../../../stores/actions";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardProduct from "../../../components/CardProduct";
import ProductCard from "../../../components/CarouselEshop/productsCard";
import Slider from "react-slick";
import Start_Revi from "../../../components/star_Revi";

const fn = (user, dispatch, setNumCall) => {
  if (user) {
    const sub = user.sub.split("|");
    if (sub[0] === "google-oauth2") {
      dispatch(
        authUser(`${user.nickname}@gmail.com`, user.name || user.nickname)
      );
    } else {
      dispatch(authUser(user.name, null));
    }
  }
  setNumCall(1);
};

export default function Detail({
  data,
  cart,
  addToCart,
  productOfCart,
  discountItem,
}) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1700,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const { user } = useUser();
  const dispatch = useDispatch();

  const recomendados = useSelector((state) => state.products.productsRelated);

  const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);
  const userAuth = useSelector((state) => state.userAuth.userData);
  const id_User = userAuth && userAuth._id;

  const { name, image, price, _id, stock, category, boughtBy, star_reviews } =
    data;
  console.log(_id);

  const [amount, setAmount] = useState(0);
  const itemCart = productOfCart(cart, _id);

  const handlerSubmitAdded = (e) => {
    e.preventDefault();
    const product = {
      name,
      image,
      price,
      id_User,
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

  const CondiRevi = useEffect(() => {
    itemCart && itemCart.amount > 0 && setAmount((i) => (i = itemCart.amount));
    dispatch(getProductsRelated(data._id));
  }, [cart, amount]);
  data.id_User = id_User;
  let products = [data];
  // console.log(products);

  return (
    <LayoutGlobal authUser={userAuth}>
      <div className={style.containProduct}>
        <div className={style.containBtnBack}>
          <Link href="/eShop" className={style.btnBack}>
            {"<"} Atras
          </Link>
        </div>

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
          <span className={style.descriptionTitle}>Descripción</span>
          <span className={style.contentDescription}>{data.description}</span>
        </div>
        {/* <div>{<Start_Revi data={data} id_User={id_User} />}</div> */}
        <div className={style.containerRevi}>
          {<Start_Revi data={data} id_User={id_User} />}
                  
        </div>

        <h1 className={style.titleRelated}> Productos Relacionados </h1>
        <div className={style.containSlider}>
          <Slider {...settings} className="arrowsSlides">
            {recomendados.slice(0, 9).map((recomendado) => (
              // <CardProduct
              //   key={recomendado._id}
              //   info={recomendado}
              //   addToCart={addToCart}
              //   cart={cart}
              //   // serCart={setCart}
              //   productOfCart={productOfCart}
              //   discountItem={discountItem}
              // />
              <ProductCard
                key={recomendado._id}
                info={recomendado}
                // addToCart={addToCart}
                nombre={recomendado.name}
                imagen={recomendado.image}
                precio={recomendado.price}
              />
            ))}
          </Slider>
        </div>
      </div>
    </LayoutGlobal>
  );
}
//}

export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACK}products/detail/${params.id}`
      )
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
