import styles from "./OrdersHistoryPage.module.css";
import React, { useEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { priceOrder } from "./FeedPage";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { USER_ORDERS_WS_CONNECTION_START } from "../services/redux/actions/wsUserOrders";
import Cookies from "js-cookie";
import { wsUrlUserOrders} from "../utils/constants";
import style from "./FeedPage.module.css";

const ImageIngredient = ({ingredient, index, digit}) => {
  const allIngredients = useSelector((state) => state.ingredients.ingredients);
  const img = allIngredients.find(
    (element) => element._id === ingredient
  ).image;
  return (
    <li className={`${style.component} `}>
      <img className={`${style.componentsImg} ${index === 5 && digit > 0 && style.opacity}`} src={img} alt="" />
      {index === 5 && <p className={`${style.digit} text text_type_digits-default`}
      >{digit > 0 && `+${digit}`}</p>}
    </li>
  );
};
const OrderCard = (props) => {
  const { _id, number, name, createdAt, ingredients } = props.order;
  const firstSixIngredients = ingredients.slice(0,6)
  const price = props.price;
  const navigate = useNavigate();
  const digit = ingredients.length - 6
  return (
    <li
      className={`${styles.orderCard} p-6 mb-4`}
      onClick={() => {
        navigate(`/profile/orders/${_id}`);
      }}
    >
      <div className={styles.orderNumber}>
        <span className="text text_type_digits-default mb-6">{`#${number}`}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} /> i-GMT+3
        </span>
      </div>
      <p className="text text_type_main-medium mb-6">{name}</p>
      <div className={styles.componentsAndPrice}>
        <ul className={styles.components}>
          {firstSixIngredients
            ?.map((ingredient, i) => {
              return <ImageIngredient ingredient={ingredient} digit={digit} index={i} key={i} />;
            })
            .reverse()}
        </ul>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export function OrdersHistoryPage() {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ordersData = useSelector((state) => state.userFeed.orders.orders);
  const reverseOrdersData = ordersData ? [...ordersData] : []
  reverseOrdersData?.reverse()
  const dispatch = useDispatch();
  const location = useLocation();
  const match = matchPath("/profile/orders", `${location.pathname}`);
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken").split(" ")[1];

  useEffect(() => {
    dispatch({
      type: USER_ORDERS_WS_CONNECTION_START,
      payload: `${wsUrlUserOrders}?token=${accessToken}`,
    });
  }, [accessToken, dispatch]);

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={`${styles.navContainer} ml-5 mr-15`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button
                onClick={() => navigate("/profile")}
                className={styles.navButton}
              >
                Профиль
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                onClick={() => navigate("/profile/orders")}
                className={match ? styles.navButtonActive : styles.navButton}
              >
                История заказов
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                onClick={() => dispatch(logout())}
                className={styles.navButton}
              >
                Выход
              </button>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        </div>
        <ul className={`${styles.formContainer} pr-2`}>
          {reverseOrdersData?.map((order) => {
            return (
              <OrderCard
                key={order._id}
                order={{ ...order }}
                price={priceOrder(ingredients, order.ingredients)}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
