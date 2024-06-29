import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

function Protected({ children }) {
  const { isuserloggedin } = useAuth();
  const location = useLocation();
  if (!isuserloggedin) {
    console.log({ isuserloggedin });
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
}
export default Protected;
