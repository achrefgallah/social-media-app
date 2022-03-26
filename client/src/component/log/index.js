import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = (props) => {
  const [signUpModel, setSignUpModel] = useState(props.signup);
  const [signInModel, setSignINModel] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignINModel(false);
      setSignUpModel(true);
    } else if (e.target.id === "login") {
      setSignINModel(true);
      setSignUpModel(false);
    }
  };
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModel ? "active-btn" : null}
          >
            s'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModel ? "active-btn" : null}
          >
            se connecter
          </li>
        </ul>
        {signUpModel && <SignUpForm />}
        {signInModel && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
