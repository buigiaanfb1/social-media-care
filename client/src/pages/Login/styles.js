import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
  },
  picture: {
    flex: 1,
    backgroundImage: 'url("your-image-url.jpg")', // Set your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: 300,
    padding: theme.spacing(3),
    backgroundColor: "white",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],

    "& .MuiButtonBase-root": {
      marginTop: theme.spacing(2),
      marginLeft: "auto",
      padding: theme.spacing(1, 2),
    },
  },
}));

export default useStyles;
