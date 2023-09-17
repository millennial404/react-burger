import { useSelector} from "../../services/redux/store";
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { useDrag } from "react-dnd";
import {InViewHookResponse, useInView} from "react-intersection-observer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { productsPropTypes } from "../../utils/types";

type TabBurgerIngredientsProps = {
  current: string;
  setCurrent: (current: string) => void;
};
const TabBurgerIngredients = ({ current, setCurrent }: TabBurgerIngredientsProps) => {
  const scrollIntoIngredients = (ingredients: string) =>
    document
      .querySelector(`#${ingredients}`)
      ?.scrollIntoView({ block: "start", behavior: "smooth" });

  return (
    <div className={styles.tabBurgerIngredients}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={() => {
          setCurrent("bun");
          scrollIntoIngredients("bun");
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={() => {
          setCurrent("sauce");
          scrollIntoIngredients("sauce");
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "main"}
        onClick={() => {
          setCurrent("main");
          scrollIntoIngredients("main");
        }}
      >
        Начинки
      </Tab>
    </div>
  );
};

type CardProps = {
  cardData: productsPropTypes;
}

function Card({ cardData }: CardProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: { cardData: cardData },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <li
        draggable={true}
        ref={drag}
        className={`${styles.card} ml-4 mr-6 mb-8`}
        style={{
          border: isDragging ? "1px solid #801ab3" : "0px",
          boxSizing: isDragging ? "border-box" : "content-box",
        }}
        onClick={() => {
          navigate(`/ingredients/${cardData._id}`, {
            state: { backgroundLocation: location },
          });
        }}
      >
        <img
          className="mb-1 ml-4 mr-4"
          src={cardData.image}
          alt={cardData.name}
        />

        {cardData.count > 0 && (
          <Counter count={cardData.count} size="default" extraClass="m-1" />
        )}

        <div className={`${styles.price} mb-1`}>
          <p className="text text_type_digits-default pr-2">{cardData.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>
          {cardData.name}
        </p>
      </li>
    </>
  );
}

type CardsByTypesProps = {
  setCurrent: (arg: string) => void;
  ingredients: productsPropTypes[];
}

interface ICardTypes {
  [key: string]: {name: string; ref: InViewHookResponse};
}

function CardsByTypes({ setCurrent, ingredients }: CardsByTypesProps) {
  const cardTypes: ICardTypes = {
    bun: {
      name: "Булки",
      ref: useInView({
        root: document.querySelector("#cardsContainer"),
        rootMargin: "0px 0px -98% 0px",
        threshold: 0,
        initialInView: false,
        onChange: (inView) => inView && setCurrent("bun"),
      }),
    },
    sauce: {
      name: "Соусы",
      ref: useInView({
        root: document.querySelector("#cardsContainer"),
        rootMargin: "0px 0px -98% 0px",
        threshold: 0,
        initialInView: false,
        onChange: (inView) => inView && setCurrent("sauce"),
      }),
    },
    main: {
      name: "Начинки",
      ref: useInView({
        root: document.querySelector("#cardsContainer"),
        rootMargin: "0px 0px -98% 0px",
        threshold: 0,
        initialInView: false,
        onChange: (inView) => inView && setCurrent("main"),
      }),
    },
  };

  return (
    <div id={"cardsContainer"} className={styles.cardsContainer}>
      {Object.keys(cardTypes).map((key) => (
        <div key={key}>
          <h2
            ref={cardTypes[key].ref.ref}
            id={key}
            className="text text_type_main-medium mt-10 mb-6"
          >
            {cardTypes[key].name}
          </h2>
          <ul className={`${styles.cards} mb-10`}>
            {ingredients.map(
              (ingredient) =>
                key === ingredient.type && (
                  <Card key={ingredient._id} cardData={ingredient} />
                )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const { ingredients } = useSelector((state) => state.ingredients);

  return (
    <>
      <section className={styles.BurgerIngredientsContainer}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <TabBurgerIngredients current={current} setCurrent={setCurrent} />
        <CardsByTypes setCurrent={setCurrent} ingredients={ingredients} />
      </section>
    </>
  );
}
