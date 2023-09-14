import {useSelector} from "react-redux";
import style from "./OrdersCardsFeed.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {priceOrder} from "./utils";
import { productsPropTypes } from "../../utils/types";
import { TOrder } from "../../utils/types";


type TImageIngredientProps = {
  ingredient: string;
  index: number;
  digit: number;
};
const ImageIngredient = ({ingredient, index, digit}: TImageIngredientProps) => {
  const allIngredients = useSelector((state) => state.ingredients.ingredients);
  const img = allIngredients.find(
    (element: productsPropTypes) => element._id === ingredient
  ).image;
  return (
    <li className={`${style.component} `}>
      <img className={`${style.componentsImg} ${index === 5 && digit > 0 && style.opacity}`} src={img} alt=""/>
      {index === 5 && <p className={`${style.digit} text text_type_digits-default`}
      >{digit > 0 && `+${digit}`}</p>}
    </li>
  );
};

type TOrdersCardsFeedProps = {
  order: TOrder;
  onClick: () => void;
};
export const OrdersCardsFeed = (props: TOrdersCardsFeedProps) => {
  const menuIngredients = useSelector((state) => state.ingredients.ingredients);
  const {number, name, createdAt, ingredients} = props.order;
  const onClick = props.onClick
  const firstSixIngredients = ingredients.slice(0, 6)
  const price = priceOrder(menuIngredients, ingredients);
  const digit = ingredients.length - 6
  return (
    <li
      className={`${style.orderCard} p-6 mb-4`}
      onClick={onClick}
    >
      <div className={style.orderNumber}>
        <span className="text text_type_digits-default mb-6">{`#${number}`}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)}/>
        </span>
      </div>
      <p className="text text_type_main-medium mb-6">{name}</p>
      <div className={style.componentsAndPrice}>
        <ul className={style.components}>
          {firstSixIngredients
            ?.map((ingredient, i) => {
              return <ImageIngredient ingredient={ingredient} digit={digit} index={i} key={i}/>;
            })
            .reverse()}
        </ul>
        <div className={style.price}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </li>
  );
};