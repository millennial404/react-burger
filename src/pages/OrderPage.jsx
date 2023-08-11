import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {wsConnectAllOrders, wsDisconnectAllOrders} from "../services/redux/actions/wsAllOrders";
import { wsUrlAllOrders } from "../utils/constants";
import {OrderInfo} from "../components/OrderInfo/OrderInfo";
import styles from './OrderPage.module.css'

export const OrderPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orders = useSelector((state) => state.feed.orders.orders);
  const order = orders?.find((element) => element._id === id);


  useEffect(() => {
    dispatch(wsConnectAllOrders(wsUrlAllOrders));
    return ()=> {
      dispatch(wsDisconnectAllOrders())
    };
  }, []);

  return (
    <div className={styles.wrapper}>
    <OrderInfo order={order}/>
    </div>
  );
};
