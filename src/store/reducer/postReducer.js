import { ListPost } from "../action/postAction/postActionType";

const INTI_STATE = {
  nextURL: "",
};

export const postReducer = (state = INTI_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ListPost:
      return {
        ...state,
        nextURL: payload.nextUrl,
      };
    default:
      return { ...state };
  }
};
