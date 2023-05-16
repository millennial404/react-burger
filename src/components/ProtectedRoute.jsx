import {Navigate} from "react-router-dom";
const useAuth = () => {
  return true
}
export const ProtectedRouteElement = ({ element }) => {
  let auth  = useAuth();
  return auth ? element : <Navigate to="/login" replace/>;
}