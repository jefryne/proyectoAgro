const audioContext = new(window.AudioContext || window.webkitAudioContext)();
const xiApiKey = '58d2540b63de9b7c439d0294b11a6412';

let audioSource;
let analyser;
let audioEnded = false;

function loadAudio(idHistory) {
  fetch(`https://api.elevenlabs.io/v1/history/${idHistory}/audio`, {
      headers: {
        accept: 'audio/mpeg',
        'xi-api-key': xiApiKey
      }
    }).then(response => {
      if (!response.ok) {
        console.log('Error en la solicitud');
      }
      return response;
    })
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      audioSource = audioContext.createBufferSource();
      audioSource.buffer = audioBuffer;

      analyser = audioContext.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioContext.destination);
      audioSource.onended = function() {
        audioEnded = true;
      };
      audioSource.start(0);
      visualize();
    })
    .catch(error => {
      console.error('Error loading audio:', error);
    });
}

const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
let radius = 80;


function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function visualize() {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

    const scale = average / 120; // Ajusta la escala según los datos del audio

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const color = `rgba(154, 222, 123, ${scale})`; // Color basado en la escala del audio

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar círculo estático en el centro
    if (!audioEnded) {
      const staticCircleRadius = 20;
      const staticCircleColor = 'rgb(154, 222, 123)';
      drawCircle(x, y, staticCircleRadius, staticCircleColor);
    }

    // Dibujar círculo dinámico alrededor del círculo estático
    drawCircle(x, y, radius * scale, color);

    // Dibujar las ondas alrededor del círculo
    const waveCount = 6; // Cantidad de ondas alrededor del círculo
    const angleIncrement = (Math.PI * 2) / waveCount; // Incremento del ángulo para cada onda
  
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
  
    // Empezar desde el primer ángulo
    let angle = 0;
    for (let i = 0; i < waveCount; i++) {
      const waveRadius = radius * (.5 + scale); // Tamaño de las ondas basado en la escala del audio
      const waveX = x + Math.cos(angle) * waveRadius;
      const waveY = y + Math.sin(angle) * waveRadius;
  
      if (i === 0) {
        ctx.moveTo(waveX, waveY); // Empezar la forma de onda
      } else {
        ctx.lineTo(waveX, waveY); // Agregar puntos a la forma de onda
      }
      angle += angleIncrement; // Incrementar el ángulo para la siguiente onda
    }
  
    ctx.closePath();
    ctx.stroke(); // Dibujar las ondas en el lienzo
  }

  draw();
}


// Llama a la función loadAudio con la URL del audio que obtengas
loadAudio('sTab5LS4slqmkDNOnKSq');


