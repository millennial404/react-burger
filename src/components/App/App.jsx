import React from "react";
import style from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  const [state, setState] = React.useState({
    products: [],
    loading: true,
  });
  const urlApi = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {
    fetch(urlApi)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
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
        <BurgerConstructor products={state.products} />
      </main>
    </>
  );
}

export default App;
