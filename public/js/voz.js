const audioElement = new Audio();

const apiUrl = 'https://api.elevenlabs.io/v1/text-to-speech/krhRXs3vGrYvfzQy24Ub/stream';
const xiApiKey = '58d2540b63de9b7c439d0294b11a6412';

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Configuración opcional
    recognition.lang = 'es-ES'; // Establece el idioma
    recognition.continuous = true; // Reconocimiento continuo

    let fullTranscript = ''; // Variable para almacenar la transcripción completa




    recognition.start();



    recognition.onresult = (event) => {
        palabra_clave = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            for (let index = 0; index < transcript.length; index++) {

                console.log(transcript);
                if(transcript.toLowerCase().includes("kira")){
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
    data = {
        "kind":"Conversation",
        "analysisInput": {
            "conversationItem": {
                "id":"1",
                "text": texto_hablar,
                "modality":"text",
                "language":"es",
                "participantId":"1"
            }
        },"parameters": {
            "projectName":"lenguaje-agro",
            "verbose":true,
            "deploymentName":"deploy-agro",
            "stringIndexType":"TextElement_V8"
        }
    }

    fetch("https://lenguaje-agro.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview", {
        method : "POST",
        headers : {
            "Ocp-Apim-Subscription-Key": "10447307dad34bbc9cf80b6ad064a88c",
            "Apim-Request-Id": "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data =>{ 
        console.log(data);
        console.log(data.result.prediction.topIntent);
        data.result.prediction.entities.forEach(element => {
            if(data.result.prediction.topIntent == "Redirecionar"){
                if(element.category == "Seccion"){
                    if(element.text == "reciclaje"){
                        loadAndPlayAudio("yendo a reciclaje")
                        window.location.href = "#s_reciclaje";
                    }else if (element.text == "análisis"){  
                        loadAndPlayAudio("yendo a analisis")
                        window.location.href = "#s_analisis";
                    }else if (element.text == "estadísticas "){  
                        loadAndPlayAudio("yendo a estadisticas")
                        window.location.href = "#s_estadisticas";
                    }else if (element.text == "pie"){  
                        loadAndPlayAudio("yendo a pie de pagina")
                        window.location.href = "#s_pie";
                    }else if (element.text == "experiencia"){  
                        loadAndPlayAudio("yendo a experiencia")
                        window.location.href = "#s_experiencia";
                    }else if(element.text == "contacto"){
                        loadAndPlayAudio("yendo a contacto")
                        window.location.href = "http://localhost:5173/contact";
                    }else if(element.text == "formulario"){
                        loadAndPlayAudio("yendo a formulario")
                        window.location.href = "#s_formulario";
                    }else if(element.text == "integrantes"){
                        loadAndPlayAudio("yendo a integrantes")
                        window.location.href = "http://localhost:5173/team";
                    }
                }
            }else if(data.result.prediction.topIntent == "Presentarse"){
                if(element.category == "CosaPresentar"){
                    if(element.text == "aplicación"){
                        loadAndPlayAudio("La aplicaion esta basada en el agro, contiene varias secciones como la seccion de reciclaje, analisis, experiencia y estadisticas con solo dicirme a que seccion quires dirigirte con gusto te llevare", "aplicacion")
                    }else if(element.text == "integrantes"){
                        loadAndPlayAudio("Los integrates que conforman la ccreacion de aplicacion son Winder Roman, Julian Vasquez y Jeffry Nuñez todos estudiantes del sena ficha 25-58-265")
                        window.location.href = "#s_integrates";
                    }else if(element.text == "funcionalidad"){
                        loadAndPlayAudio("Hola soy kira, que hace referencia a Kit de Inteligencia y Respuesta Avanzada, fui desarrollaada por estudiantes del sena para guiarte en esta aplicacion, sera un gusto ayudarte.")
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
  

  
  
  
  
  
  
function loadAndPlayAudio(texto_hablar, intecion = "ninguna") {
    const requestBody = {
        text: texto_hablar,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
        }
    };


    fetch(apiUrl, {
            method: 'POST',
            headers: {
            'accept': 'audio/mpeg',
            'xi-api-key': xiApiKey,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        return response.blob();
        })
        .then(audioBlob => {
        const audioUrl = URL.createObjectURL(audioBlob);
        audioElement.src = audioUrl;
        audioElement.play(); // Reproducir el audio cuando esté listo
        if(intecion == "aplicacion"){
            redirigirUnaVez()
        }
        })
        .catch(error => {
        console.error('Error en la solicitud:', error);
        });
    }
