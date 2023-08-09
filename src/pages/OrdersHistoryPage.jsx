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
import { wsUrlAllOrders } from "../utils/constants";

const ImageIngredient = (ingredient) => {
  const allIngredients = useSelector((state) => state.ingredients.ingredients);
  const img = allIngredients.find(
    (element) => element._id === ingredient.ingredient
  ).image;
  return (
    <li className={styles.component}>
      <img className={styles.componentsImg} src={img} alt="" />
    </li>
  );
};
const OrderCard = (props) => {
  const { _id, number, name, createdAt, ingredients } = props.order;
  const price = props.price;
  const navigate = useNavigate();
  return (
    <li
      className={`${styles.orderCard} p-6 mb-4`}
      onClick={() => {
        navigate(`/feed/${_id}`);
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
          {ingredients
            ?.map((ingredient, i) => {
              return <ImageIngredient ingredient={ingredient} key={i} />;
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
  const ordersData = useSelector((state) => state.userFeed.orders);
  const dispatch = useDispatch();
  const location = useLocation();
  const match = matchPath("/profile/orders", `${location.pathname}`);
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken").split(" ")[1];

  useEffect(() => {
    dispatch({
      type: USER_ORDERS_WS_CONNECTION_START,
      payload: `${wsUrlAllOrders}/all/?token=${accessToken}`,
    });
  }, [accessToken, dispatch]);
  console.log(accessToken);
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
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <ul className={`${styles.formContainer} pr-2`}>
          {ordersData.orders?.map((order) => {
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
