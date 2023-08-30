// LoginComponent/SmsCodeForm.js
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

import useStyles from "./styles";

const SmsCodeForm = ({ onSubmitSmsCode }) => {
  const classes = useStyles();
  const [smsCode, setSmsCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSmsCode(smsCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        label="SMS Code"
        variant="outlined"
        fullWidth
        value={smsCode}
        onChange={(e) => setSmsCode(e.target.value)}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default SmsCodeForm;
