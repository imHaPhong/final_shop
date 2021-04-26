import { axiouInst } from "../config/axiosInstance";
import { restaurantLogin } from "../store/action/restaurantInfo/restaurantInfoAction";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
export const formCheck = (data) => async (dispatch) => {
  const res = await axiouInst.post("/restaurant/check", data);
  return !res.data.isExist;
};

export const createAccount = (data) => async (dispatch) => {
  const res = await axiouInst.post("/restaurant/signup", data);
  return res.data;
};
export const restaunrantLogin = (data) => async (dispatch) => {
  const res = await axiouInst.post("/restaurant/signin", data);
  dispatch(restaurantLogin())
  return res.data;
};

export const getRestaurantInfo = () => async (dispatch) => {
try {
  const res = await axiouInst.get("/restaurant");
  return res.data;
} catch (error) { 
  return Promise.reject("Invalid token");
  
}
};
export const checkToken = () => async (dispatch) => {
try {
  const res = await axiouInst.get("/restaurant/checkToken");
  return res.data;
} catch (error) { 
  return Promise.reject("Invalid token");
  
}
};

export const addMenuTitle = (data) => async (dispatch) => {
  const res = await axiouInst.post("/restaurant/addMenuTitle", data);
  return res.data.listMenu;
};

export const getSubmenu = (data) => async (dispatch) => {
  const res = await axiouInst.post("/restaurant/getSubmenu", data);
  return res.data.submenu;
};

export const userDelete = (data) => async (dispatch) => {
  const res = await axiouInst.delete("/restaurant/delete", { data: data });
  return res.data;
};
export const userDeleteSubMenu = (data) => async (dispatch) => {
  const res = await axiouInst.delete("/restaurant/deleteSubmenu", {
    data: data,
  });
  return res.data;
};

export const userEditMenu = (data) => async (dispatch) => {
  const res = await axiouInst.put("/restaurant/editMenu", data);
  return res.data;
};

export const userAddMenu = (data) => async (dispatch) => {
  var bodyFormData = new FormData();
  bodyFormData.append("dish-img", data.img);
  bodyFormData.append("name", data.name);
  bodyFormData.append("price", data.price);
  bodyFormData.append("itemId", data.itemId);
  const res = await axiouInst.post("/restaurant/addMenu", bodyFormData, config);
  return res.data;
};

export const userEditSubMenu = (data) => async (dispatch) => {
  console.log(data);

  var bodyFormData = new FormData();
  bodyFormData.append("dish-img", data.img);
  bodyFormData.append("name", data.name);
  bodyFormData.append("price", data.price);
  bodyFormData.append("itemId", data.itemId);
  bodyFormData.append("subMenuId", data.subMenuId);
  const res = await axiouInst.put(
    "/restaurant/editSubMenu",
    bodyFormData,
    config
  );
  return res.data;
};

export const getOder = () => async () => {
  const resData = await axiouInst.get("/restaurant/oders");
  console.log(resData);
  return resData.data.oders;
};

export const change2Processing = (data) => async () => {
  const resData = await axiouInst.post("/restaurant/oderProcess", data);
  console.log(resData);
};

export const restaurantGetInfo = () => async () => {
  const resData = await axiouInst.get("/restaurant/info");
  return resData.data.restaurantInfo;
};

export const restaurantUpdateInfo = (data) => async () => {
  console.log(data);
  var bodyFormData = new FormData();
  bodyFormData.append("avatar", data.avatar);
  bodyFormData.append("restaurantName", data.restaurantName);
  bodyFormData.append("address", data.address);
  bodyFormData.append("timeAcitve", data.timeAcitve);
  const resData = await axiouInst.post(
    "/restaurant/info",
    bodyFormData,
    config
  );
};

export const addAmount = (data) => async () => {
  const res = await axiouInst.post('/restaurant/addAmount', data)
  
}