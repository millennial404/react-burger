import { useSelector } from "react-redux";
import {Navigate} from "react-router-dom";


export const ProtectedRouteElement = ({ element }) => {
  let auth  = useSelector(state=>state.auth);
  return auth.userData ? element : <Navigate to="/login" replace/>;
}