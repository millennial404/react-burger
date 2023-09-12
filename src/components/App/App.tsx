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
import {getIngredients} from "../../services/redux/actions/ingredients";
import {useDispatch} from "react-redux";
import {getLoginData} from "../../services/redux/actions/auth";
import Cookies from 'js-cookie';
import {FeedPage} from "../../pages/FeedPage";
import {OrderPage} from "../../pages/OrderPage";
import {UserOrderPage} from "../../pages/UserOrderPage";
import {OrderPageModal} from "../../pages/OrderPageModal";
import {UserOrderPageModal} from "../../pages/UserOrderPageModal";


export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get('accessToken')) {
      dispatch(getLoginData())
    }
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
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<UserOrderPage/>}/>}/>
        <Route path="/ingredients/:id" element={<IngredientPage/>}/>
        <Route path="/feed" element={<FeedPage/>}/>
        <Route path="/feed/:id" element={<OrderPage/>}/>
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsModal/>}/>
          <Route path="/feed/:id" element={<OrderPageModal/>}/>
          <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<UserOrderPageModal/>}/>}/>
        </Routes>
      )}
    </>
  );
}
