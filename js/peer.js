const face = require("./face.js");
let avgEmotion;
let audMessType;
let presMessType;
let messFromAud;
let messFromPres;

const peerConnect = function () {
  const getUserMedia = require("getusermedia");

  getUserMedia({ video: true, audio: false }, function (err, stream) {
    if (err) return console.error(err);

    const Peer = require("simple-peer");
    const peer = new Peer({
      initiator: location.hash == "#init",
      trickle: false,
      stream: stream,
    });

    peer.on("signal", function (data) {
      document.getElementById("peerA").value = JSON.stringify(data);
    });

    document.getElementById("connect").addEventListener("click", function () {
      const guestId = JSON.parse(document.getElementById("peerB").value);
      peer.signal(guestId);
    });

    if (location == "http://localhost:9966/") {
      avgEmotion = setInterval(() => {
        messFromAud = face.countReact("audience");
        peer.send(messFromAud);
      }, 10000);
    }

    if (location == "http://localhost:9966/#init") {
      avgEmotion = setInterval(() => {
        messFromPres = face.countReact("presenter");
      }, 10000);
      stopButton = document.getElementById("stop-button");
      stopButton.addEventListener("click", () => {
        peer.send("Zatrzymano analizę!");
        clearInterval(avgEmotion);
        face.breakDetect();
      });
    }

    peer.on("connect", () => {
      console.clear();
      if (location == "http://localhost:9966/#init") {
        stopButton = document.getElementById("stop-button");
        stopButton.disabled = false;
      }
    });

    peer.on("data", function (data) {
      if (location == "http://localhost:9966/#init") {
        audMessType = data.substring(data.indexOf(";") + 1);
        presMessType = messFromPres.substring(messFromPres.indexOf(";") + 1);
        if (audMessType == "positive") {
          document.getElementById(
            "aud-message"
          ).innerHTML = `<span style="color:green">${data.substring(
            0,
            data.indexOf(";")
          )}</span>`;
        }
        if (audMessType == "negative") {
          document.getElementById(
            "aud-message"
          ).innerHTML = `<span style="color:red">${data.substring(
            0,
            data.indexOf(";")
          )}</span>`;
        }
        if (presMessType == "positive") {
          document.getElementById(
            "pres-message"
          ).innerHTML = `<span style="color:green">${messFromPres.substring(
            0,
            messFromPres.indexOf(";")
          )}</span>`;
        }
        if (presMessType == "negative") {
          document.getElementById(
            "pres-message"
          ).innerHTML = `<span style="color:red">${messFromPres.substring(
            0,
            messFromPres.indexOf(";")
          )}</span>`;
        }
      }
      if (location == "http://localhost:9966/") {
        if (data == "Zatrzymano analizę!") {
          clearInterval(avgEmotion);
          face.breakDetect();
        }
      }
    });

    peer.on("stream", function (stream) {
      const video = document.getElementById("camera");
      video.srcObject = stream;
      video.play();
    });
  });
};

module.exports = peerConnect;
