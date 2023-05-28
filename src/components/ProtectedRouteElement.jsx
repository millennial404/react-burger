import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";


export const ProtectedRouteElement = ({element}) => {
  const auth = useSelector(state => state.auth.isAuthenticated)
  return auth ? element : <Navigate to="/login" replace/>;
}