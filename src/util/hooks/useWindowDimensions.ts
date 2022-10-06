import { useState } from "react";
import useWindowEvent from "./useWindowEvent";

const useWindowDimensions = () => {
  const [dims, setDims] = useState([null, null]);

  useWindowEvent(
    "resize",
    () => {
      setDims([window.innerWidth, window.innerHeight]);
    },
    [],
  );

  return [dims[0], dims[1]] as const;
};

export default useWindowDimensions;
