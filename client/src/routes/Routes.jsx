// routes/Routes.js
import React from "react";
import {
  BrowserRouter,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import Account from "../pages/Account";
import Posts from "../pages/Posts";
import MainLayout from "../layouts/main";

const RequireAuth = ({ children }) => {
  const userIsLogged = Boolean(localStorage.getItem("phoneNumber")); // Your hook to get login status

  if (!userIsLogged) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

const RequireCheckAuth = ({ children }) => {
  const userIsLogged = Boolean(localStorage.getItem("phoneNumber")); // Your hook to get login status

  if (userIsLogged) {
    return <Navigate to="/all-posts" replace={true} />;
  }
  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          element={
            <RequireCheckAuth>
              <LoginPage />
            </RequireCheckAuth>
          }
        />
        <Route path="/" element={<Navigate to="/all-posts" replace />} />
        <Route
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route path="/account" element={<Account />} />
          <Route path="/all-posts" element={<Posts />} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
