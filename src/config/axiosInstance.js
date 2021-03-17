import axios from "axios";

export const axiouInst = axios.create({
  // baseURL: "https://tuanna-final.herokuapp.com/",
  baseURL: "http://localhost:8080",
});

axiouInst.interceptors.request.use(function (config) {
  const _localToken = localStorage.getItem("auth_token");
  if (_localToken) config.headers.Authorization = _localToken;
  return config;
});

axiouInst.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // const resError = error.response;
    // console.log(resError);
    // if (resError.status === 401) {
    //   localStorage.removeItem("auth_token");
    //   window.location.href = "/login";
    // }
    return Promise.reject(error.response.data);
  }
);

export const axiosInstanceAuth = axios.create({
  // baseURL: "https://tuanna-final.herokuapp.com/",
  baseURL: "http://localhost:8080",
});
