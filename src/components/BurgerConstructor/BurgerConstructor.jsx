import {
  Counter,
  Tab,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import img from "../../images/bun-02.svg";

function BurgerConstructorEl() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={img}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={img}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={img}
      />
    </div>
  );
}
export default function BurgerConstructor() {
  return (
    <section className={styles.BurgerConstructorContainer}>
      <BurgerConstructorEl />
    </section>
  );
}
