import { useState, useEffect } from "react";

const Loading = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const tid = setTimeout(() => {
      setShow(true);
    }, 1500);
    return () => {
      clearTimeout(tid);
    };
  }, []);
  return show ? <>Loading ...</> : null;
};

export default Loading;
