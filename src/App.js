import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

import { Switch, Route } from "react-router-dom";
import UserAuthContextProvider from "./context/UserAuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import PhoneSignUp from "./components/PhoneSignUp";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Route>
          <Route path="/phoneSignUp">
            <PhoneSignUp />
          </Route>
        </Switch>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
