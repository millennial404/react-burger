import {Navigate} from "react-router-dom";
import {useState} from "react";

const fakeAuth = {
  isAuthenticated: false,
  signIn(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signOut(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = cb => {
    return fakeAuth.signIn(() => {
      // Временные данные, которые будут доступны приложению
      setUser({ id: 1337, name: 'David' });
      cb();
    });
  };

  const signOut = cb => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signIn,
    signOut
  };
}

const useAuth = () => {
  return true
}
export const ProtectedRouteElement = ({ element }) => {
  let auth  = useAuth();
  return auth ? element : <Navigate to="/login" replace/>;
}