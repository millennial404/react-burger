import React from "react";
// import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import img from "../../images/bun-02.svg";
import CurrencyIconTotalPrice from "../../images/CurrencyIcon36x36.svg";
import componentMarkerImg from "../../images/icon24x24.svg";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { productsPropTypes } from "../../utils/prop-types";
import { BurgerConstructorContext } from "../services/BurgerConstructorContext";
import { placeAnOrder } from "../../utils/burger-api";

function Component({ component }) {
  return (
    <li className={styles.component}>
      <img className="mr-2" src={componentMarkerImg} alt="" />
      <ConstructorElement
        text={component.name}
        price={component.price}
        thumbnail={component.image}
      />
    </li>
  );
}

Component.propTypes = {
  component: productsPropTypes.isRequired,
};

function BurgerConstructorComponents() {
  const components = React.useContext(BurgerConstructorContext);
  return (
    <>
      <div className={`${styles.bugrgerComponents} mt-25 mb-10 ml-4`}>
        <div className={styles.component}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </div>
        <ul className={styles.componentsList}>
          {components.map(
            (component) =>
              "main" === component.type && (
                <Component key={component._id} component={component} />
              )
          )}
        </ul>
        <div className={styles.component}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
      </div>
    </>
  );
}

function InfoAndOrder() {
  const components = React.useContext(BurgerConstructorContext);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [idOrder, setIdOrder] = React.useState(null);
  return (
    <div className={styles.order}>
      <span className="text text_type_digits-medium mr-2">
        {components.reduce((totalSum, component) => {
          return totalSum + ("main" === component.type && component.price);
        }, 0)}
      </span>
      <img className="mr-10" src={CurrencyIconTotalPrice} alt="" />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => {
          placeAnOrder(components.map((component) => component._id))
            .then((res) => setIdOrder(res.order.number))
            .then(() => setPopupOpen(true))
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Оформить заказ
      </Button>
      {popupOpen && (
        <Modal onClose={() => setPopupOpen(false)}>
          <OrderDetails idOrder={idOrder} />
        </Modal>
      )}
    </div>
  );
}

// InfoAndOrder.propTypes = {
//   tolalPrice: PropTypes.number.isRequired
// };

export default function BurgerConstructor() {
  return (
    <section className={styles.BurgerConstructorContainer}>
      <BurgerConstructorComponents />
      <InfoAndOrder />
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   products:PropTypes.arrayOf(productsPropTypes).isRequired
// };
