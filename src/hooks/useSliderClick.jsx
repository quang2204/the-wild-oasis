
import { useEffect } from "react";
import { useRef } from "react";

const useSliderClick = (handler, listen = true) => {
  const ref = useRef();
  useEffect(() => {
    const handClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("click", handClick, listen);
    return () => document.removeEventListener("click", handClick, listen);
  }, [handler, listen]);

  return ref;
};

export default useSliderClick;
