import { useEffect, useRef } from "react";
import { eventEmitter } from "../EventEmitter";

export const Child = () => {
  const listenerIdRef = useRef(null);

  useEffect(() => {
    /**
     * On component mount, setup a listener on singleton eventEmitter for
     * events emitted on worker messages
     */
    listenerIdRef.current = eventEmitter.on("worker-message", (data) => {
      console.log("message from worker received in child: " + data);
    });
    return () => {
      /**
       * Cleaning up event listener on component unmount
       */
      eventEmitter.remove("worker-message", listenerIdRef.current);
    };
  }, []);

  return <h2>Hello Child!</h2>;
};
