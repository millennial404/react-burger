import {clearIngredientDetails, ingredientDetails} from "../services/redux/actions/currentIngredient";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import {Modal} from "../components/Modal/Modal";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../services/redux/store";
import {useNavigate, useParams} from "react-router-dom";
import {getIngredientById} from "../utils/card";

export const IngredientDetailsModal = () => {
  const {id} = useParams();
  const ingredients = useSelector(state => state.ingredients.ingredients);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    const ingredient = getIngredientById(id, ingredients)
    dispatch(ingredientDetails({calories: 0, carbohydrates: 0, fat: 0, image_large: "", name: "", proteins: 0, ...ingredient}))
  }, [dispatch, id, ingredients])

  return (
    <Modal onClose={() => {
      navigate(-1);
      dispatch(clearIngredientDetails())
    }} title="Детали ингредиента">
      <IngredientDetails/>
    </Modal>
  )
}
