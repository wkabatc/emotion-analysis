const fs = require("fs");

const location = window.location.href;
if (location == "http://localhost:9966/") {
  document.getElementById("message-container").style.display = "none";
}
if (location == "http://localhost:9966/#init") {
  const stopButton = document.createElement("button");
  stopButton.textContent = "Zatrzymaj analizę";
  stopButton.setAttribute("id", "stop-button");
  stopButton.disabled = true;
  document
    .querySelector("#message-container .item:nth-child(3)")
    .appendChild(stopButton);
}

const peerConnect = require("./js/peer.js");
const face = require("./js/face.js");

peerConnect();
face.faces();
