import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAccessCode, validateAccessCode } from "../../utils/api"; // Import the Axios utility
import SmsCodeForm from "../../components/Login/SmsCodeForm";
import PhoneNumberForm from "../../components/Login/PhoneNumberForm";
import useStyles from "./styles";

const LoginComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("+84");
  const [showSmsCodeForm, setShowSmsCodeForm] = useState(false);

  const handlePhoneNumberSubmit = async (number) => {
    try {
      setPhoneNumber(number);
      await createAccessCode(number);
      setShowSmsCodeForm(true);
    } catch (error) {
      console.error("Error sending access code:", error);
    }
  };

  const handleSmsCodeSubmit = async (code) => {
    try {
      await validateAccessCode(phoneNumber, code);
      localStorage.setItem("phoneNumber", phoneNumber);
      navigate("/");
    } catch (error) {
      console.error("Error sending access code:", error);
    }
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
          <h3>
            {showSmsCodeForm
              ? "Please enter 6 digits were sent to your phone"
              : "Enter your phone number to login"}
          </h3>
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
