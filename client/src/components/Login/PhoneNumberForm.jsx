import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

const PhoneNumberForm = ({ onSubmitPhoneNumber, phoneNumber }) => {
  const [phoneNumberState, setPhoneNumberState] = useState(phoneNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPhoneNumber(phoneNumberState);
  };

  const handleChange = (newValue) => {
    setPhoneNumberState(newValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MuiTelInput
        value={phoneNumberState}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" type="submit">
          Get OTP
        </Button>
      </div>
    </form>
  );
};

export default PhoneNumberForm;
