import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SmsCodeForm from "../../components/Login/SmsCodeForm";
import PhoneNumberForm from "../../components/Login/PhoneNumberForm";
import useStyles from "./styles";

const LoginComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSmsCodeForm, setShowSmsCodeForm] = useState(false);
  console.log(phoneNumber);
  const handlePhoneNumberSubmit = (number) => {
    setPhoneNumber(number);
    setShowSmsCodeForm(true);
  };

  const handleSmsCodeSubmit = (code) => {
    // Submit the phone number and code to the backend
    console.log("Phone Number:", phoneNumber);
    console.log("SMS Code:", code);

    navigate("/");
  };

  return (
    <div className={classes.container}>
      <div className={classes.picture}></div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <div>
            {showSmsCodeForm && (
              <h6 onClick={() => setShowSmsCodeForm(false)}>Back</h6>
            )}
          </div>
          <h1>
            {showSmsCodeForm
              ? "Please enter 6 digits were sent to your phone"
              : "Enter your phone number to login"}
          </h1>
          {showSmsCodeForm ? (
            <SmsCodeForm onSubmitSmsCode={handleSmsCodeSubmit} />
          ) : (
            <PhoneNumberForm
              onSubmitPhoneNumber={handlePhoneNumberSubmit}
              phoneNumber={phoneNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
