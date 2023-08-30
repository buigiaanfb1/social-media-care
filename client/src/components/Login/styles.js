import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  "MuiButtonBase-root": {
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    padding: theme.spacing(1, 2),
  },
}));

export default useStyles;
