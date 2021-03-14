import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const PublicRouter = ({ children, auth }) => {
  console.log(auth);
  if (auth.accessToken) {
    return <Redirect to="/user" />;
  }
  return <div>{children}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PublicRouter);
