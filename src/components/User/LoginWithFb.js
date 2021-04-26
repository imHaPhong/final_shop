import React from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { loginSendToken } from "../../middlerware/userMiddlerware";

const LoginWithFb = ({loginSendToken}) => {
  const responseGoogle = (response) => {
    loginSendToken(response.accessToken)
  };

  return (
    <GoogleLogin
    style={{display: 'block', width:"100%"}}
      clientId="10247334101-pc9imkvfcfjn1m07tduoen50fbd73gna.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    >
  
    <span> Login with Google</span>
      </GoogleLogin>
  );
};

export default connect(null, {loginSendToken})(LoginWithFb);
