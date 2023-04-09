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
import {useDispatch, useSelector} from "react-redux";
import {clearGetIdOrder, getIdOrder} from "../../services/actions/createdOrder";
import {
  addBurgerComponent,
  addBurgerComponentBun,
  deleteBurgerComponent
} from "../../services/actions/constructorIngredients";
import {useDrop} from "react-dnd";
import {decrementIngredient, incrementIngredient} from "../../services/actions/ingredients";

function Component({component, index}) {
  const dispatch = useDispatch();
  return (
    <li className={styles.component}>
      <img className="mr-2" src={componentMarkerImg} alt=""/>
      <ConstructorElement
        text={component.name}
        price={component.price}
        thumbnail={component.image}
        handleClose={() => {
          dispatch(deleteBurgerComponent(component.uuid))
          dispatch(decrementIngredient(component))
        }}
      />
    </li>
  );
}

Component.propTypes = {
  component: productsPropTypes.isRequired,
};

function BurgerConstructorComponents({burgerObject}) {
  const dispatch = useDispatch();

  const [{isOver}, drop] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => {
      if (item.cardData.type === "bun") {
        dispatch(addBurgerComponentBun(item.cardData));
        dispatch(incrementIngredient(item.cardData));
      } else {
        dispatch(addBurgerComponent(item.cardData))
        dispatch(incrementIngredient(item.cardData))
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className={`${styles.bugrgerComponents} mt-25 mb-10 ml-4`} ref={drop}
         style={{border: isOver ? "1px solid pink" : "0px"}}>
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
        {burgerObject.components?.map(
          (component, i) =>
            component.type && <Component key={component.uuid} component={component} index={i}/>
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
  );
}

BurgerConstructorComponents.propTypes = {
  burgerObject: burgerObjectPropTypes.isRequired,
};

function concatBurgerObject(obj) {
  return obj.bun.concat(obj.components).concat(obj.bun);
}

function totalSum(obj) {
  return concatBurgerObject(obj).reduce((totalSum, component) => {
    return component ? totalSum + component.price : 0
  }, 0);
}

function arrayIdIngredients(obj) {
  return concatBurgerObject(obj).map((component) => component._id);
}

function InfoAndOrder({burgerObject}) {
  const idOrder = useSelector(state => state.orderId.orderId)
  const dispatch = useDispatch();
  const orderSum = React.useMemo(() => totalSum(burgerObject), [burgerObject]);
  return (
    <div className={styles.order}>
      <span className="text text_type_digits-medium mr-2">{orderSum}</span>
      <img className="mr-10" src={CurrencyIconTotalPrice} alt=""/>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => {
          arrayIdIngredients(burgerObject).length === 0
            ? console.error("Добавьте компоненты для заказа")
            : dispatch(getIdOrder(arrayIdIngredients(burgerObject)))
        }}
      >
        Оформить заказ
      </Button>
      {idOrder && (
        <Modal onClose={() => dispatch(clearGetIdOrder())}>
          <OrderDetails/>
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
