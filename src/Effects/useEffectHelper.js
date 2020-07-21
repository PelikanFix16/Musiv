import { useEffect } from "react";

const UseEffectHellper = (callback, state = []) => {
  useEffect(() => {
    const init = async () => {
      try {
        await callback();
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, state);
};

export default UseEffectHellper;
