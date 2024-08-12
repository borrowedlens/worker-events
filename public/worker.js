onmessage = pingpong;
function pingpong(event) {
  if (event.data === "ping") {
    postMessage("pong");
  }
}
