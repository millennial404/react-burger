import React from "react";
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";

const TabBurgerIngredients = () => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

const CardsByTypes = () => {
  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
      <ul>
        <li>
          <img
            src="https://code.s3.yandex.net/react/code/bun-02.png"
            alt="Краторная булка N-200i"
          />
          <Counter count={1} size="default" extraClass="m-1" />
          <p className="text text_type_digits-default">
            20
            <CurrencyIcon type="primary" />
          </p>
          <p>Краторная булка N-200i</p>
        </li>
      </ul>
    </>
  );
};

export default function BurgerIngredients({ products }) {
  console.log(products);
  return (
    <section className={styles.BurgerIngredientsContainer}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <TabBurgerIngredients />
      <CardsByTypes />
    </section>
  );
}
