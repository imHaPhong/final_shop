import {
  oderGetAll,
  oderGetDeliver,
  oderGetProcessing,
  oderGetReceive,
  oderGetWaiting,
} from "../action/oderAction/oderActionType";

const INTIAL_STATE = {
  select: [
    { content: "All", active: true },
    { content: "Wating", active: false },
    { content: "Processing", active: false },
    { content: "Delivery", active: false },
    { content: "Receive", active: false },
  ],
  data: [],
};

export const managerOderReducer = (state = INTIAL_STATE, action) => {
  const { type, payload } = action;

  const setSelected = (i) => {
    return state.select.map((el, index) => {
      if (index === i) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });
  };

  switch (type) {
    case oderGetAll:
      state = {
        select: setSelected(0),
        data: payload,
      };
      return state;
    case oderGetWaiting:
      state = {
        select: setSelected(1),
        data: payload,
      };
      return state;
    case oderGetProcessing:
      state = {
        select: setSelected(2),
        data: payload,
      };
      return state;
    case oderGetDeliver:
      state = {
        select: setSelected(3),
        data: payload,
      };
      return state;
    case oderGetReceive:
      state = {
        select: setSelected(4),
        data: payload,
      };
      return state;
    default:
      return state;
  }
};
