import styles from "./IngredientPage.module.css";
import {useDispatch, useSelector} from "../services/redux/store";
import React, {useEffect} from "react";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import {useParams} from "react-router-dom";
import {getIngredientById} from "../utils/card";
import {ingredientDetails} from "../services/redux/actions/currentIngredient";


export default function IngredientPage() {
  const {id} = useParams();
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const dispatch = useDispatch();
  useEffect(() => {
    const ingredient = getIngredientById(id, ingredients)
    dispatch(ingredientDetails({calories: 0, carbohydrates: 0, fat: 0, image_large: "", name: "", proteins: 0, ...ingredient}))
  }, [dispatch, id, ingredients])

  return (
    <div>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <IngredientDetails/>
    </div>
  )
}
