import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";

type TProtectedRouteElementProps = {
  element: React.ReactNode;
};
export const ProtectedRouteElement = ({element}: TProtectedRouteElementProps) => {
  const auth = useSelector(state => state.auth.isAuthenticated)
  const location = useLocation();
  return auth ? element : <Navigate to="/login" state={{ from: location }} />;
}