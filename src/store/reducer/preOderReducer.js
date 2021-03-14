import {
  addPreOder,
  getPreOder,
  updatePreOder,
  removePreoder,
  deletePreoder,
} from "../action/oderAction/oderActionType";

export const oderReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case getPreOder:
      state = payload;
      return state;
    case addPreOder:
      return state.concat(payload);
    case updatePreOder:
      state = state.map((el) => {
        if (el.id === payload.id) {
          el.qtn += 1;
        }
        return el;
      });
      return state;
    case removePreoder:
      state = state.map((el) => {
        if (el.id === payload.id && el.qtn > 0) {
          el.qtn -= 1;
        }
        if (el.qtn === 0) {
          return null;
        }
        return el;
      });
      state = state.filter((el) => el !== null);
      return state;
    case deletePreoder:
      console.log(":dd");
      state = [];
      return state;
    default:
      return state;
  }
};
