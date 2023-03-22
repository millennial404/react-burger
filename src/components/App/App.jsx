import React from "react";
import style from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { getIngridients } from "../../utils/burger-api";
import { BurgerConstructorContext } from "../services/BurgerConstructorContext";

function App() {
  const [state, setState] = React.useState({
    products: [],
    loading: true,
  });
  const urlApi = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {
    getIngridients(urlApi)
      .then((productsData) => {
        setState({ products: productsData.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngredients products={state.products} />
        <BurgerConstructorContext.Provider value={state.products}>
          <BurgerConstructor />
        </BurgerConstructorContext.Provider>
      </main>
    </>
  );
}

export default App;
