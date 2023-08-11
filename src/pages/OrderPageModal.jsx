import React from 'react';
import {clearIngredientDetails} from "../services/redux/actions/currentIngredient";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import Modal from "../components/Modal/Modal";
import {useNavigate, useParams} from "react-router-dom";
import {OrderInfo} from "../components/OrderInfo/OrderInfo";
import {useDispatch, useSelector} from "react-redux";

export const OrderPageModal = () => {
  const { id } = useParams();
  const orders = useSelector((state) => state.feed.orders.orders);
  const order = orders?.find((element) => element._id === id);
  const navigate = useNavigate()
  return (
    <Modal onClose={() => {
      navigate(-1);
    }}>
      <OrderInfo order={order}/>
    </Modal>
  );
};