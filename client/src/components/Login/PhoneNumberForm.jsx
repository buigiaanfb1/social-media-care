import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const PhoneNumberForm = ({ onSubmitPhoneNumber, phoneNumber }) => {
  const [phoneNumberState, setPhoneNumberState] = useState(phoneNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPhoneNumber(phoneNumberState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={phoneNumberState}
        onChange={(e) => setPhoneNumberState(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default PhoneNumberForm;
