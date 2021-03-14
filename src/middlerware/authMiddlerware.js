import { axiouInst } from "../config/axiosInstance";
import { loginFail, loginSucess } from "../store/action/authAction/authAction";
import { LoginProcess } from "../store/action/authAction/authActionTypes";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const Login = (data) => async (dispatch) => {
  const dataSend = {
    email: data.email,
    password: data.password,
  };

  try {
    const request = await axiouInst.post("/login", dataSend, config);
    const token = request.data.token;
    localStorage.setItem("auth_token", token);
    dispatch(loginSucess(token));
    window.location.href = "/user";
  } catch (error) {
    dispatch(loginFail(error));
  }
};
