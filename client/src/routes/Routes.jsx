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
import MainLayout from "../layouts/main";

const RequireAuth = ({ children }) => {
  const userIsLogged = true; // Your hook to get login status

  if (!userIsLogged) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<HomePage />} />
          <Route path="/all-posts" element={<HomePage />} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
