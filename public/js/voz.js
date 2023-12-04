let audioElement = new Audio();
const xiApiKey = '58d2540b63de9b7c439d0294b11a6412';

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {

    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Configuración opcional
    recognition.lang = 'es-ES'; // Establece el idioma
    recognition.continuous = true; // Reconocimiento continuo

    let fullTranscript = ''; // Variable para almacenar la transcripción completa

    recognition.start();



    recognition.onresult = (event) => {
        //let palabra_clave = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            for (let index = 0; index < transcript.length; index++) {

                console.log(transcript);
                if (transcript.toLowerCase().includes("kira")) {
                    hablar(transcript)
                    break
                }
            }
            fullTranscript += transcript + ' ';
            console.log(transcript);
        }
        console.log(fullTranscript);

    };

    recognition.onend = () => {
        recognition.start();
        // startButton.disabled = false;
        // startButton.textContent = 'Iniciar Reconocimiento de Voz';
    };
} else {
    alert('El reconocimiento de voz no está soportado en este navegador.');
}



function hablar(texto_hablar) {
    let data = {
        "kind": "Conversation",
        "analysisInput": {
            "conversationItem": {
                "id": "1",
                "text": texto_hablar,
                "modality": "text",
                "language": "es",
                "participantId": "1"
            }
        },
        "parameters": {
            "projectName": "lenguaje-agro",
            "verbose": true,
            "deploymentName": "deploy-agro",
            "stringIndexType": "TextElement_V8"
        }
    }

    fetch("https://lenguaje-agro.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview", {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": "10447307dad34bbc9cf80b6ad064a88c",
                "Apim-Request-Id": "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(data.result.prediction.topIntent);
            data.result.prediction.entities.forEach(element => {
                if (data.result.prediction.topIntent == "Redirecionar") {
                    if (element.category == "Seccion" || element.category == "sección") {
                        if (element.text == "reciclaje") {
                            loadAudioBlob("BJZ01fC9ZCAOW8zSrpQA")
                            window.location.href = "#s_reciclaje";
                        } else if (element.text == "contacto") {
                            loadAudioBlob("../audio/yendo_analisis.mp3")
                            window.location.href = "#s_analisis";
                        } else if (element.text == "estadísticas ") {
                            loadAudioBlob("../audio/yendo_estadisticas.mp3")
                            window.location.href = "#s_estadisticas";
                        } else if (element.text == "pie") {
                            
                            window.location.href = "#s_pie";
                        } else if (element.text == "experiencia") {
                            loadAudioBlob("wtDHPGw4LK1aWI7qOSml")
                            window.location.href = "#s_experiencia";
                        } else if (element.text == "reconocimiento") {
                            // loadAudioBlob("MVoNBMIebgCzhbzoXZcS")
                            window.location.href = "http://localhost:5173/contact";
                        } else if (element.text == "clasificador") {
                            ////////////poner audio de que se clasifica
                            loadAudioBlob("ITY9pOYokj19Fzwuqzf7")
                            window.location.href = "#s_formulario";
                        } else if (element.text == "integrantes") {
                            loadAudioBlob("../audio/yendo_analisis.mp3")
                            window.location.href = "http://localhost:5173/team";
                        }else if (element.text == "clasificación") {
                           ////////////// texto de la cosas que se clasifican
                            window.location.href = "http://localhost:5173/classification";
                        }
                    }
                } else if (data.result.prediction.topIntent == "Presentarse") {
                    if (element.category == "CosaPresentar") {
                        if (element.text == "aplicación") {
                            loadAudioBlob("../audio/aplicacion.mp3", "aplicacion")
                        } else if (element.text == "integrantes") {
                            loadAudioBlob("../audio/integrantes.mp3")
                            window.location.href = "#s_integrates";
                        } else if (element.text == "funcionalidad") {
                            loadAudioBlob("../audio/kira.mp3")
                        }
                    }
                }

            });
        })
}

function redirigirUnaVez() {
    var anclas = ["#s_reciclaje", "#s_analisis", "#s_experiencia", "#s_estadisticas"];

    function redirigir(index) {
        if (index < anclas.length) {
            window.location.href = anclas[index];
            setTimeout(function () {
                redirigir(index + 1);
            }, 3000);
        }
    }

    redirigir(0);
}
let audioSilenced = true;

//loadAudioBlob("../audio/aplicacion.mp3");
//linea para cambiar colores del blob 14938
let audio = document.getElementById("voiceBlob");
audio.style.visibility = "hidden";

let wave = new CircularAudioWave(document.getElementById('chart-container'));
function loadAudioBlob(audioPath, intecion) {
    fetch(audioPath)
    .then(response => response.blob()).then(audioBlob => {
        audio.style.visibility = "visible";
        wave = new CircularAudioWave(document.getElementById('chart-container'));
        const audioUrl = URL.createObjectURL(audioBlob);
        audioElement.src = audioUrl;
        audioElement.addEventListener('loadedmetadata', () => {
            const DURATION = audioElement.duration;
            const MS = DURATION * 1070;
            console.log('Duracion en ms:', MS);
            console.log('Duración del audio:', DURATION);
            setTimeout(function () {
                console.log('Audio terminado');
                wave.destroy();
                audio.style.visibility = "hidden";
            }, MS);
        });
        wave.loadAudio(audioUrl);
        setTimeout(function () {
            wave.play();
            if (intecion == "aplicacion") {
                redirigirUnaVez()
            }
        }, 1000);

    }).catch(error => {
        console.error('Error en la solicitud:', error);
    });
}

document.getElementById('audioToggle').addEventListener('click', toggleAudio);
let imgAudio = document.getElementById("imgAudio");

function toggleAudio() {
    if (audioSilenced) {
        console.log("quitar silencio");
        audioSilenced = false;
        imgAudio.src = "/img/icons8-audio-50.png";
        setTimeout(function () {
            document.getElementById("audioToggle").style.visibility = "hidden";
        }, 1000);
    }

}