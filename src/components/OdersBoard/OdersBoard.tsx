import {useSelector} from "../../services/redux/store";
import style from "./OdersBoard.module.css";
import { TOrder } from "../../utils/types";

export const OrdersBoard = () => {
  const ordersData = useSelector((state) => state.feed.orders);
  return (
    <div className={`${style.orderBoardContainer} ml-15`}>
      <div className={`${style.ordersStatus} mb-15`}>
        <div className={`${style.ordersReadyContainer} mr-9`}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <ul className={`${style.ordersReadyElements}`}>
            {ordersData.orders?.map((order: TOrder) => {
              return (
                order.status === "done" && (
                  <li key={order.number}>
                    <p
                      className={`${style.readyOrderNumber} text text_type_digits-default mb-2`}
                    >
                      {order.number}
                    </p>
                  </li>
                )
              );
            })}
          </ul>
        </div>
        <div className={`${style.ordersInWorkContainer}`}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <ul className={`${style.ordersInWorkElements}`}>
            {ordersData.orders?.map((order: TOrder) => {
              return (
                order.status === "pending" && (
                  <li key={order.number}>
                    <p className="text text_type_digits-default mb-2">
                      {order.number}
                    </p>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
      <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
      <p className={`${style.shadow} text text_type_digits-large mb-15`}>
        {ordersData.total}
      </p>
      <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
      <p className={`${style.shadow} text text_type_digits-large mb-2`}>
        {ordersData.totalToday}
      </p>
    </div>
  );
};