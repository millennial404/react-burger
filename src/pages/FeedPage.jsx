import style from "./FeedPage.module.css";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const OrderCard = () => {
  return (
    <li className={`${style.orderCard} p-6 mb-4`}>
      <div className={style.orderNumber}><span className="text text_type_digits-default mb-6">#034535</span>
        <span className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span></div>
      <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
      <div className={style.componentsAndPrice}>
        <ul className={style.components}>
          <li className={style.component}><img className={style.componentsImg}
                                               src="https://code.s3.yandex.net/react/code/bun-02.png" alt=""/></li>
          <li className={style.component}><img className={style.componentsImg}
                                               src="https://code.s3.yandex.net/react/code/meat-03.png" alt=""/></li>
          <li className={style.component}><img className={style.componentsImg}
                                               src="https://code.s3.yandex.net/react/code/sauce-02.png" alt=""/></li>
          <li className={style.component}><img className={style.componentsImg}
                                               src="https://code.s3.yandex.net/react/code/meat-02.png" alt=""/></li>
          <li className={style.component}><img className={style.componentsImg}
                                               src="https://code.s3.yandex.net/react/code/bun-02.png" alt=""/></li>
        </ul>
        <div className={style.price}><span className="text text_type_digits-default mr-2">460 </span> <CurrencyIcon
          type="primary"/></div>

      </div>
    </li>

  )
}
export const FeedPage = () => {
  return (
    <main className={style.main}>
      <h2 className="text text_type_main-large mt-10">
        Лента заказов
      </h2>
      <div></div>
      <ul className={style.feedContainer}>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
      </ul>
    </main>

  )
}

