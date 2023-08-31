// NavigationBar.js
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Drawer, List } from "@mui/material";
import { FeedOutlined, AccountCircle, ExitToApp } from "@mui/icons-material"; // Import icons
import { validateUserLoggedIn } from "../../utils/api";

// import Logo from "./Logo";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    boxShadow: theme.shadows[5], // Add a subtle shadow
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main, // Use your preferred color
    color: theme.palette.primary.contrastText,
    display: "flex",
    flexDirection: "column", // Display items in a column
    justifyContent: "space-between", // Space items evenly
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    padding: theme.spacing(2, 3),
    transition: "background-color 0.3s ease",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark, // Change color on hover
    },
  },
  listItemIcon: {
    marginRight: theme.spacing(2),
  },
  activeLink: {
    backgroundColor: theme.palette.primary.dark,
  },
  logoutButton: {
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.error.main, // Red background color
    color: theme.palette.error.contrastText, // White text color
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.error.dark, // Darker red on hover
    },
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleCheckLoggedIn = async () => {
    const data = JSON.parse(localStorage.getItem("data"));

    if (!data) {
      navigate("/login");
    }

    const { loggedIn } = await validateUserLoggedIn(
      data?.access_token,
      data?.phoneNumber
    );

    if (!loggedIn) {
      localStorage.removeItem("data");
      navigate("/login");
    }
  };

  useEffect(() => {
    handleCheckLoggedIn();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("data");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div>
        <div className={classes.toolbar}>{/* <Logo /> */}</div>
        <List>
          {/* Navigation Links */}
          <NavLink
            to="/all-posts"
            className={classes.listItem}
            activeClassName={classes.activeLink}
          >
            <FeedOutlined className={classes.listItemIcon} />
            All posts
          </NavLink>

          <NavLink
            to="/account"
            className={classes.listItem}
            activeClassName={classes.activeLink}
          >
            <AccountCircle className={classes.listItemIcon} />
            Account
          </NavLink>
        </List>
      </div>

      {/* Logout Button */}
      <div onClick={handleLogout} className={classes.logoutButton}>
        <ExitToApp className={classes.listItemIcon} />
        Logout
      </div>
    </Drawer>
  );
};

export default NavigationBar;
