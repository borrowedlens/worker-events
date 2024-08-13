/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef } from "react";
import "./App.css";
import { Child } from "./components/Child";
import { eventEmitter } from "./EventEmitter";

/**
 * Setup worker
 */
export const worker = new Worker("./worker.js");

/**'
 * Post a message to the worker to get a response
 */
worker.postMessage("ping");
/**
 *
 * @param {String} event
 * Add a listener at the root for messages from worker,
 * and on reception, emit an event using the singleton eventEmitter
 * to notify the listeners of that event.
 */
worker.onmessage = function (event) {
  eventEmitter.emit("worker-message", event.data);
};

function App() {
  const listenerIdRef = useRef(null);

  useEffect(() => {
    /**
     * On component mount, setup a listener on singleton eventEmitter for
     * events emitted on worker messages
     */
    listenerIdRef.current = eventEmitter.on("worker-message", (data) => {
      console.log("message from worker received in parent: " + data);
    });
    return () => {
      /**
       * Cleaning up event listener on component unmount
       */
      eventEmitter.remove("worker-message", listenerIdRef.current);
    };
  }, []);
  return (
    <>
      <h1>Hello World!</h1>
      <Child />
    </>
  );
}

export default App;
