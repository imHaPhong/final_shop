import { axiouInst } from "../config/axiosInstance";
import { restaurantLogin } from "../store/action/restaurantInfo/restaurantInfoAction";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const adminGetReport = () => async () => {
    const listResport = await axiouInst.get('/adminPost')
    console.log(listResport);
    return listResport
}
export const adminDelete = (data) => async () => {
    const listResport = await axiouInst.post('/deletePosts', data)
    console.log(listResport);
    return listResport
}
export const adminIgnore = (data) => async () => {
    const listResport = await axiouInst.post('/ingore', data)
    console.log(listResport);
    return listResport
}

export const adminGetInfo = () => async () => {
  const res = await axiouInst.get('/createInfo')
  console.log(res.data);
  return res.data
}
export const addAmount = (data) => async () => {
  const res = await axiouInst.post('/adminUpdate', data)
  console.log(res);
}
export const createVoucher = (data) => async () => {
  const res = await axiouInst.post('/create', data)
  console.log(res);
}