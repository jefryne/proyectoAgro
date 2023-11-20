const tempKey = '58d2540b63de9b7c439d0294b11a6412';
console.log("hola mundo desde app.js");
const audioElementTemp = new Audio();

//let wave = new CircularAudioWave(document.getElementById('chart-container'));
console.log(wave);
/* let isPlayed = false */

/* let endpoint = "M4db6HAoCjH1NlKo4oqb"
document.addEventListener('DOMContentLoaded', function() {
  loadAudioBlob(endpoint);
  window.addEventListener('scroll', function() {
    if(!isPlayed) {
      isPlayed = true;
      wave.play();
    }
  });
});
 */

function loadAudioBlob(endpoint) {
  fetch(`https://api.elevenlabs.io/v1/history/${endpoint}/audio`, {
    "headers": {
      "accept": "audio/mpeg",
      "xi-api-key": tempKey
    }
  }).then(response => {
    console.log(response);
    return response.blob();
  }).then(audioBlob => {
    wave = new CircularAudioWave(document.getElementById('chart-container'));
    const audioUrl = URL.createObjectURL(audioBlob);
    audioElementTemp.src = audioUrl;
    wave.loadAudio(audioUrl);
    wave.play();
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });
}
