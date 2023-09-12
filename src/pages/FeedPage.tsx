import style from "./FeedPage.module.css";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wsConnectAllOrders, wsDisconnectAllOrders} from "../services/redux/actions/wsAllOrders";
import {wsUrlAllOrders} from "../utils/constants";
import {OrdersBoard} from "../components/OdersBoard/OdersBoard";
import {OrdersCardsFeed} from "../components/OrdersCardsFeed/OrdersCardsFeed";
import {useLocation, useNavigate} from "react-router-dom";

export const FeedPage = () => {
  const location = useLocation();
  const ordersData = useSelector((state) => state.feed.orders.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(wsConnectAllOrders(wsUrlAllOrders));
    return ()=> {
      dispatch(wsDisconnectAllOrders())
    };
  }, []);

  return (
    <main className={style.main}>
      <h2 className="text text_type_main-large mt-10">Лента заказов</h2>
      <div></div>
      <ul className={`${style.feedContainer} pr-2`}>
        {ordersData?.map((order) => {
          return (
            <OrdersCardsFeed
              key={order._id}
              order={{...order}}
              onClick={()=>navigate(`/feed/${order._id}`, {state: {backgroundLocation: location}})}
            />
          );
        })}
      </ul>
      <OrdersBoard/>
    </main>
  );
};
