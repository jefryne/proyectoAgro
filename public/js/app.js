const tempKey = '607e8d8b3ac67b92e042a66142a3c64f';
console.log("hola mundo desde app.js");
const audioElementTemp   = new Audio();

let wave = new CircularAudioWave(document.getElementById('chart-container'));
console.log(wave);
let isPlayed = false

document.addEventListener('DOMContentLoaded', function() {
  loadAudioBlob();
  window.addEventListener('scroll', function() {
    if(!isPlayed) {
      isPlayed = true;
      wave.play();
    }
  });
});

function loadAudioBlob() {
  fetch("https://api.elevenlabs.io/v1/history/uOGRF25eNOXCtBig5Tee/audio", {
    "headers": {
      "accept": "audio/mpeg",
      "xi-api-key": tempKey
    }
  }).then(response => {
    console.log(response);
    return response.blob();
  }).then(audioBlob => {
    const audioUrl = URL.createObjectURL(audioBlob);
    audioElementTemp  .src = audioUrl;
    wave.loadAudio(audioUrl);

  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });
}
