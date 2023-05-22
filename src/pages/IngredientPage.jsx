import styles from "./IngredientPage.module.css";
import {useSelector} from "react-redux";

export default function IngredientPage() {
  const ingredientDetails = useSelector(state => state.ingredientDetails)
  return (
    <div className={styles.IngredientDetailsContainer}>
      <img className="mb-4" src={ingredientDetails.image_large} alt=""/>
      <p className="text text_type_main-medium mb-8">
        {ingredientDetails.name}
      </p>
      <ul className={`${styles.nutritionValue} mb-15`}>
        <li className={`${styles.value} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.calories}
          </p>
        </li>
        <li className={`${styles.value} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.proteins}
          </p>
        </li>
        <li className={`${styles.value} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.fat}
          </p>
        </li>
        <li className={`${styles.value} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
