import axios from "axios";
import { axiouInst } from "../config/axiosInstance";
import { isLogin, loginSucess } from "../store/action/authAction/authAction";
import {
  addProOderAction,
  getPreOderAction,
  updatePreOderAction,
  deletePreOderAction,
  getAllOderAction,
  oderGetWaitingAction,
  oderGetProcessingAction,
  oderGetDeliverAction,
  oderGetReceiveAction,
} from "../store/action/oderAction/oderAction";
import { listPost } from "../store/action/postAction/postAction";
import { userInfo } from "../store/action/userAction/userAction";
import { UserLogout } from "../store/action/userAction/useractionType";
import { getListRestaurantAction } from "../store/action/restaurantAction/restaurantAction";
import { Login } from "./authMiddlerware";

const config1 = {
  headers: {
    "Content-Type": "application/json",
  },
};

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const getUserInfo = () => async (dispatch) => {
  const request = await axiouInst.get("/user/profile", config);

  if (request.data !== "Access dined") {
    localStorage.setItem("UserInfo", JSON.stringify(request.data));
    dispatch(userInfo(request.data));
    dispatch(isLogin());
  }
};

export const setUserInfo = (data) => async (dispatch) => {
  dispatch(isLogin());

  dispatch(userInfo(data));
};

export const createPosts = (data, callback) => async (dispatch) => {
  var bodyFormData = new FormData();
  console.log(data.rating);
  data.img.map((el) => bodyFormData.append("avatar", el.fileData));
  bodyFormData.append("rName", data.tag);
  bodyFormData.append("title", data.title);
  bodyFormData.append("body", data.body);
  bodyFormData.append("tag", data.tag);
  bodyFormData.append("rId", data.rId);
  bodyFormData.append("rating", data.rating);

  const res = await axiouInst.post("/user/newPost", bodyFormData, config);
  console.log(res);
  callback();
};

export const getMyPost = (data) => async (dispatch) => {
  // const { page = 1, limit = 3 } = data;
  const req = await axiouInst.get("/user/myPost", config);
  return req.data.myPost;
};

export const getNewPost = (data) => async (dispatch) => {
  let defaultValue = { page: 0, limit: 3 };
  if (data) {
    defaultValue = data;
  }
  const req = await axiouInst.get(
    `/user/home?page=${defaultValue.page}&limit=${defaultValue.limit}`,
    config
  );
  dispatch(listPost(""));
  return req.data.newPost;
};

export const userVote = (data) => async (dispatch) => {
  const req = await axiouInst.post("/user/vote", data, config1);
  console.log(req);
};

export const userLogout = () => async (dispatch) => {
  dispatch(UserLogout);
};

export const getPosts = (data) => (dispatch) => {
  dispatch(listPost(data));
};

export const getAllRestaurant = (data) => async (dispatch) => {
  const resData = await axiouInst.get("/getAllRestaurant");
  dispatch(getListRestaurantAction(resData.data.listRestaurant || []));
  return resData.data.listRestaurant;
};



export const isUserExist = (data) => async (dispatch) => {
  const res = await axiouInst.post("/check", data);
  console.log(res);
  return !res.data.isExist;
};

export const createAccount = (data) => async (dispatch) =>  {
  const password =  data.cpassword;
  delete data.cemail;
  delete data.cpassword;
  const res = await axiouInst.post("/signup", data);
  
  // await Login({email: res.data.user.email,password: res.data.user.password})
  console.log(res.data.user.email);
  const request = await axiouInst.post("/login", {email: res.data.user.email, password: password},{headers: {
    "Content-Type": "application/json",
  }});
  console.log(request.data);
  const token = request.data.token;
  localStorage.setItem("auth_token", token);
  dispatch(loginSucess(token));
  dispatch(userInfo(request.data.user));
  return res.data;
};

export const getRestaurantInfo = (data) => async () => {
  const resData = await axiouInst.get(`/getRestaurantInfo/${data}`);
  return resData.data.restaurantInfo;
};

export const getPreOder = () => async (dispatch) => {
  dispatch(getPreOderAction());
};

export const createrOder = (data) => async (dispatch) => {
  const resData = await axiouInst.post("/user/createOder", data);
  console.log(resData);
};

export const addPreOder = (data) => async (dispatch) => {
  dispatch(addProOderAction(data));
};
export const updatePreOder = (data) => async (dispatch) => {
  dispatch(updatePreOderAction(data));
};

