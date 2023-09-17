import React from 'react';
import Modal from "../components/Modal/Modal";
import {useNavigate, useParams} from "react-router-dom";
import {OrderInfo} from "../components/OrderInfo/OrderInfo";
import { useSelector} from "../services/redux/store";
import { productsPropTypes } from "../utils/types";

export const OrderPageModal = () => {
  const {id} = useParams();
  const orders = useSelector((state) => state.feed.orders.orders);
  const order = orders?.find((element: productsPropTypes) => element._id === id);
  const navigate = useNavigate()
  return (
    <Modal onClose={() => {
      navigate(-1);
    }}>
      <OrderInfo order={order}/>
    </Modal>
  );
};