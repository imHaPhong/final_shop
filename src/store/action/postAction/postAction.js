import { ListPost } from "./postActionType";

export const listPost = () => {
  return {
    type: ListPost,
    payload: {
      loading: true,
    },
  };
};
