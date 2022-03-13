import { useUserAuth } from "../context/UserAuthContextProvider";
import { useHistory } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  const history = useHistory();

  if (!user) {
    history.push("/");
  }

  return children;
};

export default ProtectedRoute;
