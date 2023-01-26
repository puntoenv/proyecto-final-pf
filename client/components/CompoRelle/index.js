import style from "./style.module.css"

function HistoryVacio() {
  return (
  <div>
     <div className={style.container} >
        <div className={style.window}>
        <div className={style.chat_bubble} >
          <h1 id={style.meow} >MEOW!</h1>
          </div>
          <div className={style.cat} >
            <section className={style.cat_ear_left} >
              <span id ={style.inner_ear_left}>
              </span>
            </section>
             <section className={style.cat_ear_right} >
              <span className={style.inner_ear_right} ></span>
              </section>
                <div className={style.cat_face} >
                    <section className={style.eyes_left}><span className={style.pupil}></span></section>
                    <section className={style.eyes_right}><span className={style.pupil}></span></section>

                    <span className={style.nose}></span>
                </div>
            </div>
          <div id ={style.cat_paw} >
            <span id ={style.pad_one} >
            </span>
            <span id ={style.pad_two} >
            </span>
            <span id ={style.pad_three} >
            </span>
              </div>
        </div>
    </div>
     <h1 className={style.h1}>Upss! se encuentra vacio</h1>
	</div>
  )
}

export default HistoryVacio