// NavigationBar.js
import React from "react";
import { makeStyles } from "@mui/styles";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom"; // Import NavLink

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {/* Add more navigation items as needed */}
        <div>
          <NavLink
            to="/all-posts"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            All posts
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/account"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Account
          </NavLink>
        </div>
      </List>
    </Drawer>
  );
};

export default NavigationBar;
