import { getDetection } from "../Api/getData";
import React, { useState, useRef, useEffect } from "react";

export const ContactStart = () => {
    const [img, setImg] = useState('');
    const [detections, setDetections] = useState([]);
    const inputFile = useRef();
    const [contGris, setcontGris] = useState([]);
    const [contAzul, setcontAzul] = useState([]);
    const [contVerde, setcontVerde] = useState([]);
    const [stream, setStream] = useState(null);
    const [imageCapture, setImageCapture] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            const track = mediaStream.getVideoTracks()[0];
            const capture = new ImageCapture(track);

            setStream(mediaStream);
            setImageCapture(capture);
            setIsCameraOpen(true);

            const video = videoRef.current;
            if (video) {
                video.srcObject = mediaStream;

                // Configuración inicial del canvas
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                video.addEventListener("loadedmetadata", () => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                });

                video.addEventListener("play", () => {
                    const drawFrame = () => {
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        requestAnimationFrame(drawFrame);
                    };
                    drawFrame();
                });
            } else {
                console.error("El elemento de video es nulo");
            }

        } catch (error) {
            console.error("Error al abrir la cámara:", error);
            setIsCameraOpen(false);
        }
    };





    const takePhoto = async () => {
        try {
            if (!imageCapture) {
                console.error("La cámara no está abierta.");
                return;
            }

            const photoBlob = await imageCapture.takePhoto();
            const imageURL = URL.createObjectURL(photoBlob);

            setImg(imageURL);
            setIsCameraOpen(false);

            const file = new File([photoBlob], "photo.jpg", { type: "image/jpeg" });
            const response = await getDetection(file);
            console.log(response);
            const arrayPrediction = response.predictions;
            const newDetections = [];

            // Inicializa las mejores probabilidades para cada categoría
            let bestPlasticoProbability = 0.93;
            let bestCartonProbability = 0.93;
            let bestNoReciclableProbability = 0.93;

            // Inicializa las mejores detecciones para cada categoría
            let bestPlasticoDetection = null;
            let bestCartonDetection = null;
            let bestNoReciclableDetection = null;

            let bestDetection = null;
            let bestProbability = 0.93;

            arrayPrediction.forEach((element) => {
                if (element.probability >= 0.93) {
                    const newDetection = {
                        color: "red",
                        left: element.boundingBox.left,
                        top: element.boundingBox.top,
                        width: element.boundingBox.width,
                        height: element.boundingBox.height,
                        border: "2px solid red",
                        nombre: `${element.tagName} - ${(element.probability * 100).toFixed(2)} %`,
                    };

                    newDetections.push(newDetection);
                    //bestDetection = newDetection;
                    //bestProbability = element.probability;
                }

                if (element.tagName === 'Plastico' && element.probability >= bestPlasticoProbability) {
                    bestPlasticoDetection = {
                        tipo: element.tagName,
                        probability: element.probability,
                    };
                    bestPlasticoProbability = element.probability;
                }

                if (element.tagName === 'Carton' && element.probability >= bestCartonProbability) {
                    bestCartonDetection = {
                        tipo: element.tagName,
                        probability: element.probability,
                    };
                    bestCartonProbability = element.probability;
                }

                if (element.tagName === 'No reciclable' && element.probability >= bestCartonProbability) {
                    bestNoReciclableDetection = {
                        tipo: element.tagName,
                        probability: element.probability,
                    };
                    bestNoReciclableProbability = element.probability;
                }

                setDetections(newDetections);
            });

            // Actualiza el estado con las mejores detecciones para cada categoría
            if (bestPlasticoDetection) {
                setcontAzul(prevAzul => [...prevAzul, { tipo: bestPlasticoDetection.tipo }]);
            }
            if (bestCartonDetection) {
                setcontGris(prevGris => [...prevGris, { tipo: bestCartonDetection.tipo }]);
            }
            if (bestNoReciclableDetection) {
                setcontVerde(prevVerde => [...prevVerde, { tipo: bestNoReciclableDetection.tipo }]);
            }

            
            // if (bestDetection) {
            //     setDetections([bestDetection]);
            // }

            cleanupCamera();
        } catch (error) {
            console.error("Error al tomar la foto o procesarla:", error);
        }
    };

    const uploadImg = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                setImg(e.target.result);
                const response = await getDetection(file);
                console.log(response);
                const arrayPrediction = response.predictions;
                arrayPrediction.forEach(element => {
                    if (element.probability >= 0.99) {
                        const newDetection = {
                            color: "red",
                            left: element.boundingBox.left,
                            top: element.boundingBox.top,
                            width: element.boundingBox.width,
                            height: element.boundingBox.height,
                            border: "2px solid red",
                            nombre: `${element.tagName} - ${(element.probability * 100).toFixed(2)} %`,
                        };

                        setDetections(prevDetections => [...prevDetections, newDetection]);
                    }

                    if (element.tagName === 'Plastico' && element.probability > 0.99) {
                        let newElement = { tipo: element.tagName }
                        setcontAzul(prevAzul => [...prevAzul, newElement]);
                    }



                    if (element.tagName === 'No reciclable' && element.probability > 0.97) {
                        let newElement = { tipo: element.tagName }
                        setcontVerde(prevVerde => [...prevVerde, newElement]);
                    }

                });

            };
            reader.readAsDataURL(file);
        }
    }

    const clear = () => {
        setImg('');
        inputFile.current.value = "";
        setDetections([]);
        setcontAzul([]);
        setcontVerde([]);
        setcontGris([]);
        cleanupCamera();
    };

    const cleanupCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setImageCapture(null);

        // Limpiar el contenido del video
        const video = videoRef.current;
        if (video) {
            video.srcObject = null;
        }

        // Limpiar el contenido del canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

    };


    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                        <p className="section-title bg-white text-center text-primary px-3">Detalles de la Aplicación</p>
                        <h1 className="mb-5">Clasificador de Basura</h1>
                    </div>
                    <div id="s_formulario" className="row g-5 text-center">
                        <div className="col-lg-6 wow fadeInUp mx-auto" data-wow-delay="0.1s">
                            <p className="mb-4"><b>Utiliza nuestro clasificador de basura para identificar el tipo de basura en una imagen y determinar el contenedor adecuado.</b></p>

                            <div className="row g-3">

                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <input type="file" ref={inputFile} className="form-control" accept="image/*" onChange={uploadImg} />
                                        <label htmlFor="">IMAGEN A DETECTAR</label>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <button type="button" className="btn btn-primary" onClick={startCamera}>
                                            Abrir Cámara
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <button type="button" className="btn btn-primary" onClick={takePhoto} disabled={!isCameraOpen}>
                                            Tomar Foto
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%' }}></video>
                                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                                </div>


                                <div className="col-12">
                                    <div className="position-relative mt-5">
                                        <div id="image-container" className="form-floating">
                                            {img && <img className="img-fluid" src={img} alt="" />}
                                            {detections.map((item, index) => (
                                                <ObjectDetec
                                                    key={index}
                                                    color={item.color}
                                                    left={item.left}
                                                    top={item.top}
                                                    width={item.width}
                                                    height={item.height}
                                                    border={item.border}
                                                    nombre={item.nombre}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>




                                {detections.length > 0 && (
                                    <div className="row mt-5">
                                        <h4>Contenedor adecuado:</h4>
                                        {contAzul.length > 0 && (
                                            <div className="col-4" >
                                                <img className="img-fluid" src={`img/contenedor-azul.jpg`} alt="" />
                                                {contAzul.map((item, index) => (
                                                    <p key={index} >{item.tipo}</p>
                                                ))}
                                            </div>
                                        )}

                                        {contVerde.length > 0 && (
                                            <div className="col-4" >
                                                <img className="img-fluid" src={`img/contenedor-verde.jpg`} alt="" />
                                                {contVerde.map((item, index) => (
                                                    <p key={index} >{item.tipo}</p>
                                                ))}
                                            </div>
                                        )}

                                        {contGris.length > 0 && (
                                            <div className="col-4" >
                                                <img className="img-fluid" src={`img/contenedor-gris.jpg`} alt="" />
                                                {contGris.map((item, index) => (
                                                    <p key={index} >{item.tipo}</p>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                )}
                                {!detections.length && <p>No se han detectado objetos.</p>}

                                <div className="col-12">
                                    <button className="btn btn-secondary rounded-pill py-3 px-5" type="button" onClick={clear}>Limpiar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function ObjectDetec(props) {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {

        setHovered(true);
        console.log(`Mouse enter en ${props.nombre}`);

    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const positionStyle = {
        color: hovered ? "green" : props.color,
        left: `${props.left * 100}%`,
        top: `${props.top * 100}%`,
        width: `${props.width * 100}%`,
        height: `${props.height * 100}%`,
        border: hovered ? "2px solid green" : props.border
    };

    return (
        <>
            <div
                className="position-absolute"
                style={positionStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <b>{props.nombre}</b>
            </div>
        </>
    )
}

export const HeaderContact = () => {
    return (
        <>
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5 m-5">
                    <h1 className="display-5 m-5 animated slideInDown mt-4"></h1>
                </div>
            </div>
        </>
    )
}
