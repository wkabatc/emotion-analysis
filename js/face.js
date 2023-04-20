const messages = require("./messages.js");
const audMessArr = messages.getAudienceMessages();
const presMessArr = messages.getPresenterMessages();

const video = document.getElementById("camera");
const faces = function () {
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  ]).then(startVideo);

  function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      (stream) => (video.srcObject = stream),
      (err) => console.error(err)
    );
  }
};

let facesNum = 0;
let expressObjects = [];
let detect;
let expressSumArr = [];
let canvas;

video.addEventListener("play", () => {
  canvas = faceapi.createCanvasFromMedia(video);
  document.getElementById("video-container").append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  detect = setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log("-----------------------------");
    for (let i = 0; i < detections.length; i++) {
      console.log(detections[i].expressions);
      if (i == 0) {
        expressSumArr = Object.values(detections[i].expressions);
      }
      if (i >= 1) {
        for (let j = 0; j < expressSumArr.length; j++) {
          const expressValues = Object.values(detections[i].expressions);
          exprSumBefore = expressSumArr[j];
          expressSumArr[j] = exprSumBefore + expressValues[j];
        }
      }
    }
    if (detections.length != 0) {
      console.log("Suma emocji: " + expressSumArr);
      const expression = {
        neutral: expressSumArr[0],
        happy: expressSumArr[1],
        sad: expressSumArr[2],
        angry: expressSumArr[3],
        fearful: expressSumArr[4],
        disgusted: expressSumArr[5],
        surprised: expressSumArr[6],
      };
      expressObjects.push(expression);
    }
    console.log("Liczba wykrytych twarzy:" + detections.length);
    facesNum += detections.length;
    console.log("-----------------------------");
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 1000); //detekcję wykonuje co 1 sekundę (1000 milisekund)
});

let avgEmotion;

const countReact = function (analysisObj) {
  avgEmotion = setInterval(function () {
    if (facesNum != 0) {
      console.log("Liczba przeanalizowanych twarzy: " + facesNum);
      console.log("-----------------------------");
      facesNum = 0;
    }
    expressObjects = [];
  }, 10000);
  const messagesArr = avgOfEmotions(expressObjects, facesNum, analysisObj);
  let randomMess;
  if (facesNum == 0) {
    randomMess = "Nie wykryto żadnych twarzy!;negative";
  } else {
    randomMess = messagesArr[Math.floor(Math.random() * messagesArr.length)];
  }
  return randomMess;
};

const breakDetect = function () {
  clearInterval(detect);
  clearInterval(avgEmotion);
  setTimeout(() => {
    console.log("Zatrzymano analizę!");
  }, 500);
};

const avgOfEmotions = (sumOfEmotionObj, numOfFaces, analysisObj) => {
  let messToSend;
  let sumOfEmotion = 0;
  const expressNames = [
    "neutral",
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
  ];
  const avgEmotionArr = [];
  for (let i = 0; i < expressNames.length; i++) {
    for (let j = 0; j < sumOfEmotionObj.length; j++) {
      sumOfEmotion += sumOfEmotionObj[j][expressNames[i]];
    }
    let avgOfEmotion = sumOfEmotion;
    console.log(
      "średnia " + expressNames[i] + ": " + avgOfEmotion / numOfFaces
    );
    avgEmotionArr.push([expressNames[i], avgOfEmotion / numOfFaces]);
    sumOfEmotion = 0;
  }

  avgEmotionArr.sort(function (a, b) {
    return b[1] - a[1]; //sortowanie tablicy w celu określania cechy dominującej
  });
  const domEmotion = avgEmotionArr[0][0];
  if (numOfFaces != 0) {
    messToSend = messToBeSend(avgEmotionArr, domEmotion, analysisObj);
  }
  avgOfEmotion = 0;
  console.log("Wiadomości: ");
  console.log(messToSend);
  return messToSend;
};

const messToBeSend = (avgEmotionArr, domEmotion, analysisObj) => {
  const messToSend = [];
  let messArr = [];
  if (analysisObj == "audience") {
    messArr = audMessArr;
  }
  if (analysisObj == "presenter") {
    messArr = presMessArr;
  }
  for (let i = 0; i < avgEmotionArr.length; i++) {
    for (let j = 0; j < messArr.length; j++) {
      if (avgEmotionArr[i][0] == messArr[j][1]) {
        const avgOfEmotion = avgEmotionArr[i][1];
        const controlMark = messArr[j][2];
        const controlVal = messArr[j][3];
        avgPercent = (avgOfEmotion * 100).toFixed(4) + "%";
        if (controlMark == "min") {
          if (avgOfEmotion >= controlVal) {
            const mess = messArr[j][0].replace("X%", avgPercent);
            messToSend.push(mess + ";" + messArr[j][4]);
          }
        }
        if (controlMark == "max") {
          if (avgOfEmotion <= controlVal) {
            const mess = messArr[j][0].replace("X%", avgPercent);
            messToSend.push(mess + ";" + messArr[j][4]);
          }
        }
        if (controlMark == "not valid") {
          if (domEmotion == messArr[j][1]) {
            const mess = messArr[j][0].replace("X%", avgPercent);
            messToSend.push(mess + ";" + messArr[j][4]);
          }
        }
      }
    }
  }
  return messToSend;
};

module.exports = {
  faces,
  countReact,
  breakDetect,
};
