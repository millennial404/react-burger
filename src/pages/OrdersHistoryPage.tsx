import styles from "./OrdersHistoryPage.module.css";
import React, {useEffect} from "react";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import {logout} from "../services/redux/actions/auth";
import {useDispatch, useSelector} from "../services/redux/store";
import {
  wsConnectUserOrders,
  wsDisconnectUserOrders
} from "../services/redux/actions/wsUserOrders";
import Cookies from "js-cookie";
import {wsUrlUserOrders} from "../utils/constants";
import {OrdersCardsFeed} from "../components/OrdersCardsFeed/OrdersCardsFeed";

export function OrdersHistoryPage() {
  const ordersData = useSelector((state) => state.userFeed.orders.orders);
  const reverseOrdersData = ordersData ? [...ordersData] : []
  reverseOrdersData?.reverse()
  const dispatch = useDispatch();
  const location = useLocation();
  const match = matchPath("/profile/orders", `${location.pathname}`);
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken")?.split(" ")[1];

  useEffect(() => {
    if (accessToken) {
      dispatch(wsConnectUserOrders(`${wsUrlUserOrders}?token=${accessToken}`));
    }

    return () => {
      dispatch(wsDisconnectUserOrders())
    };
  }, [dispatch, accessToken]);

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
              <OrdersCardsFeed
                key={order._id}
                order={{...order}}
                onClick={() => navigate(`/profile/orders/${order._id}`, {state: {backgroundLocation: location}})}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
