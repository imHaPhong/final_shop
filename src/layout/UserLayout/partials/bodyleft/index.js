import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon } from "rsuite";
import LoginWithFb from "../../../../components/User/LoginWithFb";
import { Login } from "../../../../middlerware/authMiddlerware";
import { getUserInfo } from "../../../../middlerware/userMiddlerware";

const BodyLeft = ({ user, Login, auth }) => {
  const INTI_VALUE = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(INTI_VALUE);

  // useEffect(() => {
  //   if (auth.auth) {
  //     getUserInfo();
  //   }
  // }, [auth.auth]);

  const handlerEmailChange = (e) => {
    setState((p) => ({ ...p, email: e.target.value }));
  };
  const handlerPasswordChange = (e) => {
    setState((p) => ({ ...p, password: e.target.value }));
  };

  const submitHandler = async () => {
    Login(state);
  };

  const useSbumit = (e) => {
    if (
      state.password.length !== 0 &&
      state.email.length !== 0 &&
      e.keyCode === 13
    ) {
      submitHandler();
    }
  };
  let history = useHistory();
  
  const userRegister = () => {
    history.push('/register')
  }

  const loginWithGg = () => {

  }

  return (
    <div className="boder">
      <div className="post-left">
        <div className="post-left-header">
          {user.username && (
            <div className="header-userinfo">
              <div
                className="user-background"
                style={{
                  backgroundImage: `url("data:image/jpeg;base64,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")`,
                }}
              ></div>
              <div className="user-avatar">
                <img src={user.uAvatar} alt="" />
                <span>{user.username}</span>
              </div>
            </div>
          )}
          {!auth.auth && !auth.loading && (
            <div className="user-login">
              <input
                type="text"
                placeholder="email"
                onChange={handlerEmailChange}
                value={state.email}
              />
              <input
                type="password"
                placeholder="password"
                onKeyDown={useSbumit}
                onChange={handlerPasswordChange}
                value={state.password}
              />
              <div className="user-login-footer">
                <span className="btn" onClick={submitHandler} style={{display:"block", textAlign:"center"}}>
                  Login
                </span>
                <span style={{textAlign:"center", margin: "10px 0"}}>
                  Or
                </span>
                <span  onClick={loginWithGg} style={{display:"block", textAlign:"center"}}>
                  <LoginWithFb/>
                </span>
                <span style={{display: "block", textAlign: "center", marginTop: "2rem", cursor: "pointer"}} onClick={userRegister}>
                  Register new account
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { Login, getUserInfo })(BodyLeft);
