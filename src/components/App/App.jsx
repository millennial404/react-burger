import React, { useEffect } from "react";
import style from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const urlApi = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = React.useState({ 
    productData: null,
    loading: true
  })

  React.useEffect(() => {
    const getProductData = async () => {
      setState({...state, loading: true});
      const res = await fetch(urlApi);
      const data = await res.json();
      setState({ productData: data.data, loading: false });
    }
    getProductData();
  },[])

  return (
    <>
    <AppHeader />
    <main className={style.main}>
    <BurgerIngredients products={state.productData} />
    <BurgerConstructor />
    </main>
    
    </>
  );
}

export default App;
