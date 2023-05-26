import {Routes, Route, useLocation} from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import {HomePage, LoginPage} from "../../pages";
import {RegisterPage} from "../../pages/RegisterPage";
import {ForgotPasswordPage} from "../../pages/ForgotPasswordPage";
import {ResetPasswordPage} from "../../pages/ResetPasswordPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {NotFoundPage} from "../../pages/NotFoundPage";
import {OrdersHistoryPage} from "../../pages/OrdersHistoryPage";
import {ProtectedRouteElement} from "../ProtectedRouteElement";
import IngredientPage from "../../pages/IngredientPage";
import {IngredientDetailsModal} from "../../pages/IngredientDetailsModal";
import {useEffect} from "react";
import {getIngredients} from "../../services/actions/ingredients";
import {useDispatch} from "react-redux";
import {getLoginData} from "../../services/actions/auth";


export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginData())
    dispatch(getIngredients())
  }, [dispatch])
  const location = useLocation();
  const state = location.state
  return (
    <>
      <AppHeader/>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage/>}/>}/>
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersHistoryPage/>}/>}/>
        <Route path="/ingredients/:id" element={<IngredientPage/>}/>
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsModal/>} />
        </Routes>
      )}
    </>
  );
}
