import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserOrderPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { wsUrlUserOrders} from "../utils/constants";
import {
  wsConnectUserOrders,
  wsDisconnectUserOrders
} from "../services/redux/actions/wsUserOrders";
import Cookies from "js-cookie";
import {OrderInfo} from "../components/OrderInfo/OrderInfo";

export const UserOrderPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orders = useSelector((state) => state.userFeed.orders.orders);
  const order = orders?.find((element) => element._id === id);
  const accessToken = Cookies.get("accessToken").split(" ")[1];

  useEffect(() => {
    dispatch(wsConnectUserOrders(`${wsUrlUserOrders}?token=${accessToken}`));
    return () => {
      dispatch(wsDisconnectUserOrders())
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <OrderInfo order={order}/>
    </div>
  );
};
