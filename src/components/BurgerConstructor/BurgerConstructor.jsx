import React from "react";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import CurrencyIconTotalPrice from "../../images/CurrencyIcon36x36.svg";
import componentMarkerImg from "../../images/icon24x24.svg";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  productsPropTypes,
  burgerOjectPropTypes,
} from "../../utils/prop-types";
import { BurgerConstructorContext } from "../services/BurgerConstructorContext";
import { reducer } from "../services/reducer";
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

function BurgerConstructorComponents({ burgerOject }) {
  return (
    <>
      <div className={`${styles.bugrgerComponents} mt-25 mb-10 ml-4`}>
        {burgerOject.bun[0] && (
          <div className={styles.component}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerOject.bun[0] ? burgerOject.bun[0].name : ""}
              price={burgerOject.bun[0] ? burgerOject.bun[0].price : ""}
              thumbnail={burgerOject.bun[0] ? burgerOject.bun[0].image : ""}
            />
          </div>
        )}
        <ul className={styles.componentsList}>
          {burgerOject.ingredients?.map(
            (component, i) =>
              component.type && <Component key={i} component={component} />
          )}
        </ul>
        {burgerOject.bun[0] && (
          <div className={styles.component}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={burgerOject.bun[0] ? burgerOject.bun[0].name : ""}
              price={burgerOject.bun[0] ? burgerOject.bun[0].price : ""}
              thumbnail={burgerOject.bun[0] ? burgerOject.bun[0].image : ""}
            />
          </div>
        )}
      </div>
    </>
  );
}

BurgerConstructorComponents.propTypes = {
  burgerOject: burgerOjectPropTypes.isRequired,
};

function concatBurgerOject(obj) {
  return obj.bun.concat(obj.ingredients).concat(obj.bun);
}

function totalSum(obj) {
  return concatBurgerOject(obj).reduce((totalSum, component) => {
    return totalSum + component.price;
  }, 0);
}

function arrayIdIngredients(obj) {
  return concatBurgerOject(obj).map((component) => component._id);
}

function InfoAndOrder({ burgerOject }) {
  const orderSum = React.useMemo(() => totalSum(burgerOject), [burgerOject]);
  const [idOrder, setIdOrder] = React.useState(null);
  return (
    <div className={styles.order}>
      <span className="text text_type_digits-medium mr-2">{orderSum}</span>
      <img className="mr-10" src={CurrencyIconTotalPrice} alt="" />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => {
          placeAnOrder(arrayIdIngredients(burgerOject))
            .then((res) => setIdOrder(res.order.number))
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        Оформить заказ
      </Button>
      {idOrder && (
        <Modal onClose={() => setIdOrder(false)}>
          <OrderDetails idOrder={idOrder} />
        </Modal>
      )}
    </div>
  );
}

InfoAndOrder.propTypes = {
  burgerOject: burgerOjectPropTypes.isRequired,
};

const initBurgerOject = {
  bun: [],
  ingredients: [],
};

export default function BurgerConstructor() {
  const components = React.useContext(BurgerConstructorContext);
  const [burgerOject, dispatchBurgerOject] = React.useReducer(
    reducer,
    initBurgerOject
  );

  React.useEffect(() => {
    if (components && components.length > 0) {
      dispatchBurgerOject({ type: "addIngredient", payload: components[3] });
      dispatchBurgerOject({ type: "addIngredient", payload: components[4] });
      dispatchBurgerOject({ type: "addBun", payload: components[0] });
    }
  }, [components]);

  return (
    <section className={styles.BurgerConstructorContainer}>
      <BurgerConstructorComponents burgerOject={burgerOject} />
      <InfoAndOrder burgerOject={burgerOject} />
    </section>
  );
}
