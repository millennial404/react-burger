import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


export const ProtectedRouteElement = ({element}) => {
  const auth = useSelector(state => state.auth.isAuthenticated);
  return auth ? element : <Navigate to="/login" replace/>;
}