import axios from "axios";

// set base URL
export const axiouInst = axios.create({
  // baseURL: "https://tuanna-final.herokuapp.com/",
  baseURL: "http://localhost:8080",
});

// assign tokens to request header
axiouInst.interceptors.request.use(function (config) {
  // get auth_token from localStorage.
  const _localToken = localStorage.getItem("auth_token");
  //If a token exists, assign it to the Authorization field in request header
  if (_localToken) config.headers.Authorization = _localToken;
  return config;
});

axiouInst.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);

// axiouInst.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   const resError = error.response;
//   if (resError.status === 401) {
//       localStorage.removeItem('token_access');
//       window.location.href = '/auth/login';
//   }
//   return Promise.reject(error);
// });

export const axiosInstanceAuth = axios.create({
  // baseURL: "https://tuanna-final.herokuapp.com/",
  baseURL: "http://localhost:8080",
});
