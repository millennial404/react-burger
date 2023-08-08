import style from "./FeedPage.module.css";
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {WS_CONNECTION_START} from "../services/redux/actions/ws";
import {useNavigate} from "react-router-dom";


const ImageIngredient = (ingredient) => {
  const allIngredients = useSelector(state => state.ingredients.ingredients)
  const img = allIngredients.find(element => element._id === ingredient.ingredient).image
  return (
    <li className={style.component}>
      <img className={style.componentsImg}
           src={img}
           alt=""/>
    </li>)
}
const OrderCard = (props) => {
  const {_id, number, name, createdAt, ingredients} = props.order;
  const price = props.price
  const navigate = useNavigate();
  return (
    <li className={`${style.orderCard} p-6 mb-4`} onClick={() => {
      navigate(`/feed/${_id}`)
    }}>
      <div className={style.orderNumber}><span className="text text_type_digits-default mb-6">{`#${number}`}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)}/> i-GMT+3
        </span>
      </div>
      <p className="text text_type_main-medium mb-6">{name}</p>
      <div className={style.componentsAndPrice}>
        <ul className={style.components}>
          {ingredients?.map((ingredient, i) => {
            return (<ImageIngredient ingredient={ingredient} key={i}/>)
          }).reverse()
          }
        </ul>
        <div className={style.price}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon
            type="primary"/>
        </div>
      </div>
    </li>

  )
}

const OrdersBoard = () => {
  const ordersData = useSelector(state => state.feed.orders)
  return (
    <div className={`${style.orderBoardContainer} ml-15`}>
      <div className={`${style.ordersStatus} mb-15`}>
        <div className={`${style.ordersReadyContainer} mr-9`}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <ul className={`${style.ordersReadyElements}`}>
            {ordersData.orders?.map(order => {
              return order.status === "done" && (<li key={order.number}><p
                className={`${style.readyOrderNumber} text text_type_digits-default mb-2`}>{order.number}</p></li>)
            })}
          </ul>
        </div>
        <div className={`${style.ordersInWorkContainer}`}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <ul className={`${style.ordersInWorkElements}`}>
            {ordersData.orders?.map((order) => {
              return order.status === "pending" && (
                <li key={order.number}><p className="text text_type_digits-default mb-2">{order.number}</p></li>)
            })}
          </ul>
        </div>
      </div>
      <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
      <p className={`${style.shadow} text text_type_digits-large mb-15`}>{ordersData.total}</p>
      <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
      <p className={`${style.shadow} text text_type_digits-large mb-2`}>{ordersData.totalToday}</p>
    </div>
  )
}

export const priceOrder = (menuIngredients, arrayIdsOrderIngredients) => {
  return arrayIdsOrderIngredients.reduce((totalSum, componentId) => {
    return componentId ? totalSum + menuIngredients.find(element => element._id === componentId).price : 0;
  }, 0);
}

export const FeedPage = () => {
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const ordersData = useSelector(state => state.feed.orders)
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch({type: WS_CONNECTION_START, payload:'wss://norma.nomoreparties.space/orders/all'})
    },
    [dispatch]
  );
  return (
    <main className={style.main}>
      <h2 className="text text_type_main-large mt-10">
        Лента заказов
      </h2>
      <div></div>
      <ul className={`${style.feedContainer} pr-2`}>
        {ordersData.orders?.map((order) => {
          return (<OrderCard key={order._id} order={{...order}} price={priceOrder(ingredients, order.ingredients)}/>)
        })}
      </ul>
      <OrdersBoard/>
    </main>

  )
}

