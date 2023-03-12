import React from "react";
import {
  // Counter,
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

function Card({ cardData }) {
  return (
    <li className={`${styles.card} ml-4 mr-6 mb-8`}>
      <img
        className={`${styles.image} mb-1 ml-4 mr-4`}
        src={cardData.image}
        alt={cardData.name}
      />

      {/* <Counter count={1} size="default" extraClass="m-1" /> */}

      <div className={`${styles.price} mb-1`}>
        <p className="text text_type_digits-default pr-2">{cardData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>
        {cardData.name}
      </p>
    </li>
  );
}

function CardsByTypes({ ingridients }) {
  const cardTypes = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  return (
    <div className={styles.cardsContainer}>
      {Object.keys(cardTypes).map((key) => (
        <React.Fragment key={key}>
          <h2 className="text text_type_main-medium mt-10 mb-6">
            {cardTypes[key]}
          </h2>
          <ul className={`${styles.cards} mb-10`}>
            {ingridients.map(
              (ingridient) =>
                key === ingridient.type && (
                  <Card key={ingridient._id} cardData={ingridient} />
                )
            )}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function BurgerIngredients(props) {
  return (
    <section className={styles.BurgerIngredientsContainer}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <TabBurgerIngredients />
      <CardsByTypes ingridients={props.products} />
    </section>
  );
}
