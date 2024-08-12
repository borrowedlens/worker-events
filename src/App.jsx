/* eslint-disable react-refresh/only-export-components */
import "./App.css";
import { Child } from "./components/Child";
import { EventEmitter } from "./EventEmitter";

export const worker = new Worker("./worker.js");
export const eventEmitter = new EventEmitter();

function App() {
  worker.postMessage("ping");
  eventEmitter.on("worker-message", (data) => {
    console.log("message from worker received: " + data);
  });
  worker.onmessage = function (event) {
    eventEmitter.emit("worker-message", event.data);
  };
  return (
    <>
      <h1>Hello World!</h1>
      <Child />
    </>
  );
}

export default App;
