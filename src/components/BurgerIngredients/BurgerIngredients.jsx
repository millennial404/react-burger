import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from 'react-redux';
import {getIngredients} from "../../services/actions/ingredients";
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import styles from "./BurgerIngredients.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {productsPropTypes} from "../../utils/prop-types";
import {addBurgerComponent} from "../../services/actions/constructorIngredients";

const TabBurgerIngredients = () => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div style={{display: "flex"}}>
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

function Card({cardData}) {
  const constructorBurgerData = useSelector(state => state.components)
  const dispatch = useDispatch();
  const [popupOpen, setPopupOpen] = React.useState(false);
  return (
    <>
      <li
        className={`${styles.card} ml-4 mr-6 mb-8`}
        onClick={() => {
          setPopupOpen(true);
          dispatch(addBurgerComponent(cardData));
          console.log(constructorBurgerData)
        }}
      >
        <img
          className={`${styles.image} mb-1 ml-4 mr-4`}
          src={cardData.image}
          alt={cardData.name}
        />

        {cardData._id === "60d3b41abdacab0026a733c6" && (
          <Counter count={1} size="default" extraClass="m-1"/>
        )}

        <div className={`${styles.price} mb-1`}>
          <p className="text text_type_digits-default pr-2">{cardData.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>
          {cardData.name}
        </p>
      </li>
      {popupOpen && (
        <Modal onClose={() => setPopupOpen(false)} title="Детали ингредиента">
          <IngredientDetails currentIngredient={cardData}/>
        </Modal>
      )}
    </>
  );
}

Card.propTypes = {
  cardData: productsPropTypes.isRequired,
};

function CardsByTypes({ingredients}) {
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
            {ingredients.map(
              (ingredient) =>
                key === ingredient.type && (
                  <Card key={ingredient._id} cardData={ingredient}/>
                )
            )}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
}

CardsByTypes.propTypes = {
  ingredients: PropTypes.arrayOf(productsPropTypes).isRequired,
};

export default function BurgerIngredients() {

  // Вытаскиваем селектором нужные данные из хранилища
  const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(state => state.ingredients);

  // Получаем метод dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getIngredients())
  }, [dispatch])

  if (ingredientsFailed) {
    console.log('Произошла ошибка при получении данных');
  } else if (ingredientsRequest) {
    console.log('Загрузка...');
  } else {
    console.log(ingredients);
  }


  return (
    <section className={styles.BurgerIngredientsContainer}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <TabBurgerIngredients/>
      <CardsByTypes ingredients={ingredients}/>
    </section>
  );
}