export const getListOder = (data) => async (dispatch) => {
  const resData = await axiouInst.get("/user/oders");
  return resData.data.oders;
};

export const getListRestaurant = (data) => async (dispatch) => {
  if (data === "") {
    const resData = await axiouInst.get("/user/getAllRestaurant");
    dispatch(getListRestaurantAction(resData.data.listRestaurant || []));
    return { listRestaurantName: [] };
  }

  const resData = await axiouInst.get(`/user/getListRestaurant/${data}`);
  dispatch(getListRestaurantAction(resData.data.listRestaurantName));
  return resData.data;
};

export const deletePreOder = () => async (dispatch) => {
  dispatch(deletePreOderAction());
};

export const getAllOder = () => async (dispatch) => {
  const resData = await axiouInst.get("/user/oders");

  dispatch(getAllOderAction(resData.data.oders));
  return resData.data.oders;
};
export const oderGetWaiting = () => async (dispatch) => {
  const resData = await axiouInst.get("/user/oders");

  dispatch(
    oderGetWaitingAction(resData.data.oders.filter((el) => el.status === 0))
  );
};
export const oderGetProcessing = () => async (dispatch) => {
  const resData = await axiouInst.get("/user/oders");

  dispatch(
    oderGetProcessingAction(resData.data.oders.filter((el) => el.status === 1))
  );
};
export const oderGetDeliver = () => async (dispatch) => {
  const resData = await axiouInst.get("/user/oders");

  dispatch(
    oderGetDeliverAction(resData.data.oders.filter((el) => el.status === 2))
  );
};
export const oderGetReceive = () => async (dispatch) => {
  const resData = await axiouInst.get("/user/oders");

  dispatch(
    oderGetReceiveAction(resData.data.oders.filter((el) => el.status === 3))
  );
};

export const getHashTag = () => async (dispatch) => {
  const hashTags = await axiouInst.get("/user/tags");
  return hashTags.data.tags;
};
export const getPostByData = (data) => async (dispatch) => {
  const hashTags = await axiouInst.get(`/user/filter/${data}`);
  return hashTags.data.posts;
};

export const userUpdate = (data, callback) => async (dispatch) => {
  console.log("alo");
  const updateKey = Object.keys(data);
  const updateValue = Object.values(data);
  var bodyFormData = new FormData();

  updateKey.map((el, index) => bodyFormData.append(el, updateValue[index]));
  const res = await axiouInst.post("/user/profile", bodyFormData, config);
  console.log(res);
  await localStorage.setItem("UserInfo", JSON.stringify(res.data));
  dispatch(userInfo(res.data));
  callback();
};

export const userAddAddress = (data) => async (dispatch) => {
  console.log(data);
  const res = await axiouInst.post("/user/addAddress", data);
  console.log(res.data);

  localStorage.setItem("UserInfo", JSON.stringify(res.data));
  dispatch(userInfo(res.data));
};

export const userGetOderInfo = (id) => async () => {
  const res = await axiouInst.get(`/user/oderInfo/${id}`);
  console.log(res);
  return res.data.oderInfo;
};

export const userLoadVoucher = (id) => async () => {
  const res = await axiouInst.get("/user/loadVoucher");
  return res.data.listVoucher;
};

export const userGetVoucher = (id) => async () => {
  const res = await axiouInst.post("/user/getvoucher", { vId: id });
  return res.data;
};

export const getOwnVoucher = () => async () => {
  const res = await axiouInst.get("/user/ownVoucher");
  return res.data.listVoucher;
};

export const getLocation = (data) => async() => {
  const res = await axiouInst.post("/user/getLocation", data);
  return res.data.listRestaurant

}

export const loginSendToken = (data) => async (dispatch) => {
  const res = await axiouInst.post("/loginWith", {token: data});
  const token = res.data.token;
  localStorage.setItem("auth_token", token);
  dispatch(loginSucess(token));
  dispatch(userInfo(res.data.user));
}

export const getPopulateRestaurant = () => async (dispatch) => {
  const res = await axiouInst.get("/user/populateRestaurant");
  return res.data
}
export const getNearRestaurant = (data) => async (dispatch) => {
  const res = await axiouInst.post("/user/near", data);
  return res.data
}

export const userSearch = (data) => async (dispatch) => {
  console.log("alo");
  const res = await axiouInst.post('/search', data)
  return res.data.result
}

export const userSendReport = (data) => async (dispatch) => {
  const res = await axiouInst.post('/user/reportPost', data)
  console.log(res);
}