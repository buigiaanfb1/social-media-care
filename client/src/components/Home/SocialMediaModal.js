// SocialMediaModal.js
import React from "react";
import { makeStyles } from "@mui/styles";
import { Modal, Paper, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { api } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(1),
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
}));

const SocialMediaModal = ({ open, onClose, socialMedia }) => {
  const classes = useStyles();

  const getSocialMediaIcon = () => {
    switch (socialMedia) {
      case "Facebook":
        return <FacebookIcon className={classes.icon} />;
      case "Twitter":
        return <TwitterIcon className={classes.icon} />;
      case "Instagram":
        return <InstagramIcon className={classes.icon} />;
      default:
        return null;
    }
  };

  const handleClick = async () => {
    window.location.href = "http://localhost:5000/auth/facebook";
  };

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div>
        <Paper className={classes.paper}>
          {getSocialMediaIcon()}
          <div>{socialMedia}</div>
          <Button
            variant="outlined"
            color="primary"
            className={classes.addButton}
            onClick={handleClick}
          >
            Add Account
          </Button>
        </Paper>
      </div>
    </Modal>
  );
};

export default SocialMediaModal;
