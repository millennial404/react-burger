import PropTypes from 'prop-types';
import styles from "./IngredientDetails.module.css";

export default function IngredientDetails({ currentIngredient }) {
  return (
    <div className={styles.IngredientDetailsContainer}>
      <img className="mb-4" src={currentIngredient.image_large} alt="" />
      <p className="text text_type_main-medium mb-8">
        {currentIngredient.name}
      </p>
      <ul className={`${styles.nutritionValue} mb-15`}>
        <li className={`${styles.value} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.calories}
          </p>
        </li>
        <li className={`${styles.value} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.proteins}
          </p>
        </li>
        <li className={`${styles.value} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.fat}
          </p>
        </li>
        <li className={`${styles.value} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  image_large: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number
}; 