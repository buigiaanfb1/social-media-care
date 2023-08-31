// SocialMediaGrid.js
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SocialMediaModal from "./SocialMediaModal"; // Create this component

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(1),
  },
  addButton: {
    marginTop: theme.spacing(1),
  },
}));

const SocialMediaGrid = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState("");

  const handleItemClick = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
    setModalOpen(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper
          className={classes.paper}
          onClick={() => handleItemClick("Facebook")}
        >
          <FacebookIcon className={classes.icon} />
          <div>Facebook</div>
          <Button
            variant="outlined"
            color="primary"
            className={classes.addButton}
            onClick={() => handleItemClick("Facebook")}
          >
            Add
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          className={classes.paper}
          onClick={() => handleItemClick("Twitter")}
        >
          <TwitterIcon className={classes.icon} />
          <div>Twitter</div>
          <Button
            variant="outlined"
            color="primary"
            className={classes.addButton}
            onClick={() => handleItemClick("Twitter")}
          >
            Add
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          className={classes.paper}
          onClick={() => handleItemClick("Instagram")}
        >
          <InstagramIcon className={classes.icon} />
          <div>Instagram</div>
          <Button
            variant="outlined"
            color="primary"
            className={classes.addButton}
            onClick={() => handleItemClick("Instagram")}
          >
            Add
          </Button>
        </Paper>
      </Grid>
      <SocialMediaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        socialMedia={selectedSocialMedia}
      />
    </Grid>
  );
};

export default SocialMediaGrid;
