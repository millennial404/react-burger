import styles from "./OrderDetails.module.css";
import doneImg from "../../images/done.png";
import {useSelector} from "react-redux";

export default function OrderDetails() {
  const idOrder = useSelector(state => state.orderId.orderId)

  return (
    <div className={styles.orderDetailsConteiner}>
      <p className="text text_type_digits-large mb-8 mt-4">{idOrder}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className={`${styles.doneImg} mb-15`} src={doneImg} alt=""/>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
