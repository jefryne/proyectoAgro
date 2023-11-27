const audioElement = new Audio();
console.log("hola mundo desde voz.js");
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
                    if (element.category == "Seccion") {
                        if (element.text == "reciclaje") {
                            loadAudioBlob("BJZ01fC9ZCAOW8zSrpQA")
                            window.location.href = "#s_reciclaje";
                        } else if (element.text == "análisis") {
                            loadAudioBlob("MVoNBMIebgCzhbzoXZcS")
                            window.location.href = "#s_analisis";
                        } else if (element.text == "estadísticas ") {
                            loadAudioBlob("ZHinbkFkL4JUQY4LGB6X")
                            window.location.href = "#s_estadisticas";
                        } else if (element.text == "pie") {
                            loadAudioBlob("yendo a pie de pagina")
                            window.location.href = "#s_pie";
                        } else if (element.text == "experiencia") {
                            loadAudioBlob("wtDHPGw4LK1aWI7qOSml")
                            window.location.href = "#s_experiencia";
                        } else if (element.text == "contacto") {
                            loadAudioBlob("M4v3iXXPBiCwn6Uf5fmC")
                            window.location.href = "http://localhost:5173/contact";
                        } else if (element.text == "formulario") {
                            loadAudioBlob("ITY9pOYokj19Fzwuqzf7")
                            window.location.href = "#s_formulario";
                        } else if (element.text == "integrantes") {
                            loadAudioBlob("6xENwY3rXho00YgGerZ0")
                            window.location.href = "http://localhost:5173/team";
                        }
                    }
                } else if (data.result.prediction.topIntent == "Presentarse") {
                    if (element.category == "CosaPresentar") {
                        if (element.text == "aplicación") {
                            loadAudioBlob("PG2zpsP5K9JkifjsvKAM", "aplicacion")
                        } else if (element.text == "integrantes") {
                            loadAudioBlob("M4db6HAoCjH1NlKo4oqb")
                            window.location.href = "#s_integrates";
                        } else if (element.text == "funcionalidad") {
                            loadAudioBlob("sTab5LS4slqmkDNOnKSq")
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



function loadAndPlayAudio(id_historial, intecion = "ninguna") {
    fetch(`https://api.elevenlabs.io/v1/history/${id_historial}/audio`, {
            method: 'GET',
            headers: {
                "accept": "audio/mpeg",
                "xi-api-key": xiApiKey
            }
        })
        .then(response => {
            if (!response.ok) {
                console.log("Error en la solicitud");
            }
            return response.blob();
        })
        .then(audioBlob => {
            console.log(audioBlob);
            const audioUrl = URL.createObjectURL(audioBlob);
            audioElement.src = audioUrl;
            audioElement.play(); // Reproducir el audio cuando esté listo
            if (intecion == "aplicacion") {
                redirigirUnaVez()
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}

loadAudioBlob("M4db6HAoCjH1NlKo4oqb", "aplicacion")
//linea para cambiar colores del blob 14938
let audio = document.getElementById("voiceBlob");
audio.style.visibility = "hidden";

let wave = new CircularAudioWave(document.getElementById('chart-container'));
function loadAudioBlob(endpoint) {
    fetch(`https://api.elevenlabs.io/v1/history/${endpoint}/audio`, {
        "headers": {
        "accept": "audio/mpeg",
        "xi-api-key": xiApiKey
        }   
    }).then(response => {
        console.log(response);
        return response.blob();
    }).then(audioBlob => {
        audio.style.visibility = "visible";
        wave = new CircularAudioWave(document.getElementById('chart-container'));
        const audioUrl = URL.createObjectURL(audioBlob);
        audioElement.src = audioUrl;
        
        audioElement.addEventListener('loadedmetadata', () => {
            const DURATION = audioElement.duration;
            const MS = DURATION * 1070;
            console.log('Duracion en ms:', MS);
            console.log('Duración del audio:', DURATION);
            setTimeout(function() {
                console.log('Audio terminado');
                wave.destroy();
                audio.style.visibility = "hidden";
            }, MS);
        });
        wave.loadAudio(audioUrl);
        setTimeout(function () {
        wave.play();
        }, 1000);
    }).catch(error => {
        console.error('Error en la solicitud:', error);
    });
}
