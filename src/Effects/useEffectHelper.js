import { useEffect } from "react";

const UseEffectHellper = (callback, state = [], async = false) => {
  useEffect(() => {
    if (async) {
      const init = async () => {
        try {
          await callback();
        } catch (error) {
          console.log(error);
        }
      };
      init();
    } else {
      callback();
    }
  }, state);
};

export default UseEffectHellper;
