import axios from "axios";
import { useEffect, useState } from "react";

const INIT_STATE = {
  posts: [],
  loading: false,
};

const useBookHook = (query, pageNumber) => {
  const [state, setState] = useState(INIT_STATE);

  useEffect(() => {
    (async () => {
      setState((pre) => ({
        ...pre,
        loading: true,
      }));
      const data = await axios.get("https://api.rawg.io/api/games", {
        params: {
          search: query,
          page: pageNumber,
        },
      });
      setState((pre) => ({
        ...pre,
        books: [...pre.books, ...data.data.results.map((el) => el.name)],
        loading: false,
      }));
    })();
  }, [query, pageNumber]);
  return state;
};

export default useBookHook;
