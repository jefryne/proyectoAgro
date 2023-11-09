const audioElement = new Audio();

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
                        loadAndPlayAudio("BJZ01fC9ZCAOW8zSrpQA")
                        window.location.href = "#s_reciclaje";
                    }else if (element.text == "análisis"){  
                        loadAndPlayAudio("MVoNBMIebgCzhbzoXZcS")
                        window.location.href = "#s_analisis";
                    }else if (element.text == "estadísticas "){  
                        loadAndPlayAudio("ZHinbkFkL4JUQY4LGB6X")
                        window.location.href = "#s_estadisticas";
                    }else if (element.text == "pie"){  
                        loadAndPlayAudio("yendo a pie de pagina")
                        window.location.href = "#s_pie";
                    }else if (element.text == "experiencia"){  
                        loadAndPlayAudio("wtDHPGw4LK1aWI7qOSml")
                        window.location.href = "#s_experiencia";
                    }else if(element.text == "contacto"){
                        loadAndPlayAudio("M4v3iXXPBiCwn6Uf5fmC")
                        window.location.href = "http://localhost:5173/contact";
                    }else if(element.text == "formulario"){
                        loadAndPlayAudio("ITY9pOYokj19Fzwuqzf7")
                        window.location.href = "#s_formulario";
                    }else if(element.text == "integrantes"){
                        loadAndPlayAudio("6xENwY3rXho00YgGerZ0")
                        window.location.href = "http://localhost:5173/team";
                    }
                }
            }else if(data.result.prediction.topIntent == "Presentarse"){
                if(element.category == "CosaPresentar"){
                    if(element.text == "aplicación"){
                        loadAndPlayAudio("PG2zpsP5K9JkifjsvKAM", "aplicacion")
                    }else if(element.text == "integrantes"){
                        loadAndPlayAudio("M4db6HAoCjH1NlKo4oqb")
                        window.location.href = "#s_integrates";
                    }else if(element.text == "funcionalidad"){
                        loadAndPlayAudio("sTab5LS4slqmkDNOnKSq")
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
                "xi-api-key": "58d2540b63de9b7c439d0294b11a6412"
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
        if(intecion == "aplicacion"){
            redirigirUnaVez()
        }
        })
        .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}