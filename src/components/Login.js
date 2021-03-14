import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Login } from "../middlerware/authMiddlerware";

const LoginPage = ({ Login, auth }) => {
  const INTI_VALUE = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(INTI_VALUE);

  const handlerEmailChange = (e) => {
    setState((p) => ({ ...p, email: e.target.value }));
  };
  const handlerPasswordChange = (e) => {
    setState((p) => ({ ...p, password: e.target.value }));
  };

  const submitHandler = () => {
    Login(state);
  };

  return (
    <div>
      <input
        type="text"
        name="email"
        id=""
        value={state.email}
        onChange={handlerEmailChange}
      />
      <input
        type="text"
        name="password"
        id=""
        value={state.password}
        onChange={handlerPasswordChange}
      />
      <input type="submit" value="Oke" onClick={submitHandler} />
      <Link to="/user/info" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { Login })(LoginPage);
