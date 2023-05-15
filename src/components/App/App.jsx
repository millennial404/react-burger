import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import { HomePage, LoginPage } from "../../pages";
import {RegisterPage} from "../../pages/RegisterPage";
import {ForgotPasswordPage} from "../../pages/ForgotPasswordPage";
import {ResetPasswordPage} from "../../pages/ResetPasswordPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {NotFoundPage} from "../../pages/NotFoundPage";
import {OrdersHistoryPage} from "../../pages/OrdersHistoryPage";
import {ProtectedRouteElement} from "../ProtectedRoute";
function App() {
  return (
    <>
      <Router>
      <AppHeader />
        <Routes>
          <Route path="/" element={<ProtectedRouteElement element={<HomePage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
          <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersHistoryPage />} />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
