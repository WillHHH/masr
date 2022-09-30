import { useReducer } from "react";
import useWindowEvent from "./useWindowEvent";

const initialState = {
  offset: 0,
  progress: 0,
};

const reducer = (_, action: typeof initialState) => action;

const useScrollOffset = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useWindowEvent(
    "scroll",
    () => {
      const progress = Math.min(
        1,
        window.scrollY /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight),
      );
      dispatch({
        offset: window.scrollY,
        progress,
      });
    },
    [],
  );

  return [state.offset, state.progress] as const;
};

export default useScrollOffset;
