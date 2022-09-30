import { useCallback, useEffect } from "react";

const useWindowEvent = (
  event: "scroll" | "resize",
  callback: FrameRequestCallback,
  deps: any[],
) => {
  callback = useCallback(callback, [event, ...deps]);
  useEffect(() => {
    let rafId: ReturnType<typeof requestAnimationFrame>;
    const handleEvent = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(callback);
    };
    handleEvent();
    window.addEventListener(event, handleEvent);
    return () => {
      window.removeEventListener(event, handleEvent);
    };
  }, [event, callback]);
};

export default useWindowEvent;
