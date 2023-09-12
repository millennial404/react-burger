import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";


export const ProtectedRouteElement = ({element}) => {
  const auth = useSelector(state => state.auth.isAuthenticated)
  const location = useLocation();
  return auth ? element : <Navigate to="/login" state={{ from: location }} />;
}