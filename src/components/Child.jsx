import { eventEmitter } from "../App";

export const Child = () => {
  eventEmitter.on("worker-message", (data) => {
    console.log("message from worker received in child: " + data);
  });
  return <h2>Hello Child!</h2>;
};
