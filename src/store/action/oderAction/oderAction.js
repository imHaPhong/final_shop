import {
  addPreOder,
  getPreOder,
  removePreoder,
  updatePreOder,
  deletePreoder,
  oderGetAll,
  oderGetWaiting,
  oderGetProcessing,
  oderGetDeliver,
  oderGetReceive,
} from "./oderActionType";

export const getPreOderAction = (id) => {
  var preOder = JSON.parse(localStorage.getItem("dish") || "[]");
  preOder = preOder.filter((el) => el.rid === id);
  return {
    type: getPreOder,
    payload: preOder,
  };
};

export const updatePreOderAction = (preoder) => {
  return {
    type: updatePreOder,
    payload: preoder,
  };
};

export const addProOderAction = (preoder) => {
  return {
    type: addPreOder,
    payload: preoder,
  };
};

export const removePreOderAction = (preoder) => {
  return {
    type: removePreoder,
    payload: preoder,
  };
};
export const deletePreOderAction = () => {
  localStorage.setItem("dish", []);
  return {
    type: deletePreoder,
  };
};

export const getAllOderAction = (data) => {
  return {
    type: oderGetAll,
    payload: data,
  };
};
export const oderGetWaitingAction = (data) => {
  return {
    type: oderGetWaiting,
    payload: data,
  };
};
export const oderGetProcessingAction = (data) => {
  return {
    type: oderGetProcessing,
    payload: data,
  };
};
export const oderGetDeliverAction = (data) => {
  return {
    type: oderGetDeliver,
    payload: data,
  };
};
export const oderGetReceiveAction = (data) => {
  return {
    type: oderGetReceive,
    payload: data,
  };
};
