import React from 'react';
import {OrderInfo} from "../components/OrderInfo/OrderInfo";
import Modal from "../components/Modal/Modal";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { TOrder } from "../utils/types";

export const UserOrderPageModal = () => {
  const { id } = useParams();
  const orders = useSelector((state) => state.userFeed.orders.orders);
  const order = orders?.find((element: TOrder) => element._id === id);
  const navigate = useNavigate()
  return (
    <Modal onClose={() => {
      navigate(-1);
    }}>
      <OrderInfo order={order}/>
    </Modal>
  );
};