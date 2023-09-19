import React from 'react';
import styles from "./OrderInfo.module.css";
import {getIngredientById, priceOrder, countingIngredients} from "./utils";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/redux/store";
import { TOrder } from "../../utils/types";

type TOrderInfoProps = {
  order: TOrder
};

export const OrderInfo = (props: TOrderInfoProps) => {
  const menuIngredients = useSelector((state) => state.ingredients.ingredients);
  const {order} = props
  const orderComposition = order?.ingredients || [];
  const orderCompositionFilter = orderComposition.filter((item, index) => {
    return orderComposition.indexOf(item) === index;
  });
  const createdAt = order?.createdAt || "";
  return (
    <div className={styles.orderInfoContainer}>
      <span className={`${styles.number} text text_type_digits-default mb-10`}>
        #{order?.number}
      </span>
      <h2 className="text text_type_main-medium mb-3">{order?.name}</h2>
      <span className={`${styles.status} text text_type_main-default mb-15`}>
        {order?.status === "done" ? "Выполнен" : "В работе"}
      </span>
      <span className="text text_type_main-medium mb-6">Состав:</span>
      <ul className={`${styles.orderComposition} mb-10 `}>
        {orderCompositionFilter?.map((ingredientId, i) => (
          <li key={i} className={`${styles.orderCompositionItem} mb-4`}>
            <div className={styles.orderCompositionImageWrapper}>
              <img
                className={styles.orderCompositionImage}
                src={getIngredientById(ingredientId, menuIngredients)?.image}
                alt=""
              />
            </div>
            <span
              className={`${styles.orderCompositionName} text text_type_main-default ml-4 mr-4`}
            >
              {getIngredientById(ingredientId, menuIngredients)?.name}
            </span>
            <div className={styles.orderCompositionPriceAndCount}>
              <span className="text text_type_digits-default">
                {countingIngredients(ingredientId, orderComposition)}
                &nbsp;x&nbsp;
              </span>
              <span className="text text_type_digits-default mr-2">
                {(getIngredientById(ingredientId, menuIngredients)?.price || 1) *
                  countingIngredients(ingredientId, orderComposition)}
              </span>
              <CurrencyIcon type="primary"/>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.orderCompositionTimeAndSum}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)}/>
        </p>
        <div className={styles.orderCompositionSum}>
          <span className="text text_type_digits-default mr-2">
            {priceOrder(menuIngredients, orderComposition)}
          </span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};
