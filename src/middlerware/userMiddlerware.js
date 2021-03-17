import axios from "axios";
import { axiouInst } from "../config/axiosInstance";
import { isLogin } from "../store/action/authAction/authAction";
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

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const config1 = {
  headers: {
    "Content-Type": "application/json",
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
  data.img.map((el) => bodyFormData.append("avatar", el.fileData));
  bodyFormData.append("rName", "ryus ris");
  bodyFormData.append("title", data.title);
  bodyFormData.append("body", data.body);
  bodyFormData.append("tag", data.tag);
  bodyFormData.append("rId", data.rId);

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
  const resData = await axiouInst.get("/user/getAllRestaurant");
  dispatch(getListRestaurantAction(resData.data.listRestaurant || []));
  return resData.data.listRestaurant;
};

export const isUserExist = (data) => async (dispatch) => {
  const res = await axiouInst.post("/check", data);
  console.log(res);
  return !res.data.isExist;
};

export const createAccount = (data) => async () => {
  delete data.cemail;
  delete data.cpassword;
  const res = await axiouInst.post("/signup", data);
  return res.data;
};

export const getRestaurantInfo = (data) => async () => {
  const resData = await axiouInst.get(`/user/getRestaurantInfo/${data}`);
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
    console.log(resData);
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
  const res = await axiouInst.post("/user/addAddress", data);
  localStorage.setItem("UserInfo", JSON.stringify(res.data));
  dispatch(userInfo(res.data));
};
