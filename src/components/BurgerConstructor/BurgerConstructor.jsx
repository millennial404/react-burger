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
import {
  clearGetIdOrder,
  getIdOrder,
} from "../../services/actions/createdOrder";
import {
  addBurgerComponent,
  addBurgerComponentBun,
  deleteBurgerComponent,
  moveBurgerComponent,
} from "../../services/actions/constructorIngredients";
import {useDrag, useDrop} from "react-dnd";
import {
  decrementIngredient,
  incrementIngredient,
} from "../../services/actions/ingredients";
import {useNavigate} from "react-router-dom";

function Component({component, index, id}) {
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const [{handlerId}, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveBurgerComponent(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, drag] = useDrag({
    type: "component",
    item: () => {
      return {id, index};
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li
      draggable={true}
      ref={ref}
      className={styles.component}
      style={{opacity}}
      data-handler-id={handlerId}
    >
      <img className="mr-2" src={componentMarkerImg} alt=""/>
      <ConstructorElement
        text={component.name}
        price={component.price}
        thumbnail={component.image}
        handleClose={() => {
          dispatch(deleteBurgerComponent(component.uuid));
          dispatch(decrementIngredient(component));
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
        dispatch(addBurgerComponent(item.cardData));
        dispatch(incrementIngredient(item.cardData));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className={`${styles.burgerComponents} mt-25 mb-10 ml-4`}
      ref={drop}
      style={{border: isOver ? "1px solid #801ab3" : "0px"}}
    >
      {burgerObject.bun[0] && (
        <div className={styles.componentBun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={burgerObject.bun[0] ? `${burgerObject.bun[0].name} (верх)` : ""}
            price={burgerObject.bun[0] ? burgerObject.bun[0].price : ""}
            thumbnail={burgerObject.bun[0] ? burgerObject.bun[0].image : ""}
          />
        </div>
      )}
      <ul className={styles.componentsList}>
        {burgerObject.components?.map(
          (component, i) =>
            component.type && (
              <Component
                key={component.uuid}
                id={component.uuid}
                component={component}
                index={i}
              />
            )
        )}
      </ul>
      {burgerObject.bun[0] && (
        <div className={styles.componentBun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={burgerObject.bun[0] ? `${burgerObject.bun[0].name} (низ)` : ""}
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
    return component ? totalSum + component.price : 0;
  }, 0);
}

function arrayIdIngredients(obj) {
  return concatBurgerObject(obj).map((component) => component._id);
}

function InfoAndOrder({burgerObject}) {
  const auth = useSelector(state => state.auth.isAuthenticated)
  const navigate = useNavigate();
  const idOrder = useSelector((state) => state.orderId.orderId);
  const isOrderRequest = useSelector((state) => state.orderId.orderRequest);
  const dispatch = useDispatch();
  const orderSum = React.useMemo(() => totalSum(burgerObject), [burgerObject]);

  return (
    <div className={styles.order}>
      <span className="text text_type_digits-medium mr-2">{orderSum}</span>
      <img className="mr-10" src={CurrencyIconTotalPrice} alt=""/>
      <Button
        disabled={orderSum === 0}
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => {
          if (!auth) {
            navigate("/login", {replace: true});
          } else {
            dispatch(getIdOrder(arrayIdIngredients(burgerObject)));
          }
        }}
      >
        Оформить заказ
      </Button>
      {isOrderRequest && (
        <Modal onClose={() => {
        }}>
          <p className="text text_type_main-medium mb-20">
            Получаем номер заказа . . .
          </p>
        </Modal>
      )}
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
  const components = useSelector((state) => state.components);
  return (
    <section className={styles.BurgerConstructorContainer}>
      <BurgerConstructorComponents burgerObject={components}/>
      <InfoAndOrder burgerObject={components}/>
    </section>
  );
}
