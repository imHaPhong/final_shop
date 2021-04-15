import React from "react";
import { GoogleLogin } from "react-google-login";

const LoginWithFb = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="10247334101-pc9imkvfcfjn1m07tduoen50fbd73gna.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default LoginWithFb;
