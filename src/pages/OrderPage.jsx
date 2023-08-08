import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import styles from "./OrderPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getIngredientById} from "../utils/card";
import {WS_CONNECTION_START} from "../services/redux/actions/ws";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {priceOrder} from "./FeedPage";

const countingIngredients = (ingredientId, composition) => {
  return composition.reduce((acc, i) => {
    if (ingredientId === i) {
      acc += 1;
    }
    return acc;
  }, 0)
}

export const OrderPage = () => {
  const dispatch = useDispatch()
  const {id} = useParams();
  const orders = useSelector(state => state.feed.orders.orders);
  const order = orders?.find(element => element._id === id);
  const orderComposition = order?.ingredients || []
  const orderCompositionFilter = orderComposition.filter((item, index) => {
    return orderComposition.indexOf(item) === index
  });
  const createdAt = order?.createdAt || ''
  const ingredients = useSelector(state => state.ingredients.ingredients);

  useEffect(() => {
      dispatch({type: WS_CONNECTION_START})
    },
    [dispatch]
  );

  return (
    <div className={styles.orderInfoContainer}>
      <span className={`${styles.number} text text_type_digits-default mb-10`}>#{order?.number}</span>
      <h2 className="text text_type_main-medium mb-3">{order?.name}</h2>
      <span
        className={`${styles.status} text text_type_main-default mb-15`}>{order?.status === 'done' ? "Выполнен" : "В работе"}</span>
      <span className="text text_type_main-medium mb-6">Состав:</span>
      <ul className={`${styles.orderComposition} mb-10 `}>
        {orderCompositionFilter?.map((ingredientId, i) =>
          <li key={i} className={`${styles.orderCompositionItem} mb-4`}>
            <div className={styles.orderCompositionImageWrapper}>
              <img className={styles.orderCompositionImage} src={getIngredientById(ingredientId, ingredients).image}
                   alt=""/>
            </div>
            <span
              className={`${styles.orderCompositionName} text text_type_main-default ml-4 mr-4`}>{getIngredientById(ingredientId, ingredients).name}</span>
            <div className={styles.orderCompositionPriceAndCount}>
               <span
                 className='text text_type_digits-default'>{countingIngredients(ingredientId, orderComposition)}&nbsp;x&nbsp;</span>
              <span
                className='text text_type_digits-default mr-2'>{getIngredientById(ingredientId, ingredients).price * countingIngredients(ingredientId, orderComposition)}</span>
              <CurrencyIcon type="primary"/>
            </div>
          </li>
        )}
      </ul>
      <div className={styles.orderCompositionTimeAndSum}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)}/> i-GMT+3
        </p>
        <div className={styles.orderCompositionSum}>
        <span
          className='text text_type_digits-default mr-2'>{priceOrder(ingredients, orderComposition)}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};