import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import img from "../../images/bun-02.svg";
import CurrencyIconTotalPrice from "../../images/CurrencyIcon36x36.svg";
import componentMarkerImg from "../../images/icon24x24.svg";

function Component({component}) {
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

function BurgerConstructorComponents({ components }) {
  return (
    <>
      <div className={`${styles.bugrgerComponents} mt-25 mb-10 ml-4`}>
        <div className={styles.componentTop}>
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
        <div className={styles.componentBottom}>
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
  return (
    <div className={styles.order}>
      <span className="text text_type_digits-medium mr-2">610</span>
      <img className="mr-10" src={CurrencyIconTotalPrice} alt="" />
      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  );
}

export default function BurgerConstructor(props) {
  return (
    <section className={styles.BurgerConstructorContainer}>
      <BurgerConstructorComponents components={props.products} />
      <InfoAndOrder />
    </section>
  );
}
