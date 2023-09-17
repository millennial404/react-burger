import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "../services/redux/store";
import React from "react";

type TProtectedRouteElementProps = {
  element: React.ReactNode;
};
export const ProtectedRouteElement = ({element}: TProtectedRouteElementProps) => {
  const auth = useSelector(state => state.auth.isAuthenticated)
  const location = useLocation();
  return auth ? element as JSX.Element : <Navigate to="/login" state={{from: location}}/>;
}