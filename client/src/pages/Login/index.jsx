import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAccessCode, validateAccessCode } from "../../utils/api"; // Import the Axios utility
import SmsCodeForm from "../../components/Login/SmsCodeForm";
import PhoneNumberForm from "../../components/Login/PhoneNumberForm";
import { validateUserLoggedIn } from "../../utils/api";
import useStyles from "./styles";

const LoginComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [checkLoggedIn, setCheckLoggedIn] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("+84");
  const [showSmsCodeForm, setShowSmsCodeForm] = useState(false);

  const handleCheckLoggedIn = async () => {
    const data = JSON.parse(localStorage.getItem("data"));

    if (!data) {
      setCheckLoggedIn(true);
    }

    const { loggedIn } = await validateUserLoggedIn(
      data?.access_token,
      data?.phoneNumber
    );

    if (loggedIn) {
      navigate("/");
    }

    localStorage.removeItem("data");
    setCheckLoggedIn(true);
  };

  useEffect(() => {
    handleCheckLoggedIn();
  }, []);

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
      const { data } = await validateAccessCode(phoneNumber, code);
      if (data) {
        localStorage.setItem(
          "data",
          JSON.stringify({ phoneNumber, access_token: data.access_token })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error sending access code:", error);
    }
  };

  if (!checkLoggedIn) return <div>Loading...</div>;

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
