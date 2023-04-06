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
  burgerObjectPropTypes,
} from "../../utils/prop-types";
import {placeAnOrder} from "../../utils/burger-api";
import {useSelector} from "react-redux";

function Component({component}) {
  return (
    <li className={styles.component}>
      <img className="mr-2" src={componentMarkerImg} alt=""/>
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

function BurgerConstructorComponents({burgerObject}) {
  return (
    <>
      <div className={`${styles.bugrgerComponents} mt-25 mb-10 ml-4`}>
        {burgerObject.bun[0] && (
          <div className={styles.component}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerObject.bun[0] ? burgerObject.bun[0].name : ""}
              price={burgerObject.bun[0] ? burgerObject.bun[0].price : ""}
              thumbnail={burgerObject.bun[0] ? burgerObject.bun[0].image : ""}
            />
          </div>
        )}
        <ul className={styles.componentsList}>
          {burgerObject.ingredients?.map(
            (component, i) =>
              component.type && <Component key={i} component={component}/>
          )}
        </ul>
        {burgerObject.bun[0] && (
          <div className={styles.component}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={burgerObject.bun[0] ? burgerObject.bun[0].name : ""}
              price={burgerObject.bun[0] ? burgerObject.bun[0].price : ""}
              thumbnail={burgerObject.bun[0] ? burgerObject.bun[0].image : ""}
            />
          </div>
        )}
      </div>
    </>
  );
}

BurgerConstructorComponents.propTypes = {
  burgerObject: burgerObjectPropTypes.isRequired,
};

function concatBurgerObject(obj) {
  return obj.bun.concat(obj.ingredients).concat(obj.bun);
}

function totalSum(obj) {
  return concatBurgerObject(obj).reduce((totalSum, component) => {
    return component ? totalSum + component.price : 0
  }, 0);
}

function arrayIdIngredients(obj) {
  return concatBurgerObject(obj).map((component) => component ? component._id : false);
}

function InfoAndOrder({burgerObject}) {
  const orderSum = React.useMemo(() => totalSum(burgerObject), [burgerObject]);
  const [idOrder, setIdOrder] = React.useState(null);
  return (
    <div className={styles.order}>
      <span className="text text_type_digits-medium mr-2">{orderSum}</span>
      <img className="mr-10" src={CurrencyIconTotalPrice} alt=""/>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => {
          arrayIdIngredients(burgerObject)[false] ?
          placeAnOrder(arrayIdIngredients(burgerObject))
            .then((res) => setIdOrder(res.order.number))
            .catch((err) => {
              console.error(err);
            })
            : console.log(arrayIdIngredients(burgerObject))
        }}
      >
        Оформить заказ
      </Button>
      {idOrder && (
        <Modal onClose={() => setIdOrder(false)}>
          <OrderDetails idOrder={idOrder}/>
        </Modal>
      )}
    </div>
  );
}

InfoAndOrder.propTypes = {
  burgerObject: burgerObjectPropTypes.isRequired,
};

export default function BurgerConstructor() {

  const components = useSelector(state => state.components);

  return (
    <section className={styles.BurgerConstructorContainer}>
      <BurgerConstructorComponents burgerObject={components}/>
      <InfoAndOrder burgerObject={components}/>
    </section>
  );
}
