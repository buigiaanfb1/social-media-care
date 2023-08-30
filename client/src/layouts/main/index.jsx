// MainLayout.js
import React from "react";
import { makeStyles } from "@mui/styles";
import { Outlet } from "react-router-dom";

import NavigationBar from "../../components/common/NavigationBar"; // Create this component

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
